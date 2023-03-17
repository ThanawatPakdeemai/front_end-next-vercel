import React, { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import RegisterTemplate from "@components/templates/RegisterTemplate"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

const JoinUsPage = dynamic(() => import("@feature/page/JoinUsPage"))

const JoinUs = () => <JoinUsPage />

JoinUs.getLayout = function getLayout(page: ReactElement) {
  return (
    <RegisterTemplate>
      <GoogleReCaptchaProvider
        reCaptchaKey={`${process.env.NEXT_PUBLIC_KEY_RECAPTCHA}`}
        scriptProps={{
          async: true,
          defer: false,
          appendTo: "head",
          nonce: undefined
        }}
      >
        {page}
      </GoogleReCaptchaProvider>
    </RegisterTemplate>
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default JoinUs
