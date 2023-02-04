import ServicesPageLayout from "@components/template/ServicesPageLayout"
import FixedAPR from "@feature/staking/components/templates/FixedApr"
import VariableAPR from "@feature/staking/components/templates/VariableAPR"
import useGlobalStaking from "@feature/staking/containers/hook/useGlobalStaking"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import useTabContext from "@feature/tab/contexts/useTabContext"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"

export default function StakingPage() {
  const { flexibleAPRStaking, fixedAPRGroupByDate } = useGlobalStaking()

  const { tabValue } = useTabContext()
  switch (tabValue) {
    case "1":
      return <VariableAPR data={flexibleAPRStaking} />
    case "2":
      return <FixedAPR stakeGroupByDatetime={fixedAPRGroupByDate} />
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
