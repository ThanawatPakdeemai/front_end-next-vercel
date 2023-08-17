import * as React from "react"
import { useState } from "react"
import { Popover, Typography } from "@mui/material"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
import { IGameCategory } from "@feature/dropdown/interfaces/IDropdownService"
import dynamic from "next/dynamic"
import { StyledFormLabel } from "@styles/themes/partial/components/muiTypography"

const SelectDropdownCategories = dynamic(
  () => import("@components/atoms/selectDropdown/SelectDropdownCategories")
)
const ButtonDropdown = dynamic(
  () => import("@feature/gameItem/atoms/ButtonDropdown")
)

interface IProp {
  list: IGameCategory[]
  label?: string
  icon?: React.ReactNode
  className?: string
  onChangeSelect?: (_item: IGameCategory) => void
  register: any
}

const DropdownListCategories = ({
  label,
  list,
  className,
  onChangeSelect,
  register
}: IProp) => {
  const [defaultItem, setDefaultItem] = useState<IGameCategory>(list[0])

  const onChangeItem = (_item: IGameCategory) => {
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
                  className={` ${className}`}
                  style={{ width: "200px" }}
                >
                  <ButtonDropdown
                    className={`${className} w-full uppercase `}
                    isOpen={popupState.isOpen}
                    leftContent={
                      <div className="flex items-center">
                        <p className="px-2 text-white-default">
                          {defaultItem.name}
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
                      borderRadius: "15px",
                      minWidth: "300px",
                      minHeight: "200px",
                      overflow: "hidden"
                    },
                    "& .MuiPopover-paper": {
                      scrollbarWidth: "none",
                      "-ms-overflow-style": "none",
                      "&::-webkit-scrollbar": {
                        display: "none"
                      }
                    }
                  }}
                >
                  <div
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto"
                    }}
                  >
                    <SelectDropdownCategories
                      className={className}
                      register={register}
                      details={list && list.map((ele: IGameCategory) => ele)}
                      onChange={(_item) => {
                        popupState.close()
                        onChangeItem(_item as IGameCategory)
                      }}
                    />
                  </div>
                </Popover>
              </>
            )}
          </PopupState>
        </>
      )}
    </div>
  )
}

export default DropdownListCategories
