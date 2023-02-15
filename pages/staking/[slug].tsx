import ServicesPageLayout from "@components/templates/ServicesPageLayout"
import FixedAPRContent from "@feature/staking/components/organisms/FixedAPRContent"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"

export default function FixedStakingPageDetails() {
  return <FixedAPRContent />
}

FixedStakingPageDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <TabProvider>
      <ServicesPageLayout>{page}</ServicesPageLayout>
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
