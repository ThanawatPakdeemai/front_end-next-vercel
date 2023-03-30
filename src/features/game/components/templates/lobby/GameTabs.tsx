import React from "react"
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
import WhatsNewBody from "../../molecules/WhatsNewBody"
import HowToPlayBody from "../../molecules/HowToPlayBody"
import GameItemsBody from "../../molecules/GameItemsBody"

interface IProps {
  gameType: IGetType
  gameId: string
}
const GameTabs = ({ gameType, gameId }: IProps) => {
  const { hydrated } = useGlobal()
  const { t } = useTranslation()
  const { handleChangeTab } = useTab()
  const { tabValue } = useTabContext()

  const { newVersionData } = useGameWhatsNew(gameType, gameId)
  const { singleVersion, gameHowToPlay, gameItems, gameDescription } =
    useGameOverview(gameId, gameType)

  /**
   * @description Tab Content Partner Game
   */
  const GAME_TAB_CONTENT: {
    id: string
    label: string
    icon?: React.ReactNode
    component?: React.ReactNode
  }[] = [
    {
      id: "about-us",
      label: t("game_partner_about"),
      icon: "",
      component: <AboutGame text={gameDescription} />
    },
    {
      id: "how-to-play",
      label: t("how_to_play"),
      icon: <HowToPlayIcon stroke="#70727B" />,
      component: <HowToPlayBody text={gameHowToPlay} />
    },
    {
      id: "game-items",
      label: t("ntf_game"),
      icon: <IDiamond stroke="#70727B" />,
      component: <GameItemsBody gameItems={gameItems} />
    },
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

  return hydrated ? (
    <Box className="relative h-full">
      <div className="absolute top-[-80px] left-[-30px] flex w-full flex-wrap overflow-hidden sm:w-auto">
        <div className="flex w-full items-center justify-between gap-2 rounded-xl bg-neutral-700 bg-opacity-40 px-1 capitalize sm:w-auto">
          {GAME_TAB_CONTENT.map((item) => (
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
                  sx={item.id === tabValue ? { path: { stroke: "#fff" } } : {}}
                  icon={item.icon as React.ReactElement}
                />
              }
              value={item.id}
              key={item.id}
            />
          ))}
        </div>
      </div>
      <PanelContent height="h-[500px]">
        <div className="p-4">
          {GAME_TAB_CONTENT.map(
            (item) =>
              item.id === tabValue && (
                <Box
                  role="tabpanel"
                  key={item.id}
                >
                  {item.component}
                </Box>
              )
          )}
        </div>
      </PanelContent>
    </Box>
  ) : (
    <></>
  )
}

export default GameTabs
