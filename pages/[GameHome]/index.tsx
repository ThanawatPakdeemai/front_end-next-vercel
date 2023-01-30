import { ReactElement, useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useGameStore from "@stores/game"
import GameSlide from "@feature/slider/components/templates/GameSlide"
import SkeletonBanner from "@components/atoms/skeleton/SkeletonBanner"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGamesById from "@feature/game/containers/hooks/useGamesById"
import StoryLobby from "@feature/game/components/templates/lobby/storymode/StoryLobby"
import GamePageDefault from "@components/template/GamePageDefault"
import Overview from "@components/organisms/Overview"
import OverviewIcon from "@components/icons/OverviewIcon"

export default function GameLobby() {
  const [gameData, setGameData] = useState<IGame>()
  const { data } = useGameStore()
  const { dataGame, isLoading } = useGamesById({ _gameId: data ? data.id : "" })

  useEffect(() => {
    if (!isLoading && dataGame) setGameData(dataGame.data[0])
  }, [dataGame, isLoading])

  const getTemplateLobby = () => {
    if (gameData) {
      switch (gameData.game_type) {
        case "storymode":
          return <StoryLobby />
        default:
          return <GameSlide />
      }
    }
  }

  return <>{gameData ? getTemplateLobby() : <SkeletonBanner />}</>
}

const OverviewContent = () => {
  const { data } = useGameStore()
  const [gameData, setGameData] = useState<IGame>()
  useEffect(() => {
    if (data) setGameData(data as IGame)
  }, [data])
  return (
    <div className="flex flex-col">
      <Overview
        icon={<OverviewIcon />}
        title="Game overview"
      >
        <p
          className="px-6 py-2 text-start text-sm text-neutral-500"
          dangerouslySetInnerHTML={{
            __html: gameData ? gameData.banner_description : ""
          }}
        />
      </Overview>
    </div>
  )
}

GameLobby.getLayout = function getLayout(page: ReactElement) {
  return <GamePageDefault component={OverviewContent()}>{page}</GamePageDefault>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
