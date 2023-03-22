import { TabProvider } from "@feature/tab/contexts/TabProvider"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"
import dynamic from "next/dynamic"

const HeadStaking = dynamic(() => import("@components/molecules/HeadStaking"), {
  suspense: true,
  ssr: false
})
const ServicesPageLayout = dynamic(
  () => import("@components/templates/ServicesPageLayout"),
  {
    suspense: true,
    ssr: false
  }
)
const FixedAPRContent = dynamic(
  () => import("@feature/staking/components/organisms/FixedAPRContent"),
  {
    suspense: true,
    ssr: false
  }
)

export default function FixedStakingPageDetails() {
  return <FixedAPRContent />
}

FixedStakingPageDetails.getLayout = function getLayout(page: ReactElement) {
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
