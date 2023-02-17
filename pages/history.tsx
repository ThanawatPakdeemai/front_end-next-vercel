import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ProfileLayout from "@components/templates/ProfileLayout"
import HistoryTable from "@feature/history/components/organisms/HistoryTable"
import { GAME_PLAY_HISTORY } from "@configs/crumb"

const HistoryPage = () => (
  <article className="h-full w-full">
    <HistoryTable />
  </article>
)

HistoryPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout _breadcrumb={GAME_PLAY_HISTORY()}>{page}</ProfileLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
export default HistoryPage
