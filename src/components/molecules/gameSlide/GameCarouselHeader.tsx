import React, { memo, useEffect, useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import IconArrowRight from "@components/icons/arrowRightIcon"
import IconArrowLeft from "@components/icons/arrowLeftIcon"
import { motion, useAnimation } from "framer-motion"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { Chip } from "@mui/material"
import { IGetType } from "@feature/game/interfaces/IGameService"

export interface ISlideList extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  label: string
  type: string
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
  curType?: string
  setCurType?: (_type: IGetType) => void
  onView?: () => void
  onNext?: () => void
  onPrev?: () => void
}

const GameCarouselHeader = ({
  menu,
  curType,
  setCurType,
  onView,
  onNext,
  onPrev
}: IProps) => {
  const bgColor = `!bg-${menu?.theme}-main`

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

  const onClickedView = () => {
    if (onView) {
      return onView()
    }
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
    <div className="slick-header-container relative mb-4 w-full md:h-[50px]">
      {menu && (
        <motion.div
          key={`sticker_${menu.title}`}
          className="absolute top-[-80px] left-[-80px] hidden lg:block"
          initial={{ rotateZ: menu.stickerRotate }}
          animate={animateControls}
          whileHover={{ rotateZ: 0 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 300
          }}
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
        >
          {menu.sticker}
        </motion.div>
      )}

      <div className="flex h-full w-full flex-wrap items-center justify-end gap-2 sm:flex-nowrap">
        {menu && (
          <div className="relative flex h-full w-fit max-w-[424px] flex-auto flex-wrap items-center justify-between rounded-lg border-2 border-neutral-800 bg-neutral-900 bg-opacity-40 px-1 text-[10px] capitalize backdrop-blur-[25px] sm:flex-nowrap lg:flex-none">
            <div className="flex flex-auto items-center justify-center whitespace-nowrap py-1 pl-4 font-bold sm:justify-start md:flex-none">
              {menu.icon}
              <p
                className={`text-${menu.theme}-main h-[10px] pl-2 pr-2 font-neue-machina-bold font-bold uppercase`}
              >
                {menu.title}
              </p>
            </div>
            <div className="flex flex-[1_1_100%] justify-center sm:flex-none sm:justify-start ">
              {" "}
              {menu.menuList.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`${item.className} ml-1 !cursor-pointer`}
                  onClick={() => onChangeType(item.type as IGetType)}
                >
                  <Chip
                    label={item.label}
                    size="medium"
                    color={curType === item.type ? menu.theme : undefined}
                    className={` h-full w-full cursor-pointer font-bold hover:bg-${
                      menu.theme
                    }-main !hover:text-white-primary capitalize ${
                      curType === item.type
                        ? `!text-white-primary ${bgColor}`
                        : "text-black-default hover:text-white-primary"
                    }`}
                    sx={{ background: "red" }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex h-10 w-fit max-w-sm flex-auto items-center justify-between text-[8px] lg:flex-none">
          {onView && (
            <ButtonToggleIcon
              startIcon={<AddIcon />}
              text="view all"
              handleClick={onClickedView}
              className="mr-4 flex h-full w-36 items-center justify-center rounded-md border border-neutral-700 font-neue-machina text-sm font-bold capitalize leading-3 text-white-primary"
              type="button"
            />
          )}

          <div className="arrow-slick-container bg-black grid h-full w-[100px] grid-cols-2 divide-x divide-neutral-700 rounded-md border border-neutral-700 text-white-primary ">
            <button
              type="button"
              className="flex h-full w-full items-center justify-center"
              onClick={() => onClickedPrev()}
            >
              <IconArrowLeft />
            </button>
            <button
              type="button"
              className="flex h-full w-full items-center justify-center"
              onClick={() => onClickedNext()}
            >
              <IconArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default memo(GameCarouselHeader)
