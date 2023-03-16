import { Alert, Divider } from "@mui/material"
import { motion } from "framer-motion"
import React from "react"
import { FieldError } from "react-hook-form"

interface IInputCustom {
  fieldType: React.ReactNode
  formSubmitErrors: boolean
  error: FieldError | undefined
  statusError: boolean
}

const FieldItem = ({
  fieldType,
  formSubmitErrors,
  error,
  statusError
}: IInputCustom) => (
  <div className="form-control mb-4">
    <Divider className="mx-0 mt-5 mb-8" />
    {formSubmitErrors && (
      <motion.div
        animate={{
          opacity: 1,
          marginTop: -20,
          marginBottom: 2
        }}
      >
        <Alert
          severity="error"
          className="rounded-lg"
        >
          The form is filled with incorrect information.
        </Alert>
      </motion.div>
    )}
    {fieldType}
    {error && (
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: 1,
          marginTop: 10
        }}
      >
        <Alert
          severity="warning"
          className="rounded-lg"
        >
          {error.type} is a required field
        </Alert>
      </motion.div>
    )}
    {!statusError && (
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: 1,
          marginTop: 10
        }}
      >
        <Alert
          severity="warning"
          className="rounded-lg"
        >
          Invalid Email Format
        </Alert>
      </motion.div>
    )}
  </div>
)

export default FieldItem
