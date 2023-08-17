import * as React from "react"
import { useState } from "react"
import { Popover, Typography } from "@mui/material"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
import ButtonDropdown from "@feature/gameItem/atoms/ButtonDropdown"
import { IChainList } from "@configs/chain"
import dynamic from "next/dynamic"

const SelectDropdownChainList = dynamic(
  () => import("@components/atoms/selectDropdown/SelectDropdownChainList"),
  {
    suspense: true,
    ssr: false
  }
)

interface IProp {
  list: IChainList[]
  label?: string
  icon?: React.ReactNode
  className?: string
  onChangeSelect?: (_item: IChainList) => void
}

const StyledTextField = {
  "&.MuiTypography-root": {
    color: "#70727B",
    fontFamily: "neueMachina",
    textTransform: "uppercase",
    position: "relative",
    display: "block",
    fontSize: "12px"
  }
}

const DropdownListChainList = ({
  label,
  list,
  className,
  onChangeSelect
}: // defaultValue
IProp) => {
  const [defaultItem, setDefaultItem] = useState<IChainList>(list[0])

  const onChangeItem = (_item: IChainList) => {
    setDefaultItem(_item)
    if (_item && onChangeSelect) onChangeSelect(_item)
  }

  React.useEffect(() => {
    let load = false

    if (!load) {
      if (list && list.length > 0) {
        setDefaultItem(list[0])
      }
    }

    return () => {
      load = true
    }
  }, [list, setDefaultItem])

  return (
    <div className="MuiFormControl-root">
      {label && (
        <Typography
          component="label"
          id={`${label}-label`}
          sx={StyledTextField}
        >
          {label}
        </Typography>
      )}
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
                          <p className="px-2">{defaultItem.icon}</p>
                        </div>

                        <p className="px-2 text-white-default">
                          {defaultItem.title}
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
                  <SelectDropdownChainList
                    className={className}
                    details={list && list.map((ele: IChainList) => ele)}
                    onChange={(_item) => {
                      popupState.close()
                      onChangeItem(_item as IChainList)
                    }}
                  />
                </Popover>
              </>
            )}
          </PopupState>
        </>
      )}
    </div>
  )
}
export default DropdownListChainList
