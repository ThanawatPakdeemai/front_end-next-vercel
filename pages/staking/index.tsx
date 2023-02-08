import ServicesPageLayout from "@components/template/ServicesPageLayout"
import FlexibleAPRContent from "@feature/staking/components/organisms/FlexibleAPRContent"
import StakingList from "@feature/staking/components/templates/StakingList"
import useGlobalStaking from "@feature/staking/containers/hook/useGlobalStaking"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import useTabContext from "@feature/tab/contexts/useTabContext"
// import { useWeb3Provider } from "@providers/Web3Provider"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"

export default function StakingPage() {
  const { fixedStaking } = useGlobalStaking()

  const { tabValue } = useTabContext()
  switch (tabValue) {
    case "1":
      return <FlexibleAPRContent />
    case "2":
      return <StakingList stakeGroupByDatetime={fixedStaking} />
    default:
      return <></>
  }
}

StakingPage.getLayout = function getLayout(page: ReactElement) {
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
