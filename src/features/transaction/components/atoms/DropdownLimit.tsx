import React, { useState } from "react"
import { Popover } from "@mui/material"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
import SelectDropdown from "@components/atoms/selectDropdown/SelectDropdown"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import ButtonDropdown from "@feature/gameItem/atoms/ButtonDropdown"
import { IMenuBase } from "@interfaces/IMenu"

interface IProp {
  defaultValue: number
  list: number[]
  className?: string
  isCheck?: boolean
  onChangeSelect?: (_item: number) => void
}

const DropdownLimit = ({
  defaultValue,
  list,
  className,
  onChangeSelect
}: IProp) => {
  const [selectLimit, setSelectLimit] = useState<Number>(defaultValue)
  const onChangeItem = (_item) => {
    if (_item && onChangeSelect) {
      setSelectLimit(Number((_item as IMenuBase).data))
      onChangeSelect(Number((_item as IMenuBase).data))
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
                    className={`${className} `}
                    isOpen={popupState.isOpen}
                    leftContent={
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <VisibilityOutlinedIcon />
                          <p className="px-2 uppercase">Show</p>
                        </div>
                        <p className="px-2 text-[#ffffff]">{`${selectLimit}`}</p>
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
                      borderRadius: "15px"
                    }
                  }}
                >
                  <SelectDropdown
                    className={`${className} w-[155px]`}
                    details={
                      list &&
                      list.map((ele: Number) => ({
                        label: (
                          <div className="flex items-center justify-end pr-7">
                            <p>{`${ele}`}</p>
                          </div>
                        ),
                        icon: "",
                        data: ele as Number,
                        href: "",
                        active: selectLimit === ele
                      }))
                    }
                    onChange={(_item) => {
                      popupState.close()
                      onChangeItem(_item)
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
export default DropdownLimit
