import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"
import dynamic from "next/dynamic"
// import { TabProvider } from "@feature/tab/contexts/TabProvider"
// import useTabContext from "@feature/tab/contexts/useTabContext"

const FixedWidthContent = dynamic(
  () => import("@components/templates/contents/FixedWidthContent"),
  {
    suspense: true,
    ssr: false
  }
)
const ServicesPageLayout = dynamic(
  () => import("@components/templates/ServicesPageLayout"),
  {
    suspense: true,
    ssr: false
  }
)
const P2PDexCreatePage = dynamic(
  () => import("@feature/page/p2pDex/P2PDexCreatePage"),
  {
    suspense: true,
    ssr: false
  }
)

export default function P2PDexCreate() {
  // const { fixedStaking } = useGlobalStaking()
  // const { tabValue } = useTabContext()
  // switch (tabValue) {
  //   case "1":
  //     return <>Create Buy</>
  //   case "2":
  //     return <>Create Sell</>
  //   default:
  //     return <></>
  // }
  return (
    <FixedWidthContent>
      <P2PDexCreatePage />
    </FixedWidthContent>
  )
}

P2PDexCreate.getLayout = function getLayout(page: ReactElement) {
  return (
    // <TabProvider></TabProvider>
    <ServicesPageLayout>{page}</ServicesPageLayout>
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
