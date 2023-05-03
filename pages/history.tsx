import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GAME_PLAY_HISTORY } from "@configs/crumb"
import dynamic from "next/dynamic"
import { BrowserView, MobileView } from "react-device-detect"
import CONFIGS from "@configs/index"

const ProfileLayout = dynamic(
  () => import("@components/templates/ProfileLayout"),
  {
    suspense: true,
    ssr: false
  }
)
const HistoryTable = dynamic(
  () => import("@feature/history/components/organisms/HistoryTable"),
  {
    suspense: true,
    ssr: false
  }
)
const HistoryTableMobile = dynamic(
  () =>
    import(
      "@src/mobile/features/history/components/organisms/HistoryTableMobile"
    ),
  {
    suspense: true,
    ssr: false
  }
)

const HistoryPage = () => (
  <article className="h-full w-full">
    <BrowserView>
      <HistoryTable />
    </BrowserView>
    {CONFIGS.DISPLAY_MOBILE_MODE === "true" && (
      <MobileView>
        <HistoryTableMobile />
      </MobileView>
    )}
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
