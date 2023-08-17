import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import useGameWhatsNew from "@feature/game/containers/hooks/useGameWhatsNew"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import useGlobal from "@hooks/useGlobal"
import { IGetType } from "@feature/game/interfaces/IGameService"
import useGameStore from "@stores/game"
import useTabContext from "@feature/tab/contexts/useTabContext"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const HowToPlayBody = dynamic(
  () => import("@feature/game/components/molecules/HowToPlayBody"),
  {
    suspense: true,
    ssr: false
  }
)
const WhatsNewBody = dynamic(
  () => import("@feature/game/components/molecules/WhatsNewBody"),
  {
    suspense: true,
    ssr: false
  }
)
const AboutGame = dynamic(() => import("@components/organisms/AboutGame"), {
  suspense: true,
  ssr: false
})
const GameItemsBody = dynamic(
  () => import("@feature/game/components/molecules/GameItemsBody"),
  {
    suspense: true,
    ssr: false
  }
)

const useGameTabController = (gameType: IGetType, gameId: string) => {
  const { t } = useTranslation()
  const { getGameMode } = useGlobal()
  const { newVersionData } = useGameWhatsNew(gameType, gameId)
  const { singleVersion, gameHowToPlay, gameItems, gameDescription } =
    useGameOverview(gameId, gameType)
  const { data: gameData } = useGameStore()
  const { tabValue, setTabValue } = useTabContext()

  const _gameType: {
    id: string
    label: string
    icon?: React.ReactNode
    component?: React.ReactNode
  } =
    gameData &&
    (getGameMode(gameData) === "free-to-play" ||
      getGameMode(gameData) === "story-mode")
      ? ({} as {
          id: string
          label: string
          icon?: React.ReactNode
          component?: React.ReactNode
        })
      : {
          id: "game-items",
          label: t("game_items"),
          icon: <Icomoon className="icon-Diamond text-[#70727B]" />,
          component: <GameItemsBody gameItems={gameItems} />
        }

  /**
   * @description Tab Content Partner Game
   */
  const GAME_TAB_CONTENT:
    | {
        id: string
        label: string
        icon?: React.ReactNode
        component?: React.ReactNode
      }[] = [
    {
      id: "about-us",
      label: t("game_details"),
      icon: "",
      component: <AboutGame text={gameDescription} />
    },
    {
      id: "how-to-play",
      label: t("how_to_play"),
      icon: <Icomoon className="icon-Book text-[#70727B]" />,
      component: <HowToPlayBody text={gameHowToPlay} />
    },
    _gameType,
    {
      id: "whats-new",
      label: t("whats_new"),
      icon: <Icomoon className="icon-Book text-[#70727B]" />,
      component: (
        <WhatsNewBody
          title={newVersionData ? newVersionData.version : singleVersion || ""}
          description={newVersionData ? newVersionData.content : ""}
        />
      )
    }
  ]

  /**
   * @description Set Tab Value
   */
  useEffect(() => {
    if (!tabValue) return
    let load = false

    if (!load) {
      setTabValue("about-us")
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTabValue])

  return {
    GAME_TAB_CONTENT,
    tabValue
  }
}

export default useGameTabController
