import RightSidebarContent from "@components/templates/contents/RightSidebarContent"
import GameReviews from "@feature/game/components/molecules/GameReviews"
import { Box } from "@mui/material"
import useGameStore from "@stores/game"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import React, { ReactElement } from "react"

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
  const { data: gameData } = useGameStore()
  return (
    <Box
      sx={{
        ".right-sidebar__content": {
          padding: "0px!important",
          borderRadius: "24px!important",
          border: "none!important"
        },
        ".right-sidebar__aside .panel-content": {
          height: "700px"
        }
      }}
    >
      <RightSidebarContent
        className="mb-24"
        content={<GameSummaryRewardPage />}
        aside={
          <GameReviews
            gameType="play-to-earn"
            gameId={gameData?.id || ""}
          />
        }
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
