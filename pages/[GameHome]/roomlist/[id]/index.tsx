import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GameRoomLayout from "@components/template/GameRoomLayout"
import GameRoomWaitingPage from "@feature/page/games/gameRoomWaitingPage"
import { useRouter } from "next/router"

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
