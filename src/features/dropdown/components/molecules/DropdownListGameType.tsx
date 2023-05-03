import * as React from "react"
import { useState } from "react"
import { Popover, Typography } from "@mui/material"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
import ButtonDropdown from "@feature/gameItem/atoms/ButtonDropdown"
import { IDropdownGameType } from "@configs/gameType"
import SelectDropdownGameType from "@components/atoms/selectDropdown/SelectDropdownGameType"

interface IProp {
  list: IDropdownGameType[]
  label?: string
  icon?: React.ReactNode
  className?: string
  onChangeSelect?: (_item: IDropdownGameType) => void
}

export const StyledFormLabel = {
  "&.MuiFormLabel-root, &.MuiTypography-root": {
    color: "#70727B",
    fontFamily: "neueMachina",
    textTransform: "uppercase",
    position: "relative",
    display: "block",
    fontSize: "12px",
    marginTop: "5px",
    fontWeight: "bold"
  }
}

const DropdownListGameType = ({
  label,
  list,
  className,
  onChangeSelect
}: // defaultValue
IProp) => {
  const [defaultItem, setDefaultItem] = useState<IDropdownGameType>(list[0])

  const onChangeItem = (_item: IDropdownGameType) => {
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
        // <FormLabel
        //   sx={StyledFormLabel}
        //   id={`${label}-label`}
        // >
        //   {label}
        // </FormLabel>
        <Typography
          component="label"
          id={`${label}-label`}
          sx={StyledFormLabel}
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
                      <div className="flex items-center">
                        <p>{defaultItem.icon}</p>
                        <p className="px-2 text-white-default">
                          {defaultItem.title}
                        </p>
                      </div>
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
                  <SelectDropdownGameType
                    className={className}
                    details={list && list.map((ele: IDropdownGameType) => ele)}
                    onChange={(_item) => {
                      popupState.close()
                      onChangeItem(_item as IDropdownGameType)
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
export default DropdownListGameType
