import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

const GameRoomLayout = dynamic(
  () => import("@components/templates/GameRoomLayout")
)
const GameRoomWaitingPage = dynamic(
  () => import("@feature/page/games/gameRoomWaitingPage")
)

export default function GameRoomList() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <GameRoomWaitingPage _roomId={id as string} />
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
