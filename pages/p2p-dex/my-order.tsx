import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

const ServicesPageLayout = dynamic(
  () => import("@components/templates/ServicesPageLayout"),
  {
    suspense: true
  }
)
const FixedWidthContent = dynamic(
  () => import("@components/templates/contents/FixedWidthContent"),
  {
    suspense: true
  }
)
const P2PDexMyOrderList = dynamic(
  () => import("@feature/page/p2pDex/P2PDexMyOrderList"),
  {
    suspense: true
  }
)

export default function MyOrderP2P() {
  return (
    <>
      <FixedWidthContent>
        <P2PDexMyOrderList />
      </FixedWidthContent>
    </>
  )
}

MyOrderP2P.getLayout = function getLayout(page: ReactElement) {
  return <ServicesPageLayout>{page}</ServicesPageLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
