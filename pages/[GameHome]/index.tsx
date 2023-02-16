import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import SkeletonBanner from "@components/atoms/skeleton/SkeletonBanner"
import StoryLobby from "@feature/game/components/templates/lobby/StoryLobby"
import GamePageDefault from "@components/template/GamePageDefault"
import OverviewHowToPlay from "@components/organisms/OverviewHowToPlay"
import RightSidebarContentEffect from "@components/template/RightSidebarContentEffect"
import { useRouter } from "next/router"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import DefaultLobby from "@feature/game/components/templates/lobby/DefaultLobby"

export default function GameLobby() {
  const router = useRouter()
  const { GameHome } = router.query
  // const { gameData } = useFindGameById(id ? id.toString() : "")
  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")

  // TODO: Add game to store
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

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
