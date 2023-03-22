import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"
import dynamic from "next/dynamic"
import useProfileStore from "@stores/profileStore"

const MarketplaceLayoutInventory = dynamic(
  () => import("@components/templates/marketplace/MarketplaceLayoutInventory"),
  {
    suspense: true,
    ssr: false
  }
)
const TransactionPage = dynamic(
  () => import("@feature/page/inventory/TransactionPage"),
  {
    suspense: true,
    ssr: false
  }
)

const Page = () => {
  const profile = useProfileStore((state) => state.profile.data)
  return (
    <>
      <TransactionPage profile={profile} />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <MarketplaceLayoutInventory>{page}</MarketplaceLayoutInventory>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default Page
