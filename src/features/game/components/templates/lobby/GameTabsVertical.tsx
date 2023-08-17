import React from "react"
import _ from "lodash"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import useGameTabController from "@feature/game/containers/hooks/useGameTabController"
import useTab from "@feature/tab/hook/useTab"
import { textMotion } from "@styles/themes/partial/motion"
import { IGameTabsProps } from "./GameTabs"

const TextLink = dynamic(() => import("@components/atoms/TextLink"), {
  suspense: true,
  ssr: false
})
const Tab = dynamic(() => import("@mui/material/Tab"), {
  suspense: true,
  ssr: false
})

const GameTabsVertical = ({ gameType, gameId }: IGameTabsProps) => {
  const { GAME_TAB_CONTENT, tabValue } = useGameTabController(gameType, gameId)
  const { handleChangeTab } = useTab()

  const StyledTabVertical = {
    padding: "0!important",
    display: "flex",
    alignItems: "flex-start",
    textTransform: "uppercase",
    borderBottom: "1px solid #18181C !important",
    width: "100%",
    opacity: 1
    // "&.tab-active": {
    //   ".icon-arrow__start": {
    //     "path": {
    //       fill: "#bbb"
    //     }
    //   }
    // },
    // ".icon-arrow__end": {
    //   display: "none"
    // },
    // ".text-link__text-wrapper": {
    //   maxWidth: "auto"
    // },
    // ".icon-arrow__start": {
    //   "path": {
    //     fill: "#bbb"
    //   }
    // }
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
                  className="flex flex-1 items-center gap-2 whitespace-nowrap p-0 !pb-0 font-neue-machina-semi !text-[#bbb]"
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
        className="flex-1 text-[#bbb] lg:w-[calc(100%-150px)]"
      >
        {GAME_TAB_CONTENT.map((item) =>
          item.id === tabValue ? (
            <Box
              component="div"
              role="tabpanel"
              key={item.id}
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
