import React from "react"
import TextLink from "@components/atoms/TextLink"
import { Box, Tab } from "@mui/material"
import useGameTabController from "@feature/game/containers/hooks/useGameTabController"
import useTab from "@feature/tab/hook/useTab"
import _ from "lodash"
import { textMotion } from "@components/organisms/Footer"
import { IGameTabsProps } from "./GameTabs"

const GameTabsVertical = ({ gameType, gameId }: IGameTabsProps) => {
  const { GAME_TAB_CONTENT, tabValue } = useGameTabController(gameType, gameId)
  const { handleChangeTab } = useTab()

  const StyledTabVertical = {
    padding: "0!important",
    color: "#4E5057",
    display: "flex",
    alignItems: "flex-start",
    textTransform: "uppercase",
    borderBottom: "1px solid #18181C !important",
    width: "100%",
    "&.tab-active": {
      color: "#F7FBFA!important",
      ".icon-arrow__start": {
        "path": {
          fill: "#ffffff"
        }
      }
    },
    ".icon-arrow__end": {
      display: "none"
    },
    ".text-link__text-wrapper": {
      maxWidth: "auto"
    },
    ".icon-arrow__start": {
      "path": {
        fill: "#ffffff"
      }
    }
  }

  return (
    <div
      id="game-tab-vertical__wrapper"
      className="mb-4 flex flex-col gap-10 lg:flex-row"
    >
      <aside
        id="game-tab-vertical__aside"
        className="mt-[-15px] flex flex-col items-start lg:w-[170px]"
      >
        {GAME_TAB_CONTENT.map((item) =>
          _.isEmpty(item) ? null : (
            <Tab
              sx={StyledTabVertical}
              onClick={() => handleChangeTab(item.id)}
              label={
                <TextLink
                  name={item.label}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variantsText={textMotion}
                  className="flex flex-1 items-center gap-2 whitespace-nowrap p-0 !pb-0 font-neue-machina-semi"
                  active={tabValue === item.id}
                />
              }
              value={item.id}
              key={item.id}
              className={`${tabValue === item.id ? "tab-active" : ""}`}
            />
          )
        )}
      </aside>
      <div
        id="game-tab-vertical__content"
        className="flex-1 lg:w-[calc(100%-150px)]"
      >
        {GAME_TAB_CONTENT.map((item) =>
          item.id === tabValue ? (
            <Box
              component="div"
              role="tabpanel"
              key={item.id}
              sx={{
                color: "#70727B",
                "h1, h2, h3, h4, h5": {
                  color: "#A6A9AE"
                }
              }}
            >
              {item.component}
            </Box>
          ) : null
        )}
      </div>
    </div>
  )
}

export default GameTabsVertical
