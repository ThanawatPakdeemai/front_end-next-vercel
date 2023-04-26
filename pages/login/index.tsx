import React, { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"

const LoginMobile = dynamic(() => import("src/mobile/templates/SignInLayout"))

const LoginMobilePage = () => <LoginMobile />

LoginMobilePage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default LoginMobilePage
