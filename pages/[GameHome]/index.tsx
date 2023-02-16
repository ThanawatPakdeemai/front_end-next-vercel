import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GameSlide from "@feature/slider/components/templates/GameSlide"
import SkeletonBanner from "@components/atoms/skeleton/SkeletonBanner"
import useGamesById from "@feature/game/containers/hooks/useFindGameById"
import StoryLobby from "@feature/game/components/templates/lobby/StoryLobby"
import GamePageDefault from "@components/template/GamePageDefault"
import OverViewGameStoryMode from "@components/organisms/OverviewGameStoryMode"
import RightSidebarContentEffect from "@components/template/RightSidebarContentEffect"
import { useRouter } from "next/router"

export default function GameLobby() {
  const router = useRouter()
  const { id } = router.query
  const { gameData } = useGamesById(id ? id.toString() : "", "story-mode")

  // TODO: Change to useGetGameByPath
  // const { gameDataByPath } = useGetGameByPath(id ? id.toString() : "")

  // TODO: Add game to store
  // const { data } = useGameStore()
  // const [gameStory, setGameStory] = useState<IGame>()
  // useEffect(() => {
  //   if (!isLoadingGameData && gameData) setGameStory(gameData)
  // }, [isLoadingGameData, gameData])

  const getTemplateLobby = () => {
    if (gameData) {
      switch (gameData.game_type) {
        case "storymode":
          return (
            <RightSidebarContentEffect
              content={<StoryLobby />}
              aside={
                <OverViewGameStoryMode
                  gameId={id ? id.toString() : ""}
                  gameType="story-mode"
                />
              }
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
