/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from "react"
import { useAnimation } from "framer-motion"
import { Chip } from "@mui/material"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import { isMobile } from "@hooks/useGlobal"
import { IGetType } from "@feature/game/interfaces/IGameService"

const ButtonToggleIcon = dynamic(
  () => import("@components/molecules/gameSlide/ButtonToggleIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

export interface ISlideList extends React.HTMLAttributes<HTMLDivElement> {
  id: IGetType
  label: string
  type: IGetType
}

export interface IHeaderSlide {
  sticker: React.ReactNode
  icon: React.ReactNode
  title: string
  menuList: ISlideList[]
  theme:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined
  stickerRotate: number
}

interface IProps {
  menu?: IHeaderSlide
  curType?: IGetType
  setCurType?: (_type: IGetType) => void
  onNext?: () => void
  onPrev?: () => void
  onPlaying?: boolean
  hideNextPrev?: boolean
  hideViewAll?: boolean
  showTitle?: boolean
}

const GameCarouselHeader = ({
  menu,
  curType,
  setCurType,
  onNext,
  onPrev,
  onPlaying, // NOT SURE ABOUT THIS
  hideNextPrev,
  hideViewAll,
  showTitle
}: IProps) => {
  const bgColor = `bg-${menu?.theme}-main`
  const bgColorHover = `hover:bg-${menu?.theme}-main`
  const titleIcon = `flex w-[142px] flex-auto items-center justify-center whitespace-nowrap font-bold md:flex-none gap-2`
  const arrowButton =
    "flex h-full w-full items-center justify-center text-[22px]"

  const { t } = useTranslation()
  const animateControls = useAnimation()
  const [isHover, setIsHover] = useState<boolean>(false)

  const rotateSticker = async (_rotate: number) => {
    await animateControls.start({
      rotateZ: _rotate,
      transition: {
        duration: 2,
        type: "spring",
        stiffness: 300
      }
    })
  }

  const onChangeType = (_type: IGetType) => {
    if (!setCurType) return
    setCurType(_type as IGetType)
  }

  const onClickedNext = () => {
    if (onNext) {
      return onNext()
    }
  }

  const onClickedPrev = () => {
    if (onPrev) {
      return onPrev()
    }
  }

  const getMenuClass = () => {
    if (menu?.title === "On Playing") {
      if (isMobile) {
        return "flex h-full w-full flex-wrap items-center gap-[5px] justify-center"
      }
      return "flex h-full w-full flex-wrap items-center gap-[5px] justify-start"
    }
    return "flex h-full w-full flex-wrap items-center gap-[5px] justify-between"
  }

  useEffect(() => {
    if (!menu) return
    let rotate = menu.stickerRotate
    const delay = isHover ? 0 : 4
    const interval = setInterval(() => {
      if (!isHover) {
        rotateSticker(rotate)
        rotate *= -1
      }
    }, (delay + 1) * 1000)
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHover])

  return (
    <div
      className={`slick-header-container relative w-full ${
        isMobile ? "mb-[0.938rem]" : "mb-[1.875rem]"
      }`}
    >
      {
        menu && (
          <div className="absolute left-[-80px] top-[-80px] hidden lg:block">
            {menu.sticker}
          </div>
        )
        // Remove this because CPU usage is too high
        // <motion.div
        //   key={`sticker_${menu.title}`}
        //   className="absolute left-[-80px] top-[-80px] hidden lg:block"
        //   initial={{ rotateZ: menu.stickerRotate }}
        //   animate={animateControls}
        //   whileHover={{ rotateZ: 0 }}
        //   transition={{
        //     duration: 1,
        //     type: "spring",
        //     stiffness: 300
        //   }}
        //   onHoverStart={() => setIsHover(true)}
        //   onHoverEnd={() => setIsHover(false)}
        // ></motion.div>
      }

      <div className={getMenuClass()}>
        {menu && (
          <div
            className={`relative flex h-full w-fit flex-wrap items-center justify-between overflow-x-auto rounded-xl border-2 border-neutral-800 bg-neutral-900 bg-opacity-40 p-[5px] text-[10px] capitalize backdrop-blur-[25px] sm:flex-nowrap lg:flex-none ${
              isMobile ? " !h-auto !w-full !max-w-fit !flex-wrap" : "flex-auto"
            }`}
          >
            {showTitle && (
              <div className={titleIcon}>
                <span className="flex items-center justify-center text-[24px]">
                  {menu.icon}
                </span>
                <p
                  className={`text-${menu.theme}-main text-[16px] font-bold uppercase md:h-[10px] md:text-[10px]`}
                >
                  {t(menu.title)}
                </p>
              </div>
            )}

            <div
              className={`flex flex-[1_1_100%] justify-center gap-1 sm:flex-none sm:justify-start ${
                isMobile ? " flex-wrap " : ""
              }`}
            >
              {menu.menuList.map((item) => (
                <button
                  type="button"
                  aria-label="menu"
                  key={item.id}
                  className={`!cursor-pointer ${
                    item.className ? item.className : ""
                  }`}
                  onClick={() => onChangeType(item.type as IGetType)}
                >
                  <Chip
                    label={t(item.label)}
                    size="medium"
                    color={curType === item.type ? menu.theme : undefined}
                    className={`!hover:text-white-primary ${bgColorHover} h-full w-full cursor-pointer ${bgColorHover} !p-[9px_20px] font-bold capitalize ${
                      curType === item.type
                        ? `!text-white-primary !${bgColor}`
                        : `hover:text-white-primary ${bgColorHover}`
                    }`}
                    sx={{
                      "&.MuiChip-filled": {
                        background: "#18181C"
                      }
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
        {!isMobile && (
          <div className="h-10  w-fit max-w-sm flex-auto items-center justify-between gap-4 text-[8px] md:flex lg:flex-none">
            {!hideViewAll ? (
              <Link
                href={`/${curType}`}
                className="h-full"
              >
                <ButtonToggleIcon
                  startIcon={<Icomoon className="icon-Plus1 text-[22px]" />}
                  text={t("view_all")}
                  className="mr-4 flex h-full w-36 items-center justify-center rounded-md border border-neutral-700 font-neue-machina text-sm font-bold capitalize leading-3 text-white-primary"
                  type="button"
                />
              </Link>
            ) : null}

            {!hideNextPrev && (
              <div className="arrow-slick-container bg-black grid h-full w-[100px] grid-cols-2 divide-x divide-neutral-700 rounded-md border border-neutral-700 text-white-primary ">
                <button
                  type="button"
                  aria-label="Previous Slide"
                  className={arrowButton}
                  onClick={() => onClickedPrev()}
                >
                  <Icomoon className="icon-Full-Arrow-Left" />
                </button>
                <button
                  type="button"
                  className={arrowButton}
                  aria-label="Next Slide"
                  onClick={() => onClickedNext()}
                >
                  <Icomoon className="icon-Full-Arrow-Right" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default memo(GameCarouselHeader)
