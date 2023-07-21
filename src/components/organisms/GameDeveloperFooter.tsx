import ButtonIcon from "@components/atoms/button/ButtonIcon"
import IconArrowTop from "@components/icons/arrowTopIcon"
import DesktopIcon from "@components/icons/DesktopIcon"
import DollarPaperIcon from "@components/icons/DollarPaperIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import Link from "next/link"
import React from "react"
import { isMobile } from "@hooks/useGlobal"

const GameDeveloperFooter = () => {
  const iconArrow = {
    hover: {
      scaleY: 1.2,
      ease: "easeIn"
    }
  }
  return (
    <div className="mx-8 pt-2 text-[12px] md:mx-4 lg:flex lg:pt-[80px]">
      <div className="w-full rounded-xl border border-neutral-800 bg-neutral-780 p-4 md:p-6 lg:w-[90%] lg:rounded-[20px]">
        <div className="md:flex">
          <div
            className={`mx-auto grid max-w-xs items-center justify-center gap-2 text-white-primary md:mx-0 md:flex md:w-2/4 md:max-w-none md:gap-0 md:pr-[20px] ${
              isMobile && `justify-items-center`
            }`}
          >
            <Link href="/game-developer">
              <ButtonToggleIcon
                startIcon={<DesktopIcon />}
                text="Game a NAKA Dev"
                className={`z-[2] ${
                  isMobile ? `mb-2 h-[45px] !w-[300px]` : `h-[50px] !w-[220px]`
                } border-[1px] border-solid border-neutral-700 bg-transparent font-bold capitalize text-white-default`}
                type="button"
              />
            </Link>
            <h3
              className={` ${
                isMobile && `text-center`
              } text-grey-neutral-04 md:w-[280px] md:pl-[30px]`}
            >
              Work with the industry`s premier Web3 gaming platform.
            </h3>
          </div>
          <div
            className={`mx-auto mt-[20px] grid max-w-xs items-center justify-center gap-2 md:mx-0 md:mt-0 md:flex md:w-3/4 md:max-w-none md:gap-0 ${
              isMobile && `justify-items-center`
            }`}
          >
            <Link href="/joinus">
              <ButtonToggleIcon
                // handleClick={() =>
                //   openInNewTab("https://main.nakamoto.games/")
                // }
                startIcon={<DollarPaperIcon />}
                text="Game a Partner"
                className={`z-[2] ${
                  isMobile ? `mb-2 h-[45px] !w-[300px]` : `h-[50px] !w-[220px]`
                } border-[1px] border-solid border-neutral-700 bg-transparent font-bold capitalize text-white-default`}
                type="button"
              />
            </Link>
            <h3 className="text-grey-neutral04 md:max-w-[300px] md:pl-[30px]">
              Earn some serious cash promoting Nakamoto.Games
            </h3>
            NAKA Ecosystem
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className="my-2 flex justify-center lg:my-0 lg:pt-2">
          <div className="flex h-[82px] w-[90px] items-center justify-center self-center rounded-[20px] bg-neutral-800 lg:ml-[10px] lg:h-full">
            <ButtonIcon
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
              }}
              variants={iconArrow}
              whileHover="hover"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 5
              }}
              icon={<IconArrowTop className="text-white-default" />}
              className="h-fit cursor-pointer self-center rounded-[15px] border border-neutral-700 p-4"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default GameDeveloperFooter
