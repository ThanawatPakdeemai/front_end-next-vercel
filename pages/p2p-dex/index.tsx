import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"
import dynamic from "next/dynamic"

const FixedWidthContent = dynamic(
  () => import("@components/templates/contents/FixedWidthContent")
)
const ServicesPageLayout = dynamic(
  () => import("@components/templates/ServicesPageLayout")
)
const P2PDexListPage = dynamic(
  () => import("@feature/page/p2pDex/P2PDexListPage")
)

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
