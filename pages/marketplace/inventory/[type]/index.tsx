import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"
import dynamic from "next/dynamic"
import { GetServerSideProps } from "next"

const MarketplaceLayoutInventory = dynamic(
  () => import("@components/templates/marketplace/MarketplaceLayoutInventory"),
  {
    suspense: false,
    ssr: false
  }
)

const MarketplaceOwnerList = dynamic(
  () => import("@feature/page/marketplace/MarketplaceOwnerList"),
  {
    suspense: false,
    ssr: false
  }
)

const Page = () => <MarketplaceOwnerList />

Page.getLayout = function getLayout(page: ReactElement) {
  return <MarketplaceLayoutInventory>{page}</MarketplaceLayoutInventory>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await serverSideTranslations(ctx.locale!, ["common"]))
  }
})

export default Page
