import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GAME_PLAY_HISTORY } from "@configs/crumb"
import dynamic from "next/dynamic"

const ProfileLayout = dynamic(
  () => import("@components/templates/ProfileLayout"),
  {
    suspense: true
  }
)
const HistoryTable = dynamic(
  () => import("@feature/history/components/organisms/HistoryTable"),
  {
    suspense: true
  }
)

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
