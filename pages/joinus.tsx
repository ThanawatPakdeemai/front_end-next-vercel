import React, { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import RegisterTemplate from "@components/templates/RegisterTemplate"

const JoinUsPage = dynamic(() => import("@feature/page/JoinUsPage"))

const JoinUs = () => <JoinUsPage />

JoinUs.getLayout = function getLayout(page: ReactElement) {
  return <RegisterTemplate>{page}</RegisterTemplate>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default JoinUs
