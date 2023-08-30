import * as React from "react"
import MenuList from "@mui/material/MenuList"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ButtonDropdown = dynamic(
  () => import("@feature/gameItem/components/atoms/ButtonDropdown"),
  {
    suspense: true,
    ssr: false
  }
)

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
    className={`${className} flex flex-col gap-3 rounded-[13px] bg-primary-main p-2`}
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
        <ButtonDropdown
          className="relative w-full pl-10 font-neue-machina-semi"
          leftContent={
            <div className="game-item__image">
              {item.tokenName.toLocaleUpperCase() === "NAKA" && (
                <div className="absolute left-0 top-0 flex h-10 w-10 flex-1 items-center justify-center rounded-lg p-[10px]">
                  <Icomoon className="icon-Naka text-error-main" />
                </div>
              )}
              <p className="text-sm text-white-default">{item.tokenName}</p>
            </div>
          }
          isOpen
          hideDropdownIcon
        />
      </Box>
    ))}
  </MenuList>
)

export default SelectDropdownCurrency
