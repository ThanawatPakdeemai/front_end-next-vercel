import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import React, { ReactElement } from "react"
import { Box } from "@mui/material"
import RightSidebarContent from "@components/templates/contents/RightSidebarContent"

const GameRoomLayout = dynamic(
  () => import("@components/templates/GameRoomLayout"),
  {
    suspense: true
  }
)
const GameSummaryRewardPage = dynamic(
  () => import("@feature/page/games/gameSummaryRewardPage"),
  {
    suspense: true
  }
)

export default function Notification_id() {
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
