import * as React from "react"
import MenuList from "@mui/material/MenuList"

import { Box, SelectChangeEvent } from "@mui/material"
import {
  IDevice,
  IDropdownAll,
  IGameCategory,
  IGameItem
} from "@feature/dropdown/interfaces/IDropdownService"
import { IMenuBase } from "@interfaces/IMenu"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { ICURRENCY } from "@interfaces/ICurrency"
import { IList } from "@interfaces/ITransaction"
import ButtonDropdown from "@feature/gameItem/atoms/ButtonDropdown"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import MenuItemCustom from "../MenuItemCustom"
import { ImageCustom } from "../image/Image"

interface IProp {
  className?: string
  details:
    | IGameCategory[]
    | IGameItem[]
    | IDevice[]
    | IMenuBase[]
    | IGameItemListData[]
    | ICURRENCY[]
    | IList[]
  setOnTitle?: (_value: IDropdownAll) => void
  setExpanded?: (_value: boolean) => void
  title?: string
  icon?: string | React.ReactElement
  onChange?: any
  onClick?: (_event: SelectChangeEvent) => void
}

const SelectDropdown = ({
  className,
  details,
  setOnTitle,
  setExpanded,
  title,
  icon,
  onChange
}: IProp) => {
  const { itemSelected } = useBuyGameItemController()

  return (
    <MenuList
      className={`${className} flex flex-col gap-3 rounded-[13px] bg-primary-main p-4`}
    >
      {details.map((item, index: number) => (
        <Box
          component="div"
          key={Number(index)}
          onClick={() => {
            if (onChange) {
              onChange(item)
            }
            if (setOnTitle) {
              setOnTitle(item)
              if (setExpanded) {
                setExpanded(false)
              }
            }
          }}
        >
          {title === "GameItem" ? (
            <ButtonDropdown
              className="relative w-full pl-10 font-neue-machina-semi"
              leftContent={
                <div className="game-item__image">
                  <div className="absolute left-0 top-0 flex h-10 w-10 flex-1 items-center justify-center rounded-lg p-[10px]">
                    <ImageCustom
                      src={item.image_icon}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="h-full w-full object-contain opacity-40"
                    />
                  </div>
                  <p className="text-sm text-white-default">{`${item.price} USD`}</p>
                </div>
              }
              rightContent={
                <div className="ml-auto flex gap-2 text-xs uppercase">
                  <span className="text-green-lemon">
                    {`${item.qty} ${item.name}`}
                  </span>
                  {item.id === itemSelected?.id && (
                    <span className="text-purple-primary">Selected</span>
                  )}
                </div>
              }
              isOpen
              hideDropdownIcon
            />
          ) : (
            <MenuItemCustom
              label={"name" in item ? item.name : item.label}
              icon={item.icon || icon}
              href={item.href}
              id=""
              external={false}
              active={item.active}
            />
          )}
        </Box>
      ))}
    </MenuList>
  )
}
export default SelectDropdown
