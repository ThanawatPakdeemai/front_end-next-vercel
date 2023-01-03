import React from "react"
import { Image } from "@components/atoms/image"
import { GAME_BANNER } from "@constants/gameBanner"
import EarthIcon from "@components/icons/EarthIcon"
import TableIcon from "@components/icons/TableIcon"

interface IProp {
  link: string
  img?: string
  type: string
  text?: string
  icon?: React.ReactNode
}

const Banner = () => (
  <div className="mb-12 flex h-[180px] flex-row rounded-[24px] border-[1px] border-neutral-800 bg-primary-main">
    {GAME_BANNER.map((item: IProp) => {
      if (item.type === "banner") {
        return (
          <div
            key={item.type}
            className="absolute h-full w-full"
          >
            {item.img && (
              <Image
                src={item.img}
                alt={item.img}
                width={1368}
                height={180}
                className="h-[180px] rounded-[24px]"
              />
            )}
          </div>
        )
      }
      if (item.type === "text") {
        return (
          <div
            key={item.type}
            className="z-10 flex w-[100%] items-center justify-center"
          >
            <span className="leadint-[62px] font-neue-machina text-[56px] font-bold text-red-card">
              {item.text}
            </span>
          </div>
        )
      }
      if (item.type === "blinkIcon") {
        return (
          <div
            key={item.type}
            className="z-10 flex w-[100%] items-center justify-center"
          >
            <div className="flex w-full items-center justify-center">
              <TableIcon className="absolute" />
              <EarthIcon className="naka-banner-icon absolute z-10" />
            </div>
          </div>
        )
      }
      return null
    })}
  </div>
)
export default Banner
