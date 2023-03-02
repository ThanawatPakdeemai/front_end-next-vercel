import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

const MarketplaceLayoutWithFilter = dynamic(
  () => import("@components/templates/marketplace/MarketplaceLayoutWithFilter"),
  {
    suspense: true
  }
)
const MarketplaceHomePage = dynamic(
  () => import("@feature/page/marketplace/MarketplaceHomePage"),
  {
    suspense: true
  }
)

const MarketplaceHome = () => <MarketplaceHomePage />

MarketplaceHome.getLayout = function getLayout(page: ReactElement) {
  return <MarketplaceLayoutWithFilter>{page}</MarketplaceLayoutWithFilter>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default MarketplaceHome
