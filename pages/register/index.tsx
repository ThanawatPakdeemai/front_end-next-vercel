import React, { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import ProfileRegister from "@components/templates/Register"

const RegisterPage = () => (
  <GoogleReCaptchaProvider
    reCaptchaKey={`${process.env.NEXT_PUBLIC_KEY_RECAPTCHA}`}
    scriptProps={{
      async: true,
      defer: false,
      appendTo: "head",
      nonce: undefined
    }}
  >
    <ProfileRegister />
  </GoogleReCaptchaProvider>
)

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default RegisterPage
