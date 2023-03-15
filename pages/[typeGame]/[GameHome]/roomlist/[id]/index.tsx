import { ReactElement, useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import useGameStore from "@stores/game"

const GameRoomLayout = dynamic(
  () => import("@components/templates/GameRoomLayout"),
  {
    suspense: true
  }
)
const GameRoomWaitingPage = dynamic(
  () => import("@feature/page/games/gameRoomWaitingPage"),
  {
    suspense: true
  }
)

export default function GameRoomList() {
  const router = useRouter()
  const { id, GameHome } = router.query
  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")
  const { onSetGameData } = useGameStore()

  useEffect(() => {
    if (gameData) onSetGameData(gameData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData])

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
