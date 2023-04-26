import React, { useEffect } from "react"
import PanelContent from "@components/molecules/PanelContent"
import { Box, Chip, Tab } from "@mui/material"
import useGlobal from "@hooks/useGlobal"
import useTabContext from "@feature/tab/contexts/useTabContext"
import useTab from "@feature/tab/hook/useTab"
import { IGetType } from "@feature/game/interfaces/IGameService"
import useGameTabController from "@feature/game/containers/hooks/useGameTabController"
import _ from "lodash"

export interface IGameTabsProps {
  gameType: IGetType
  gameId: string
}
const GameTabs = ({ gameType, gameId }: IGameTabsProps) => {
  const { hydrated } = useGlobal()
  const { GAME_TAB_CONTENT } = useGameTabController(gameType, gameId)
  const { handleChangeTab } = useTab()
  const { tabValue, setTabValue } = useTabContext()

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
    <Box
      component="div"
      className="relative h-full"
    >
      <div className="absolute left-[-30px] top-[-80px] flex w-full flex-wrap overflow-hidden sm:w-auto">
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
                    className={`bg-nuetral-800 hover:text-nuetral-100 cursor-pointer font-bold capitalize ${
                      item.id === tabValue ? " !text-nuetral-100" : ""
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
                component="div"
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
