import { ReactElement, useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useGameStore from "@stores/game"
import GameSlide from "@feature/slider/components/templates/GameSlide"
import SkeletonBanner from "@components/atoms/skeleton/SkeletonBanner"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGamesById from "@feature/game/containers/hooks/useGamesById"
import StoryLobby from "@feature/game/components/templates/lobby/StoryLobby"
import OverViewGameStoryMode from "@components/organisms/OverviewGameStoryMode"
import useGetAllGames from "@feature/game/containers/hooks/useGetAllGame"
import GamePageDefault from "@components/templates/GamePageDefault"
import RightSidebarContentEffect from "@components/templates/contents/RightSidebarContentEffect"
import { useRouter } from "next/router"

export default function GameLobby() {
  const [gameData, setGameData] = useState<IGame>()
  const { data } = useGameStore()
  const { dataGame, isLoading } = useGamesById({ _gameId: data ? data.id : "" })
  const router = useRouter()
  const { allGameData } = useGetAllGames()
  const { GameHome } = router.query

  useEffect(() => {
    if (
      allGameData &&
      allGameData.data &&
      allGameData.data.find(
        (value) => value.game_url === (GameHome as string)
      ) === undefined
    ) {
      router.push("/404")
    }
  }, [GameHome, allGameData, router])

  useEffect(() => {
    if (!isLoading && dataGame) setGameData(dataGame.data[0])
  }, [dataGame, isLoading])

  const getTemplateLobby = () => {
    if (gameData) {
      switch (gameData.game_type) {
        case "storymode":
          return (
            <RightSidebarContentEffect
              content={<StoryLobby />}
              aside={<OverViewGameStoryMode />}
            />
          )
        default:
          return <GameSlide />
      }
    }
  }

  return <>{gameData ? getTemplateLobby() : <SkeletonBanner />}</>
}

GameLobby.getLayout = function getLayout(page: ReactElement) {
  return <GamePageDefault component={page} />
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
