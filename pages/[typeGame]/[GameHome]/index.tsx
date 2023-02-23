import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
import { getGameByPath } from "@feature/game/containers/services/game.service"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"

const SkeletonBanner = dynamic(
  () => import("@components/atoms/skeleton/SkeletonBanner"),
  {
    suspense: true
  }
)
const StoryLobby = dynamic(
  () => import("@feature/game/components/templates/lobby/StoryLobby"),
  {
    suspense: true
  }
)
const GamePageDefault = dynamic(
  () => import("@components/templates/GamePageDefault"),
  {
    suspense: true
  }
)
const RightSidebarContentEffect = dynamic(
  () => import("@components/templates/contents/RightSidebarContentEffect"),
  {
    suspense: true
  }
)
const OverviewHowToPlay = dynamic(
  () => import("@components/organisms/OverviewHowToPlay"),
  {
    suspense: true
  }
)
const DefaultLobby = dynamic(
  () => import("@feature/game/components/templates/lobby/DefaultLobby"),
  {
    suspense: true
  }
)

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
