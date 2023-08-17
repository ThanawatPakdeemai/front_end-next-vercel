import React, { memo } from "react"
import dynamic from "next/dynamic"

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface IProp {
  image_icon: string
  item_size: string // default "1$"
  name: string
  price: number
}

const ItemSize = ({ image_icon, name, price }: IProp) => (
  <div className="txet-neutral-500 flex min-w-[140px] items-center">
    <Image
      className="m-2 w-6"
      src={image_icon}
      alt={name}
    />
    <p className="mr-4">{`${price} Dollars`}</p>
  </div>
)

export default memo(ItemSize)
