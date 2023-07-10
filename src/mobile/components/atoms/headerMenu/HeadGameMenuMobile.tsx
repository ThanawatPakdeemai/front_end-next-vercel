import React, { memo } from "react"
import { GAME_MENU_MOBILE } from "@mobile/constants/menuMobile"
import { Box } from "@mui/material"
import { IGetType } from "@feature/game/interfaces/IGameService"
import { defaultCategory, useBaseProvider } from "@providers/BaseProvider"

const HeadGameMenuMobile = () => {
  const { setSelectedCategory, setActiveMenu, activeMenu } = useBaseProvider()
  const handleGameMenu = (_type: IGetType) => {
    setActiveMenu(_type)
    setSelectedCategory(defaultCategory)
  }

  return (
    <Box
      component="div"
      className="home-menu__mobile--menu flex flex-wrap items-center gap-y-4 whitespace-nowrap"
    >
      {GAME_MENU_MOBILE.map((item) => (
        <Box
          onClick={() => handleGameMenu(item.type)}
          component="button"
          key={item.id}
          className={`relative flex-1 px-[6px] py-[12px] font-urbanist text-[90%] ${
            activeMenu === item.type
              ? "active-menu text-[#F32429]"
              : "text-[#616161]"
          }`}
          sx={{
            fontWeight: "bold",
            "&:after": {
              content: '""',
              background: "#35383F",
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "2px"
            },
            "&.active-menu:after": {
              background: "#F32429",
              height: "4px",
              borderRadius: "2px",
              bottom: "-1px"
            }
          }}
        >
          {item.label}
        </Box>
      ))}
    </Box>
  )
}

export default memo(HeadGameMenuMobile)
