import { IGameCategory } from "@feature/dropdown/interfaces/IDropdownService"
import { Box, ListItemText, MenuItem, MenuList } from "@mui/material"
import React from "react"
import { UseFormRegister } from "react-hook-form"

export interface IProfileSubmitShort {
  developer_name: string
  developer_email: string
  publisher: string
}
export interface IFormJoinUsData {
  name: string
  player_type: string
  categories: Array<string>
  description: string
  short_detail: IProfileSubmitShort
  game_play_url: string
  how_to_play: string
  gameStatus: boolean
}

interface IProp {
  className?: string
  details: IGameCategory[]
  setOnTitle?: (_value: IGameCategory) => void
  setExpanded?: (_value: boolean) => void
  title?: string
  register: UseFormRegister<IFormJoinUsData>
  onChange: (_value: IGameCategory) => void
}

const SelectDropdownCategories = ({
  className,
  details,
  register,
  setOnTitle,
  setExpanded,
  onChange
}: IProp) => (
  <MenuList
    className={`${className} mx-[6px] mb-[6px] mt-[6px] rounded-[13px] bg-neutral-700 px-[6px] py-[3px]`}
    {...register("categories", { required: true })}
  >
    {details.map((item, index: number) => (
      <Box
        component="div"
        key={Number(index)}
        className="my-1 uppercase"
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
        <MenuItem
          key={item.name}
          aria-label={item.name}
        >
          <ListItemText className="ml-2">{item.name}</ListItemText>
        </MenuItem>
      </Box>
    ))}
  </MenuList>
)

export default SelectDropdownCategories
