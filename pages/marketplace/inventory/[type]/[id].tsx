import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

const MarketplaceOwnerDetail = dynamic(
  () => import("@feature/page/marketplace/MarketplaceOwnerDetail"),
  {
    suspense: true,
    ssr: false
  }
)

const MarketplaceLayoutInventoryNoFilter = dynamic(
  () =>
    import(
      "@components/templates/marketplace/MarketplaceLayoutInventoryNoFilter"
    ),
  {
    suspense: true,
    ssr: false
  }
)

const Page = () => <MarketplaceOwnerDetail />

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <MarketplaceLayoutInventoryNoFilter>
      {page}
    </MarketplaceLayoutInventoryNoFilter>
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default Page
