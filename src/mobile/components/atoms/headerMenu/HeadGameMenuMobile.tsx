import React, { memo } from "react"
import { GAME_MENU_MOBILE } from "@mobile/constants/menuMobile"
import { Box } from "@mui/material"
import { IGetType } from "@feature/game/interfaces/IGameService"
import useScrollToEndStore from "@stores/scrollToEnd"

export interface IHeadGameMenuMobileProps {
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<IGetType>>
}

const HeadGameMenuMobile = ({
  activeMenu,
  setActiveMenu
}: IHeadGameMenuMobileProps) => {
  const { setCountCallApi: setValueCountCallApi, setEndLimitApi: setEndLimit } =
    useScrollToEndStore()

  const handlGameMenu = (_type) => {
    setValueCountCallApi(0)
    setActiveMenu(_type)
    setEndLimit(false)
  }

  return (
    <Box
      component="div"
      className="home-menu__mobile--menu flex flex-wrap items-center gap-y-4 whitespace-nowrap"
    >
      {GAME_MENU_MOBILE.map((item) => (
        <Box
          onClick={() => handlGameMenu(item.type)}
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
