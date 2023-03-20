import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

const MarketplaceLayoutWithoutFilter = dynamic(
  () =>
    import("@components/templates/marketplace/MarketplaceLayoutWithoutFilter"),
  {
    suspense: true,
    ssr: false
  }
)

const MarketplaceNakaPunk = dynamic(
  () => import("@feature/page/marketplace/MarketplaceNakaPunk"),
  {
    suspense: true,
    ssr: false
  }
)

const Page = () => <MarketplaceNakaPunk />

Page.getLayout = function getLayout(page: ReactElement) {
  return <MarketplaceLayoutWithoutFilter>{page}</MarketplaceLayoutWithoutFilter>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default Page
