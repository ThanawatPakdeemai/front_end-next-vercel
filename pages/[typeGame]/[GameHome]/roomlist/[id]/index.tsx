import { ReactElement, useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import useGameStore from "@stores/game"
import CONFIGS from "@configs/index"
import WaitingLayout from "@src/mobile/components/templates/WaitingLayout"
import { isMobile } from "@hooks/useGlobal"

const GameRoomLayout = dynamic(
  () => import("@components/templates/GameRoomLayout"),
  {
    suspense: true,
    ssr: false
  }
)
const GameRoomWaitingPage = dynamic(
  () => import("@feature/page/games/gameRoomWaitingPage"),
  {
    suspense: true,
    ssr: false
  }
)

export default function GameRoomList() {
  const router = useRouter()
  const { id, GameHome } = router.query
  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")
  const { onSetGameData } = useGameStore()

  useEffect(() => {
    let load = false

    if (!load) {
      if (gameData) onSetGameData(gameData)
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData])

  return (
    <>
      <GameRoomWaitingPage _roomId={id as string} />
    </>
  )
}

GameRoomList.getLayout = function getLayout(page: ReactElement) {
  return isMobile && CONFIGS.DISPLAY_MOBILE_MODE === "true" ? (
    <WaitingLayout />
  ) : (
    <GameRoomLayout>{page}</GameRoomLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
