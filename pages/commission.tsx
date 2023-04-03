import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { COMMISSION_CRUMB } from "@configs/crumb"
import dynamic from "next/dynamic"

const ProfileLayout = dynamic(
  () => import("@components/templates/ProfileLayout"),
  {
    suspense: true,
    ssr: false
  }
)

const CommissionTable = dynamic(
  () => import("@feature/commission/components/organisms/commissionTable"),
  {
    suspense: true,
    ssr: false
  }
)

const Commission = () => (
  <article className="h-full w-full">
    <CommissionTable />
  </article>
)

Commission.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout _breadcrumb={COMMISSION_CRUMB()}>{page}</ProfileLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
export default Commission
