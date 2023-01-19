import * as React from "react"
import MenuList from "@mui/material/MenuList"
import MenuItemList from "@components/atoms/MenuItemList"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { Box } from "@mui/material"

interface IProp {
  className: string
  details: IGameItemListData[]
  title: string
  onChangeItem: (_item: IGameItemListData) => void
}

const SelectDropdownList = ({
  className,
  details,
  title,
  onChangeItem
}: IProp) => (
  <MenuList
    className={`${className} mx-[6px] mt-[6px] mb-[6px] rounded-[13px] bg-neutral-700 p-[6px]`}
  >
    {details.map((item: IGameItemListData) => (
      <Box
        className="mb-1"
        onClick={() => onChangeItem(item)}
        key={item.id}
      >
        <MenuItemList
          title={title}
          data={item}
          id={item.id}
          external={false}
        />
      </Box>
    ))}
  </MenuList>
)

export default SelectDropdownList
