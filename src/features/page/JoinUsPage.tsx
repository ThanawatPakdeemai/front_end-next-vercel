import dynamic from "next/dynamic"
import React from "react"

const FormJoinus = dynamic(
  () => import("@feature/authentication/components/FormJoinus"),
  {
    suspense: true,
    ssr: false
  }
)

const JoinUsPage = () => <FormJoinus />

export default JoinUsPage
