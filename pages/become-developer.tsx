import React, { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import dynamic from "next/dynamic"
import RegisterTemplate from "@components/templates/RegisterTemplate"

const BecomeDeveloperPage = dynamic(
  () => import("@feature/page/BecomeDeveloperPage")
)

const BecomeDeveloper = () => <BecomeDeveloperPage />

BecomeDeveloper.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default BecomeDeveloper
