import { ReactElement, useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GameRoomLayout from "@components/template/GameRoomLayout"
import useGameStore from "@stores/game"
import GameSlide from "@feature/slider/components/templates/GameSlide"
import SkeletonBanner from "@components/atoms/skeleton/SkeletonBanner"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGamesById from "@feature/game/containers/hooks/useGamesById"

export default function GameLobby() {
  const [gameData, setGameData] = useState<IGame>()
  const { data } = useGameStore()
  const { dataGame, isLoading } = useGamesById({ _gameId: data ? data.id : "" })

  useEffect(() => {
    if (!isLoading && dataGame) setGameData(dataGame.data[0])
  }, [dataGame, isLoading])

  return (
    <>
      {gameData ? (
        <>
          <GameSlide />
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              router.push(`${router.asPath}/roomlist`)
            }}
          >
            Click
          </Button> */}
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
