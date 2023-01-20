import * as React from "react"
import MenuList from "@mui/material/MenuList"
import MenuItemList from "@components/atoms/MenuItemList"

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
interface IProp {
  className: string
  details: RootObject[]
  title: string
}

const SelectDropdownList = ({ className, details, title }: IProp) => (
  <MenuList
    className={`${className} mx-[6px] mt-[6px] mb-[6px] rounded-[13px] bg-neutral-700 p-[6px]`}
  >
    {details.map((item: RootObject) => (
      <MenuItemList
        title={title}
        key={item.id}
        data={item}
        id=""
        external={false}
      />
    ))}
  </MenuList>
)

export default SelectDropdownList
