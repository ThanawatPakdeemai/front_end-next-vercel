import * as React from "react"
import { useState } from "react"
import { Popover } from "@mui/material"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"

import { DEFAULT_CURRENCY_BNB } from "@configs/currency"
import SelectDropdownCurrency from "@components/atoms/selectDropdown/SelectDropdownCurrency"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import ButtonDropdown from "./ButtonDropdown"

interface IProp {
  icon?: React.ReactNode
  list: ITokenContract[]
  className?: string
  onChangeSelect?: (_item: ITokenContract) => void
}

const DropdownListItem = ({ list, className, onChangeSelect }: IProp) => {
  const [defaultItem, setDefaultItem] = useState<ITokenContract>(
    DEFAULT_CURRENCY_BNB[0]
  )

  const onChangeItem = (_item: ITokenContract) => {
    setDefaultItem(_item)
    if (_item && onChangeSelect) onChangeSelect(_item)
  }
  return (
    <>
      {list && (
        <>
          <PopupState
            variant="popover"
            popupId="demo-popup-popover"
          >
            {(popupState) => (
              <>
                <div
                  {...bindTrigger(popupState)}
                  className={` ${className}`} // m-auto block
                >
                  <ButtonDropdown
                    className={`${className} uppercase`}
                    isOpen={popupState.isOpen}
                    leftContent={
                      <>
                        <div className="flex items-start">
                          <p className="px-2">{defaultItem.symbol}</p>
                        </div>

                        <p className="px-2 text-white-default">
                          {defaultItem?.tokenName}
                        </p>
                      </>
                    }
                  />
                </div>

                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      background: "#010101",
                      borderRadius: "15px "
                    }
                  }}
                >
                  <SelectDropdownCurrency
                    className={className}
                    details={list && list.map((ele: ITokenContract) => ele)}
                    onChange={(_item) => {
                      popupState.close()
                      onChangeItem(_item as ITokenContract)
                    }}
                  />
                </Popover>
              </>
            )}
          </PopupState>
        </>
      )}
    </>
  )
}
export default DropdownListItem
