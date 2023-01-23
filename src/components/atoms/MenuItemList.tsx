import { IMenu } from "@interfaces/IMenu"
import { MenuItem } from "@mui/material"
import React from "react"
import Image from "next/image"

interface RootObject {
  _id: string
  name: string
  detail: string
  price: number
  image: string
  item_id_smartcontract: number
  min_item: number
  image_icon: string
  image_icon_color: string
  item_size: string
  id: string
}
interface IProp extends IMenu {
  active?: boolean
  data?: RootObject
}

/**
 * @description In case use more type please add type in array prop
 */

const MenuItemList = ({ data, ...props }: IProp | undefined | any) => (
  <MenuItem
    key={data.id}
    aria-label={data.id}
    sx={{
      color: "#E1E2E2",
      backgroundColor: "#010101"
    }}
  >
    <div className="px-2">
      <Image
        src={data.image_icon}
        alt=""
        width="20"
        height="20"
      />
    </div>

    {props.title === "Items" ? (
      <>
        <p className="px-2">{data.name}</p>
        <div className="flex w-full items-center justify-between">
          <span className="px-2 text-[#ffffff]">XL {data.price} USD</span>
          {data.qty && <span className="px-2">{data.qty} item</span>}
        </div>
      </>
    ) : (
      <>
        <p className="px-2">CURENCY</p>
        <p className="px-2 text-[#ffffff]">{data.name}</p>
      </>
    )}
  </MenuItem>
)

export default MenuItemList
