import React from "react"
import { Image } from "@components/atoms/image"
import { IGame } from "@feature/game/interfaces/IGameService"
import { motion } from "framer-motion"
import { ImageCustom } from "@components/atoms/image/Image"

export const iconmotion = {
  hover: {
    scale: 1.2,
    rotate: 17,
    ease: "easeIn",
    transition: {
      duration: 0.4,
      stiffness: 500,
      type: "spring"
    }
  }
}
export interface ICardNextSlide {
  slideNext: IGame
  gotoNext?: () => void
  gotoPrev?: () => void
}

export default function CardGameSlide({
  slideNext,
  gotoNext,
  gotoPrev
}: ICardNextSlide) {
  return (
    <div className=" rounded-3xl border-[1px] border-neutral-800 ">
      <div className="relative flex justify-between px-4">
        <ImageCustom
          width={200}
          height={200}
          src="/images/gamePage/game1.png"
          alt={slideNext?.name}
        />
        <div className="absolute bottom-0 m-4 flex w-72 justify-between">
          <div className="rounded-2xl bg-black-500 px-3 py-2">
            <button
              onClick={gotoPrev}
              type="button"
              aria-label="gotoNext"
            >
              <motion.div whileHover="hover">
                <motion.div
                  variants={iconmotion}
                  transition={{ type: "spring", stiffness: 400, damping: 4 }}
                >
                  <Image
                    src="/images/gamePage/btnPrev.png"
                    alt="Picture of the author"
                    width={16}
                    height={16}
                  />
                </motion.div>
              </motion.div>
            </button>
          </div>
          <div className="rounded-2xl bg-black-500 px-3 py-2">
            <button
              type="button"
              aria-label="btnreset"
            >
              <motion.div whileHover="hover">
                <motion.div
                  variants={iconmotion}
                  transition={{ type: "spring", stiffness: 400, damping: 4 }}
                >
                  <Image
                    src="/images/gamePage/btnreset.png"
                    alt="Picture of the author"
                    width={16}
                    height={16}
                  />
                </motion.div>
              </motion.div>
            </button>
          </div>
          <div className="rounded-2xl bg-black-500 px-3 py-2">
            <button
              onClick={gotoNext}
              type="button"
              aria-label="gotoNext"
            >
              <motion.div whileHover="hover">
                <motion.div
                  variants={iconmotion}
                  transition={{ type: "spring", stiffness: 400, damping: 4 }}
                >
                  <Image
                    src="/images/gamePage/btnNext.png"
                    alt="Picture of the author"
                    width={16}
                    height={16}
                  />
                </motion.div>
              </motion.div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
