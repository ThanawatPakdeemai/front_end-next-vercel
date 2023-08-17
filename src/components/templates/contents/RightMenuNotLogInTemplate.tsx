import React from "react"
import { Box, Stack } from "@mui/material"
import dynamic from "next/dynamic"

const ModalCustom = dynamic(
  () => import("@components/molecules/Modal/ModalCustom")
)
const ModalHeader = dynamic(
  () => import("@components/molecules/Modal/ModalHeader")
)
const FormLogin = dynamic(
  () => import("@feature/authentication/components/FormLogin")
)

const RightMenuNotLogInTemplate = ({
  children,
  open,
  handleClose
}: {
  children: React.ReactNode
  open: boolean
  handleClose: () => void
}) => (
  <Box
    component="div"
    className="right-menu-noLogin__template flex w-full items-end justify-end"
  >
    {children}
    <ModalCustom
      open={open}
      onClose={handleClose}
      className="w-full gap-3 rounded-[34px] p-[10px] md:w-auto"
      width="auto"
    >
      <Stack
        spacing={3}
        className="md:p-5"
      >
        <ModalHeader
          handleClose={handleClose}
          title="Login"
        />

        <FormLogin />
      </Stack>
    </ModalCustom>
  </Box>
)

export default RightMenuNotLogInTemplate
