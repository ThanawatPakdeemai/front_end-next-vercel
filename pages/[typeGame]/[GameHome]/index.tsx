import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import SkeletonBanner from "@components/atoms/skeleton/SkeletonBanner"
import StoryLobby from "@feature/game/components/templates/lobby/StoryLobby"
import GamePageDefault from "@components/templates/GamePageDefault"
import RightSidebarContentEffect from "@components/templates/contents/RightSidebarContentEffect"
import { useRouter } from "next/router"
import OverviewHowToPlay from "@components/organisms/OverviewHowToPlay"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import DefaultLobby from "@feature/game/components/templates/lobby/DefaultLobby"
import { GetServerSideProps } from "next"
import { getGameByPath } from "@feature/game/containers/services/game.service"

export default function GameLobby() {
  const router = useRouter()
  const { GameHome } = router.query
  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")

  // const [gameData, setGameData] = useState<IGame>()
  // const { data } = useGameStore()
  // const { dataGame, isLoading } = useGamesById({ _gameId: data ? data.id : "" })

  // const { data } = useGameStore()
  // const [gameData, setGameData] = useState<IGame>()
  // useEffect(() => {
  //   if (data) setGameData(gameData)
  // }, [data])

  const getTemplateLobby = () => {
    if (gameData) {
      switch (gameData.game_type) {
        case "storymode":
          return (
            <RightSidebarContentEffect
              content={<StoryLobby />}
              aside={
                <OverviewHowToPlay
                  gameId={gameData._id}
                  gameType="story-mode"
                  title="how_to_play"
                />
              }
            />
          )
        default:
          return <DefaultLobby gameData={gameData} />
      }
    }
  }

  return <>{gameData ? getTemplateLobby() : <SkeletonBanner />}</>
}

GameLobby.getLayout = function getLayout(page: ReactElement) {
  return <GamePageDefault component={page} />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const gameData = await getGameByPath((ctx.params?.GameHome as string) || "")

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ["common"]))
    },
    redirect: {
      destination: !(gameData.data.length > 0) ? "/404" : ""
    }
  }
}
