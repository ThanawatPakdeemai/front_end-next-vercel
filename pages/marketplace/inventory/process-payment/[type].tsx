import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"
import dynamic from "next/dynamic"
import { MENU_ROUTER_MARKETPLACE_TYPE } from "@configs/menu"
import { GetServerSideProps } from "next"

const MarketplaceLayoutInventory = dynamic(
  () => import("@components/templates/marketplace/MarketplaceLayoutInventory"),
  {
    suspense: false,
    ssr: false
  }
)

const Page = () => <>Process Payment</>

Page.getLayout = function getLayout(page: ReactElement) {
  return <MarketplaceLayoutInventory>{page}</MarketplaceLayoutInventory>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // eslint-disable-next-line no-unused-vars
  const validParams = MENU_ROUTER_MARKETPLACE_TYPE.some((_type) =>
    ctx.params?.type?.includes(_type)
  )

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ["common"]))
    }
    // ERR_TOO_MANY_REDIRECTS
    // redirect: {
    //   source: `/marketplace/inventory`,
    //   destination: !validParams ? "/404" : `/marketplace/inventory/land`,
    //   permanent: true
    // }
  }
}

export default Page
