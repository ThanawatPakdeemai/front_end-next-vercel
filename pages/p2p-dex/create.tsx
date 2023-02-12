import ServicesPageLayout from "@components/templates/ServicesPageLayout"
import { P2PDEX_BANNER } from "@constants/servicesBanner"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import useTabContext from "@feature/tab/contexts/useTabContext"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"

export default function P2PDexCreate() {
  // const { fixedStaking } = useGlobalStaking()

  const { tabValue } = useTabContext()
  switch (tabValue) {
    case "1":
      return <>Create Buy</>
    case "2":
      return <>Create Sell</>
    default:
      return <></>
  }
}

P2PDexCreate.getLayout = function getLayout(page: ReactElement) {
  return (
    <TabProvider>
      <ServicesPageLayout banner={P2PDEX_BANNER}>{page}</ServicesPageLayout>
    </TabProvider>
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
