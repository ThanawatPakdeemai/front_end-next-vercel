import * as React from "react"
import MenuList from "@mui/material/MenuList"
import { Box, SelectChangeEvent } from "@mui/material"
import dynamic from "next/dynamic"
import {
  IDevice,
  IDropdownAll,
  IGameCategory,
  IGameItem,
  IGameType
} from "@feature/dropdown/interfaces/IDropdownService"
import { IMenuBase } from "@interfaces/IMenu"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { ICURRENCY } from "@interfaces/ICurrency"
import { IList } from "@interfaces/ITransaction"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import { CATEGORY_ICON } from "@constants/categoryIcon"
import { IDropdownCustomSelect } from "../DropdownCustom"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const MenuItemCustom = dynamic(
  () => import("@components/atoms/MenuItemCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: false
})
const ButtonDropdown = dynamic(
  () => import("@feature/gameItem/atoms/ButtonDropdown"),
  {
    suspense: true,
    ssr: false
  }
)

interface IProp {
  className?: string
  details:
    | IGameCategory[]
    | IGameItem[]
    | IDevice[]
    | IGameType[]
    | IMenuBase[]
    | IGameItemListData[]
    | ICURRENCY[]
    | IList[]
  setOnTitle?: (_value: IDropdownAll) => void
  setOnTitleGameType?: (_value: IGameType) => void
  setExpanded?: (_value: boolean) => void
  title?: IDropdownCustomSelect
  icon?: string | React.ReactElement
  onChange?: any
  onClick?: (_event: SelectChangeEvent) => void
}

const SelectDropdown = ({
  className,
  details,
  setOnTitle,
  setOnTitleGameType,
  setExpanded,
  title,
  icon,
  onChange
}: IProp) => {
  const { itemSelected } = useBuyGameItemController()

  const renderSelectContent = (item) => {
    if (title === "GameItem") {
      return (
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
              <span className="text-green-lemon">{`${item.qty} ${item.name}`}</span>
              {item.id === itemSelected?.id && (
                <span className="text-purple-primary">Selected</span>
              )}
            </div>
          }
          isOpen
          hideDropdownIcon
        />
      )
    }
    if (title === "All Categories") {
      return (
        <MenuItemCustom
          label={"slug" in item ? item.name : item.label}
          icon={
            CATEGORY_ICON.find((_item) => _item.id === item.slug)?.icon || (
              <Icomoon className="icon-Grid-02" />
            )
          }
          href={item.href}
          id=""
          external={false}
          active={item.active}
        />
      )
    }
    if (title === "All Game Assets") {
      return (
        <MenuItemCustom
          label={"name" in item ? item.name : item.label}
          icon={
            item.image_icon ? (
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
              </div>
            ) : (
              <Icomoon className="icon-Grid-02" />
            )
          }
          href={item.href}
          id=""
          external={false}
          active={item.active}
        />
      )
    }
    return (
      <MenuItemCustom
        label={"name" in item ? item.name : item.label}
        icon={item.icon || icon}
        href={item.href}
        id=""
        external={false}
        active={item.active}
      />
    )
  }

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
            if (setOnTitleGameType) {
              setOnTitleGameType(item)
              if (setExpanded) {
                setExpanded(false)
              }
            }
          }}
        >
          {renderSelectContent(item)}
        </Box>
      ))}
    </MenuList>
  )
}
export default SelectDropdown
