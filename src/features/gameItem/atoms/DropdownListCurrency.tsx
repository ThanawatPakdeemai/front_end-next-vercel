/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/destructuring-assignment */
import * as React from "react"
import { useState } from "react"
import { Popover } from "@mui/material"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
import SelectDropdownCurrency from "@components/atoms/selectDropdown/SelectDropdownCurrency"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import useGlobal from "@hooks/useGlobal"
import INaka from "@components/icons/Naka"
import IBusd from "@components/icons/Busd"
import ButtonDropdown from "./ButtonDropdown"

interface IProp {
  icon?: React.ReactNode
  list: ITokenContract[]
  className?: string
  onChangeSelect?: (_item: ITokenContract) => void
  // defaultValue: ITokenContract
}

interface ITokenName {
  tokenName: string
}

const DropdownListItem = ({
  list,
  className,
  onChangeSelect
}: // defaultValue
IProp) => {
  const { getDefaultCoin } = useGlobal()
  const [defaultItem, setDefaultItem] = useState<ITokenContract>(
    getDefaultCoin()[0]
  )

  const onChangeItem = (_item: ITokenContract) => {
    setDefaultItem(_item)
    if (_item && onChangeSelect) onChangeSelect(_item)
  }

  React.useEffect(() => {
    if (list && list.length > 0) {
      setDefaultItem(list[0])
    }
  }, [list, setDefaultItem])

  const IconToken = (props: ITokenName) => {
    switch (props.tokenName) {
      case "NK":
        return <INaka color="#fff" />
      case "BNB":
        return <IBusd color="#fff" />
      default:
        return <INaka color="#fff" />
    }
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
                          <IconToken tokenName={defaultItem.tokenName} />
                        </div>

                        <div className="flex items-start">
                          <p className="px-2">{defaultItem.symbol}</p>
                        </div>
                        <p className="px-2 text-white-default">
                          {defaultItem.tokenName}
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
