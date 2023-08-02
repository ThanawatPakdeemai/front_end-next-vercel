import ButtonLike from "@components/atoms/button/ButtonLike"
import { Image } from "@components/atoms/image/index"
import React, { useState } from "react"
import { MobileView } from "react-device-detect"
import GaugeCustom from "@components/atoms/GaugeCustom"
import IconLiker from "@components/icons/LikeIcon"
import { isMobile } from "@hooks/useGlobal"
import GaugeStats from "./GaugeStats"

interface IProp {
  value: number
  hadVote?: boolean | undefined
  maxValue?: number
  imgSrc?: string
  imgAlt?: string
  hideImage?: boolean
  handleClick?: (_value: boolean) => void
}

/**
 *
 * @description default maxValue is 100
 */

const LikeNoLobby = ({
  value,
  hadVote = undefined,
  maxValue,
  imgSrc,
  imgAlt,
  hideImage = false,
  handleClick
}: IProp) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const onHandleClick = async (_value: boolean) => {
    setIsLoading(true)
    if (handleClick) await handleClick(_value)
    setIsLoading(false)
  }

  return isMobile ? (
    <MobileView>
      <div className="flex flex-col gap-2 ">
        <div className="grid grid-cols-3 items-center justify-center gap-2">
          <div className="h-[30px] w-[60px] ">
            <GaugeCustom
              value={value}
              maxValue={maxValue}
            />
          </div>
          <div className="col-span-2 flex flex-col items-center text-center text-[8px]">
            <span className="w-[60%] rounded-[8px] border-[1px]  border-neutral-700 bg-black-100  text-[10px] text-neutral-300">
              {parseFloat(value.toString()).toFixed(2)} %
            </span>
            <span className="h-10 w-full text-white-default">
              Did you like this game ?
            </span>
            <div className="flex w-full flex-row justify-center gap-2">
              <button
                type="button"
                className={`flex h-5 min-w-[30px] items-center justify-center rounded-[8px] border-[1px] border-neutral-700 bg-neutral-700   p-[6px] font-neue-machina capitalize  text-neutral-500 hover:opacity-50  ${
                  hadVote
                    ? "border-varidian-default text-varidian-default"
                    : "text-neutral-500"
                }`}
                onClick={() => onHandleClick(true)}
                disabled={isLoading}
              >
                <IconLiker.Like
                  width={12}
                  height={12}
                  className={`mr-2 ${
                    hadVote ? "fill-varidian-default" : "fill-neutral-500"
                  }`}
                />
                <p>yes</p>
              </button>

              <button
                type="button"
                className={`flex h-5 min-w-[30px] items-center justify-center rounded-[8px] border-[1px] border-neutral-700 bg-neutral-700 hover:opacity-50 ${
                  hadVote === false
                    ? "border-error-main text-error-main"
                    : "text-neutral-500"
                } p-[6px] font-neue-machina  capitalize`}
                onClick={() => onHandleClick(false)}
                disabled={isLoading}
              >
                <IconLiker.UnLike
                  width={12}
                  height={12}
                  className={`mr-2 ${
                    hadVote === false ? "fill-error-main" : "fill-neutral-500"
                  }`}
                />
                <p>no</p>
              </button>
            </div>
          </div>
        </div>
        {!hideImage && (
          <div className="p-4">
            <Image
              src={imgSrc || "/images/gameDetails/nakamoto-wars.webp"}
              alt={imgAlt || "nakamoto-wars"}
              width={186}
              height={186}
              className="object-contain"
            />
          </div>
        )}
      </div>
    </MobileView>
  ) : (
    <div className="like-no_wrapper flex flex-[1_1_220px] gap-2 lg:block lg:flex-none lg:gap-0">
      <div className="like-no_score m-0 flex w-full flex-auto flex-col justify-center gap-4 rounded-lg border-[1px] border-neutral-700 border-opacity-80 p-4 md:w-[218px] lg:mb-3 lg:flex-none">
        <GaugeStats
          value={value}
          maxValue={maxValue}
        />
        <span className="w-full text-center text-sm text-white-default">
          Did you like this game ?
        </span>
        <div className="flex w-full flex-row justify-center gap-2">
          <ButtonLike
            type="like"
            active={!!hadVote}
            className="border-[1px] border-neutral-700 border-opacity-80 bg-neutral-700 p-4"
            onClick={() => onHandleClick(true)}
            disabled={isLoading}
          />
          <ButtonLike
            type="unlike"
            active={!!(hadVote === false)}
            className="border-[1px] border-neutral-700 border-opacity-60 bg-neutral-700 p-4"
            onClick={() => onHandleClick(false)}
            disabled={isLoading}
          />
        </div>
      </div>
      {!hideImage && (
        <div className="like-no_image flex h-[218px] w-full justify-center rounded-lg border-[1px] border-neutral-700 border-opacity-80 p-4 md:w-[218px] md:justify-start">
          <div className="overflow-hidden rounded-xl">
            <Image
              src={imgSrc || "/images/gameDetails/nakamoto-wars.webp"}
              alt={imgAlt || "nakamoto-wars"}
              width={186}
              height={186}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default LikeNoLobby
