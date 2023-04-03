import React, { useEffect } from "react"
import PanelContent from "@components/molecules/PanelContent"
import { Box, Chip, Tab } from "@mui/material"
import useGlobal from "@hooks/useGlobal"
import { useTranslation } from "react-i18next"
import WhatsNewIcon from "@components/icons/WhatsNewIcon"
import HowToPlayIcon from "@components/icons/HowToPlayIcon/HowToPlayIcon"
import IDiamond from "@components/icons/Diamond"
import useTabContext from "@feature/tab/contexts/useTabContext"
import useTab from "@feature/tab/hook/useTab"
import { IGetType } from "@feature/game/interfaces/IGameService"
import useGameWhatsNew from "@feature/game/containers/hooks/useGameWhatsNew"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import AboutGame from "@components/organisms/AboutGame"
import useGameStore from "@stores/game"
import _ from "lodash"
import GameItemsBody from "@feature/game/components/molecules/GameItemsBody"
import HowToPlayBody from "@feature/game/components/molecules/HowToPlayBody"
import WhatsNewBody from "@feature/game/components/molecules/WhatsNewBody"

interface IProps {
  gameType: IGetType
  gameId: string
}
const GameTabs = ({ gameType, gameId }: IProps) => {
  const { hydrated, getTypeGamePathFolder } = useGlobal()
  const { data: gameData } = useGameStore()
  const { t } = useTranslation()
  const { handleChangeTab } = useTab()
  const { tabValue, setTabValue } = useTabContext()

  const { newVersionData } = useGameWhatsNew(gameType, gameId)
  const { singleVersion, gameHowToPlay, gameItems, gameDescription } =
    useGameOverview(gameId, gameType)

  const _gameType: {
    id: string
    label: string
    icon?: React.ReactNode
    component?: React.ReactNode
  } =
    gameData &&
    (getTypeGamePathFolder(gameData) === "free-to-play" ||
      getTypeGamePathFolder(gameData) === "story-mode")
      ? ({} as {
          id: string
          label: string
          icon?: React.ReactNode
          component?: React.ReactNode
        })
      : {
          id: "game-items",
          label: t("game_items"),
          icon: <IDiamond stroke="#70727B" />,
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
      icon: <HowToPlayIcon stroke="#70727B" />,
      component: <HowToPlayBody text={gameHowToPlay} />
    },
    _gameType,
    {
      id: "whats-new",
      label: t("whats_new"),
      icon: <WhatsNewIcon color="#70727B" />,
      component: (
        <WhatsNewBody
          title={newVersionData ? newVersionData.version : singleVersion || ""}
          description={newVersionData ? newVersionData.content : ""}
        />
      )
    }
  ]

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

  return hydrated ? (
    <Box className="relative h-full">
      <div className="absolute top-[-80px] left-[-30px] flex w-full flex-wrap overflow-hidden sm:w-auto">
        <div className="flex w-full items-center justify-between gap-2 rounded-xl bg-neutral-700 bg-opacity-40 px-1 capitalize sm:w-auto">
          {GAME_TAB_CONTENT.map((item) =>
            _.isEmpty(item) ? null : (
              <Tab
                sx={{
                  padding: "0!important"
                }}
                onClick={() => handleChangeTab(item.id)}
                label={
                  <Chip
                    label={item.label}
                    size="medium"
                    className={`bg-nuetral-800 cursor-pointer font-bold capitalize hover:text-white-default ${
                      item.id === tabValue ? " !text-white-default" : ""
                    }`}
                    sx={
                      item.id === tabValue ? { path: { stroke: "#fff" } } : {}
                    }
                    icon={item.icon as React.ReactElement}
                  />
                }
                value={item.id}
                key={item.id}
              />
            )
          )}
        </div>
      </div>
      <PanelContent height="h-[500px]">
        <div className="p-4">
          {GAME_TAB_CONTENT.map((item) =>
            item.id === tabValue ? (
              <Box
                role="tabpanel"
                key={item.id}
              >
                {item.component}
              </Box>
            ) : null
          )}
        </div>
      </PanelContent>
    </Box>
  ) : (
    <></>
  )
}

export default GameTabs
