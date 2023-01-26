import GameRoomLayout from "@components/template/GameRoomLayout"
import GameSummaryPage from "@feature/page/games/gameSummaryPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import React, { ReactElement } from "react"

export default function Notification_id() {
  const router = useRouter()
  const { room_id } = router.query

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
