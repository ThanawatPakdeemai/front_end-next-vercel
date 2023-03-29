import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import { Box } from "@mui/material"
import RightSidebarContent from "@components/templates/contents/RightSidebarContent"
import React, { ReactElement, useEffect } from "react"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"

const GameRoomLayout = dynamic(
  () => import("@components/templates/GameRoomLayout"),
  {
    suspense: true,
    ssr: false
  }
)
const GameSummaryRewardPage = dynamic(
  () => import("@feature/page/games/gameSummaryRewardPage"),
  {
    suspense: true,
    ssr: false
  }
)

export default function Notification_id() {
  const router = useRouter()
  const { onSetGameData } = useGameStore()
  const { GameHome } = router.query
  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")

  useEffect(() => {
    let load = false

    if (!gameData) return
    if (!load) onSetGameData(gameData)

    return () => {
      load = true
    }
  }, [gameData, onSetGameData])

  return (
    <Box
      sx={{
        ".right-sidebar__content": {
          padding: "0px!important",
          borderRadius: "24px!important",
          border: "none!important"
        }
      }}
    >
      <RightSidebarContent
        className="mb-24"
        content={<GameSummaryRewardPage />}
        aside={<></>}
      />
    </Box>
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
