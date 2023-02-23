import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ALL_TRANSACTIONS } from "@configs/crumb"
import dynamic from "next/dynamic"

const ProfileLayout = dynamic(
  () => import("@components/templates/ProfileLayout"),
  {
    suspense: true
  }
)
const AllTransactions = dynamic(
  () => import("@feature/transaction/components/templates/AllTransactions"),
  {
    suspense: true
  }
)

const AllTransactionsPage = () => (
  <article className="h-full w-full">
    <AllTransactions />
  </article>
)

AllTransactionsPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout _breadcrumb={ALL_TRANSACTIONS()}>{page}</ProfileLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
export default AllTransactionsPage
