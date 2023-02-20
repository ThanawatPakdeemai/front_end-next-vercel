import { ReactElement, useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import SkeletonBanner from "@components/atoms/skeleton/SkeletonBanner"
import StoryLobby from "@feature/game/components/templates/lobby/StoryLobby"
import GamePageDefault from "@components/templates/GamePageDefault"
import RightSidebarContentEffect from "@components/templates/contents/RightSidebarContentEffect"
import { useRouter } from "next/router"
import OverviewHowToPlay from "@components/organisms/OverviewHowToPlay"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import DefaultLobby from "@feature/game/components/templates/lobby/DefaultLobby"
import useGameStore from "@stores/game"

export default function GameLobby() {
  const router = useRouter()
  const { GameHome } = router.query
  const { onSetGameData } = useGameStore()

  // const { gameData } = useFindGameById(id ? id.toString() : "")
  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")
  // const [gameData, setGameData] = useState<IGame>()
  // const { data } = useGameStore()
  // const { dataGame, isLoading } = useGamesById({ _gameId: data ? data.id : "" })
  // const router = useRouter()
  // const { allGameData } = useGetAllGames()

  // useEffect(() => {
  //   if (gameData === undefined) {
  // router.push("/404")
  //   }
  // }, [GameHome, gameData, router])

  useEffect(() => {
    if (gameData) onSetGameData(gameData)
  }, [gameData, onSetGameData])

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

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
