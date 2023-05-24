import ShapeIcon from "@components/icons/ShapeIcon"
import Banners from "@components/molecules/Banners"
import HeadGames from "@components/molecules/HeadGames"
import SidebarGames from "@components/molecules/SidebarGames"
import Tagline from "@components/molecules/tagline/Tagline"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import React from "react"
import { useTranslation } from "react-i18next"
import { MobileView } from "react-device-detect"
import Link from "next/link"
import { useRouter } from "next/router"
import { Box } from "@mui/material"
import HeadMenuMobile from "@mobile/components/organisms/headerMenu/HeadMenuMobile"
import { isMobile } from "@hooks/useGlobal"

const GamePageLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <>
      {isMobile ? (
        <MobileView>
          <div className="main-container mx-auto px-2 ">
            <div className="grid h-full w-full grid-cols-2 content-center justify-items-center text-xs">
              <Link
                href="/play-to-earn-games"
                className={`flex w-full items-center justify-center p-2 ${
                  router.pathname === "/play-to-earn-games"
                    ? "bg-black-100 text-white-default"
                    : "bg-neutral-800 text-neutral-500"
                }`}
              >
                Play to earn
              </Link>
              <Link
                href="/free-to-play-games"
                className={`flex w-full items-center justify-center p-2 ${
                  router.pathname === "/free-to-play-games"
                    ? "bg-black-100 text-white-default"
                    : "bg-neutral-800 text-neutral-500"
                }`}
              >
                Free to play{" "}
                <div
                  className={`ml-4 rounded border border-neutral-700 px-1 py-[1px] uppercase ${
                    router.pathname === "/free-to-play-games"
                      ? "bg-error-main text-white-default"
                      : "bg-black-100 text-neutral-500"
                  }`}
                >
                  {" "}
                  free
                </div>
              </Link>
              <Link
                href="/story-mode-games"
                className={`flex w-full items-center justify-center p-2 ${
                  router.pathname === "/story-mode-games"
                    ? "bg-black-100 text-white-default"
                    : "bg-neutral-800 text-neutral-500"
                }`}
              >
                Story mode games{" "}
                <div
                  className={`ml-4 rounded border border-neutral-700 px-1 py-[1px] uppercase ${
                    router.pathname === "/story-mode-games"
                      ? "bg-error-main text-white-default"
                      : "bg-black-100 text-neutral-500"
                  }`}
                >
                  {" "}
                  free
                </div>
              </Link>
              <Link
                href="/arcade-emporium"
                className={`flex w-full items-center justify-center p-2 ${
                  router.pathname === "/arcade-emporium"
                    ? "bg-black-100 text-white-default"
                    : "bg-neutral-800 text-neutral-500"
                }`}
              >
                Arcade emporium
              </Link>
            </div>
            <div className="flex-row gap-3 md:flex">
              <HeadGames>{children}</HeadGames>
            </div>
          </div>
          <header className="header fixed inset-x-0 bottom-4 z-[999] ">
            <Box
              component="div"
              className="flex content-center items-center justify-center "
            >
              <HeadMenuMobile />
            </Box>
          </header>
        </MobileView>
      ) : (
        <div className="main-container mx-auto px-2 lg:px-0">
          <Header />
          <Tagline
            bgColor="bg-neutral-800"
            textColor="text-neutral-500 font-bold"
            text={String(t("christmas_gift"))}
            icon={<ShapeIcon fill="#4E5057" />}
            show={false}
          />
          <Banners />
          <div className="flex-row gap-3 md:flex">
            <SidebarGames />
            <HeadGames>{children}</HeadGames>
          </div>
          <Footer />
        </div>
      )}
    </>
  )
}

export default GamePageLayout
