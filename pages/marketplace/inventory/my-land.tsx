import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

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

const MyLandPage = dynamic(() => import("@feature/page/inventory/MyLandPage"), {
  suspense: true,
  ssr: false
})

const MyLand = () => (
  <article className="grid h-full w-full justify-items-center">
    <MyLandPage />
  </article>
)

MyLand.getLayout = function getLayout(page: ReactElement) {
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

export default MyLand
