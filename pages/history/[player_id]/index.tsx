import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GamePageLayout from "@components/template/GamePageLayout"
// import HistoryPage from "@feature/pageHistory/components/organisms/historyPage"

const ProfilePage = () => (
  <article className="h-full w-full">{/* <HistoryPage /> */}</article>
)

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <GamePageLayout>{page}</GamePageLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
export default ProfilePage
