import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

const MarketplaceLayoutInventory = dynamic(
  () => import("@components/templates/marketplace/MarketplaceLayoutInventory"),
  {
    suspense: true,
    ssr: false
  }
)

const InventoryPage = dynamic(
  () => import("@feature/page/inventory/InventoryPage"),
  {
    suspense: true,
    ssr: false
  }
)

const Inventory = () => <InventoryPage />

Inventory.getLayout = function getLayout(page: ReactElement) {
  return <MarketplaceLayoutInventory>{page}</MarketplaceLayoutInventory>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default Inventory
