import { ReactElement, useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GameRoomLayout from "@components/template/GameRoomLayout"
import { Button } from "@mui/material"
import { useRouter } from "next/router"
import useGameStore from "@stores/game"
import GameSlide from "@feature/slider/components/templates/GameSlide"
import SkeletonBanner from "@components/atoms/skeleton/SkeletonBanner"
import { IGame } from "@feature/game/interfaces/IGameService"

export default function GameLobby() {
  const router = useRouter()
  const data = useGameStore((state) => state.data)
  const [gameData, setGameData] = useState<IGame>()

  useEffect(() => {
    if (data) {
      setGameData(data)
    }
  }, [data])

  return (
    <>
      {gameData ? (
        <>
          <GameSlide />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              router.push(`/${router.asPath}/roomlist`)
            }}
          >
            Click
          </Button>
        </>
      ) : (
        <SkeletonBanner />
      )}
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
