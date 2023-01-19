import React, { memo } from "react"

interface IProp {
  image_icon: string
  item_size: string // default "1$"
  name: string
  price: number
}

const ItemSize = ({ image_icon, item_size, name, price }: IProp) => (
  <div className="txet-[#70727B] flex min-w-[140px] items-center">
    <img
      className="m-2 w-6"
      src={image_icon}
      alt={name}
    />
    <p className="mr-4">{`${price} Dollars`}</p>
  </div>
)

export default memo(ItemSize)
