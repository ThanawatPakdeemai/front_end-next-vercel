import ServicesPageLayout from "@components/templates/ServicesPageLayout"
import FixedWidthContent from "@components/templates/contents/FixedWidthContent"
import P2PDexMyOrderList from "@feature/page/p2pDex/P2PDexMyOrderList"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"

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
