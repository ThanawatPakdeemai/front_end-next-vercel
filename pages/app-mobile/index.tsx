import React, { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"

const HomeMobile = dynamic(
  () => import("@src/mobile/components/templates/GameDetailLayout")
)

const AppMobilePage = () => <HomeMobile />

AppMobilePage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default AppMobilePage
