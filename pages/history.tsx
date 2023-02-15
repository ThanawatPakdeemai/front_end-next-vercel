import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ProfileLayout from "@components/template/ProfileLayout"
import HistoryTable from "@feature/history/components/organisms/HistoryTable"

const HistoryPage = () => (
  <article className="h-full w-full">
    <HistoryTable />
  </article>
)

HistoryPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
export default HistoryPage
