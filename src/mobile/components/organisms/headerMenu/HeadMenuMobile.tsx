import { Box } from "@mui/material"
import { memo } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import HomeIcon from "@mui/icons-material/Home"
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
// import SearchIcon from "@mui/icons-material/Search"
import IconButtonCustom from "@components/atoms/IconButtonCustom/IconButtonCustom"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import useNotiStore from "@stores/notification"
import INaka from "@components/icons/Naka"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import ListSetting from "@mobile/components/organisms/ListSetting"
// import MenuIcon from "@mui/icons-material/Menu"

export const styleIcon = {
  fontSize: "20px !important"
}
const HeadMenuMobile = () => {
  const { count } = useNotiStore()
  const router = useRouter()
  const iconmotion = {
    hover: {
      scale: 1.2,
      rotate: 20,
      ease: "easeIn",
      transition: {
        duration: 0.4,
        stiffness: 500,
        type: "spring"
      }
    }
  }

  return (
    <header className="header fixed inset-x-0 bottom-4 z-[999] ">
      <Box
        component="div"
        className="flex content-center items-center justify-center "
      >
        <Box
          component="div"
          className="bg-white/30 border-slate-50 w-full rounded-full border border-neutral-800 text-white-default backdrop-blur-md"
        >
          <div className="m-2 mx-[10px] grid grid-cols-5  items-center justify-items-center gap-4 rounded-full">
            <Link
              href="/"
              className="static"
            >
              <HomeIcon
                sx={router.asPath === "/" ? { fontSize: 30 } : { fontSize: 25 }}
              />
              {router.asPath === "/" && (
                <div className="absolute left-[24px] top-[-6px] h-[5px]  w-[15px] rounded-t-lg bg-error-main" />
              )}
            </Link>
            <Link
              href="/play-to-earn"
              className="static"
            >
              <SportsEsportsIcon sx={{ fontSize: 30 }} />
            </Link>
            <IconButtonCustom
              aria-label="expanded-menu-profile"
              className=" h-10 w-10 rotate-45 rounded-[13px] border-[2px] border-neutral-700 bg-error-main duration-100 "
            >
              <div className="rotate-[-45deg] text-white-default">
                <INaka
                  width="29"
                  hanging="16"
                  color="#ffffff"
                />
              </div>
            </IconButtonCustom>
            <Link
              href="/notification"
              className="static"
            >
              <ButtonIcon
                variants={iconmotion}
                whileHover="hover"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 4
                }}
                icon={
                  <NotificationsOutlinedIcon
                    sx={
                      router.asPath === "/notification"
                        ? { fontSize: 30 }
                        : { fontSize: 25 }
                    }
                    className="text-white-primary"
                  />
                }
                className={`relative flex cursor-pointer items-center justify-center rounded-lg  bg-transparent before:absolute before:right-[6px] before:top-[5px] before:h-[6px] before:w-[6px] before:rounded-full ${
                  (count > 0 && "before:bg-error-main before:opacity-100") ||
                  "before:bg-transparent before:opacity-0"
                }`}
                aria-label="notification-button"
              />
              {router.asPath === "/notification" && (
                <div className="absolute right-[75px] top-[-6px] h-[5px]  w-[15px] rounded-t-lg bg-error-main" />
              )}
            </Link>
            <ListSetting />
          </div>
        </Box>
      </Box>
    </header>
  )
}

export default memo(HeadMenuMobile)
