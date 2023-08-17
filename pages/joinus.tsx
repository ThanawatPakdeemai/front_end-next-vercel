import React, { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

const RegisterTemplate = dynamic(
  () => import("@components/templates/RegisterTemplate"),
  {
    suspense: true,
    ssr: true
  }
)
const JoinUsPage = dynamic(() => import("@feature/page/JoinUsPage"), {
  suspense: true,
  ssr: true
})

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
  // const mode = process.env.NEXT_PUBLIC_MODE
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
    // redirect: {
    //   destination: mode === "production" ? "/" : "/joinus"
    // }
  }
}

export default JoinUs
