import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

const MarketplaceLayoutInventoryNoFilter = dynamic(
  () =>
    import(
      "@components/templates/marketplace/MarketplaceLayoutInventoryNoFilter"
    ),
  {
    suspense: true
  }
)

const Page = () => <>test</>

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
