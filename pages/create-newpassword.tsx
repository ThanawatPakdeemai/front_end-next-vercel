import React, { ReactElement } from "react"
import { useRouter } from "next/router"
import FromCreatePassword from "@feature/authentication/components/FromCreatePassword"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function CreatePassword() {
  const router = useRouter()
  const { email, token } = router.query
  // console.log("router", email, token)

  return (
    <>
      <FromCreatePassword
        email={email as string}
        token={token as string}
      />
    </>
  )
}

CreatePassword.getLayout = function getLayout(page: ReactElement) {
  return page
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
