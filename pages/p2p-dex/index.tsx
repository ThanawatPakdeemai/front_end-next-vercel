import FixedWidthContent from "@components/templates/contents/FixedWidthContent"
import ServicesPageLayout from "@components/templates/ServicesPageLayout"
import { P2PDEX_BANNER } from "@constants/servicesBanner"
import P2PDexListPage from "@feature/page/p2pDex/P2PDexListPage"
// import { TabProvider } from "@feature/tab/contexts/TabProvider"
// import useTabContext from "@feature/tab/contexts/useTabContext"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"

export default function P2PDex() {
  // const { tabValue } = useTabContext()

  // const renderContent = () => {
  //   switch (tabValue) {
  //     case "1":
  //       return <>Order</>
  //     case "2":
  //       return <>My order</>
  //     default:
  //       return <></>
  //   }
  // }

  return (
    <FixedWidthContent>
      <P2PDexListPage />
    </FixedWidthContent>
  )
}

P2PDex.getLayout = function getLayout(page: ReactElement) {
  return (
    // <TabProvider></TabProvider>
    <ServicesPageLayout banner={P2PDEX_BANNER}>{page}</ServicesPageLayout>
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
