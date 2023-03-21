import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import React, { ReactElement, useEffect } from "react"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import useGameStore from "@stores/game"

const GameRoomLayout = dynamic(
  () => import("@components/templates/GameRoomLayout"),
  {
    suspense: true,
    ssr: false
  }
)
const GameSummaryPage = dynamic(
  () => import("@feature/page/games/gameSummaryPage"),
  {
    suspense: true,
    ssr: false
  }
)

export default function Notification_id() {
  const router = useRouter()
  const { onSetGameData } = useGameStore()
  const { room_id, GameHome } = router.query
  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")

  useEffect(() => {
    if (!gameData) return
    onSetGameData(gameData)
  }, [gameData, onSetGameData])

  return (
    <>
      <GameSummaryPage _roomId={room_id as string} />
    </>
  )
}

Notification_id.getLayout = function getLayout(page: ReactElement) {
  return <GameRoomLayout>{page}</GameRoomLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
