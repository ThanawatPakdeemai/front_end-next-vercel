import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ProfileLayout from "@components/templates/ProfileLayout"
import AllTransactions from "@feature/transaction/components/templates/AllTransactions"
import { ALL_TRANSACTIONS } from "@configs/crumb"

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
