import React from "react"
import { Image } from "@components/atoms/image"
import TableIcon from "@components/icons/TableIcon"

interface IDetails {
  link: string
  img?: string
  type: string
  text?: string
  icon?: React.ReactNode
  table?: boolean
}

interface IProp {
  data: IDetails[]
}
const Banner = ({ data }: IProp) => (
  <div className="mb-12 flex h-[180px] flex-row rounded-[24px] border-[1px] border-neutral-800 bg-primary-main">
    {data.map((item: IDetails) => {
      if (item.type === "banner") {
        return (
          <div
            key={item.type}
            className="absolute"
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
              {item.table && <TableIcon className="absolute" />}
              {item.icon}
            </div>
          </div>
        )
      }
      return null
    })}
  </div>
)
export default Banner
