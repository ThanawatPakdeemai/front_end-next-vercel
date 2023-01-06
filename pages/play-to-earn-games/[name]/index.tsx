import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GameRoomLayout from "@components/template/GameRoomLayout"
import { Button } from "@mui/material"
import { useRouter } from "next/router"

export default function GameLobby() {
  const router = useRouter()
  const { name } = router.query

  // mockup waiting for lobbu
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          router.push(`/play-to-earn-games/${name as string}/roomlist`)
        }}
      >
        Click
      </Button>
    </>
  )
}

GameLobby.getLayout = function getLayout(page: ReactElement) {
  return <GameRoomLayout>{page}</GameRoomLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
