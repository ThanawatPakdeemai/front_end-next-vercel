import FixedWidthContent from "@components/templates/contents/FixedWidthContent"
import ServicesPageLayout from "@components/templates/ServicesPageLayout"
import P2PDexListPage from "@feature/page/p2pDex/P2PDexListPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"

export default function P2PDex() {
  return (
    <FixedWidthContent>
      <P2PDexListPage />
    </FixedWidthContent>
  )
}

P2PDex.getLayout = function getLayout(page: ReactElement) {
  return <ServicesPageLayout>{page}</ServicesPageLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
