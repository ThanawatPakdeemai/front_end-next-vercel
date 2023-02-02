import { ReactElement, useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useGameStore from "@stores/game"
import GameSlide from "@feature/slider/components/templates/GameSlide"
import SkeletonBanner from "@components/atoms/skeleton/SkeletonBanner"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGamesById from "@feature/game/containers/hooks/useGamesById"
import StoryLobby from "@feature/game/components/templates/lobby/StoryLobby"
import GamePageDefault from "@components/template/GamePageDefault"
import OverViewGameStoryMode from "@components/organisms/OverviewGameStoryMode"
import RightSidebarContent from "@components/template/RightSidebarContent"

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

GameLobby.getLayout = function getLayout(page: ReactElement) {
  return (
    <GamePageDefault
      component={
        <RightSidebarContent
          content={page}
          aside={<OverViewGameStoryMode />}
        />
      }
    />
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
