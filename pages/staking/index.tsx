import { ReactElement } from "react"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
// import { useWeb3Provider } from "@providers/Web3Provider"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import useGlobalStaking from "@feature/staking/containers/hook/useStakingController"
import useTabContext from "@feature/tab/contexts/useTabContext"

const HeadStaking = dynamic(() => import("@components/molecules/HeadStaking"), {
  suspense: true
})
const ServicesPageLayout = dynamic(
  () => import("@components/templates/ServicesPageLayout"),
  {
    suspense: true
  }
)
const FlexibleAPRContent = dynamic(
  () => import("@feature/staking/components/organisms/FlexibleAPRContent"),
  {
    suspense: true
  }
)
const StakingList = dynamic(
  () => import("@feature/staking/components/templates/StakingList"),
  {
    suspense: true
  }
)

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
      <ServicesPageLayout>
        <HeadStaking>{page}</HeadStaking>
      </ServicesPageLayout>
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
