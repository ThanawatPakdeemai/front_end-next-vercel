import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"

const GameRoomLayout = dynamic(
  () => import("@components/templates/GameRoomLayout")
)
const GameRoomListPage = dynamic(
  () => import("@feature/page/games/gameRoomListPage")
)

export default function GameRoomList() {
  return (
    <>
      <GameRoomListPage />
    </>
  )
}

GameRoomList.getLayout = function getLayout(page: ReactElement) {
  return <GameRoomLayout>{page}</GameRoomLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
