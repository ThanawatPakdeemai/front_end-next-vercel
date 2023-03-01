import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

const MarketplaceLayoutWithFilter = dynamic(
  () =>
    import("@components/templates/marketplace/MarketplaceLayoutWithoutFilter"),
  {
    suspense: true
  }
)

const Building = () => <div>index</div>

Building.getLayout = function getLayout(page: ReactElement) {
  return <MarketplaceLayoutWithFilter>{page}</MarketplaceLayoutWithFilter>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default Building
