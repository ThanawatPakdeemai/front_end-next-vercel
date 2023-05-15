import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

const MarketplaceLayoutWithFilter = dynamic(
  () => import("@components/templates/marketplace/MarketplaceLayoutWithFilter"),
  {
    suspense: true,
    ssr: false
  }
)
const MarketplaceCardList = dynamic(
  () => import("@feature/page/marketplace/MarketplaceCardList"),
  {
    suspense: true,
    ssr: false
  }
)

const MarketplaceHome = () => <MarketplaceCardList />

MarketplaceHome.getLayout = function getLayout(page: ReactElement) {
  return <MarketplaceLayoutWithFilter>{page}</MarketplaceLayoutWithFilter>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  // const _mode = process.env.NEXT_PUBLIC_MODE
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
    // remove below if marketplace launch on frontend v2
    // redirect: {
    //   destination: _mode === "production" ? "/" : "/marketplace"
    // }
  }
}

export default MarketplaceHome
