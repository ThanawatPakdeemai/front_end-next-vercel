import * as React from "react"
import MenuList from "@mui/material/MenuList"
import { Box, ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"

interface IProp {
  className?: string
  details: ITokenContract[]
  setOnTitle?: (_value: ITokenContract) => void
  setExpanded?: (_value: boolean) => void
  title?: string
  icon?: string | React.ReactElement
  onChange?: any
}

const SelectDropdownCurrency = ({
  className,
  details,
  setOnTitle,
  setExpanded,
  onChange
}: IProp) => (
  <MenuList
    className={`${className} mx-[6px] mt-[6px] mb-[6px] rounded-[13px] bg-neutral-700 px-[6px] py-[3px]`}
  >
    {details.map((item, index: number) => (
      <Box
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
          key={item.address}
          aria-label={item.address}
          sx={
            {
              // color: active ? "#E1E2E2" : null,
              // backgroundColor: active ? "#010101" : null
            }
          }
        >
          <ListItemIcon className="text-center">{item.symbol}</ListItemIcon>
          <ListItemText className="ml-2">{item.tokenName}</ListItemText>
        </MenuItem>
      </Box>
    ))}
  </MenuList>
)

export default SelectDropdownCurrency
