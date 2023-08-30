/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { Popover } from "@mui/material"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
import dynamic from "next/dynamic"

const SelectDropdown = dynamic(
  () => import("@components/atoms/selectDropdown/SelectDropdown"),
  {
    suspense: true,
    ssr: true
  }
)
const ButtonDropdown = dynamic(
  () => import("@feature/gameItem/components/atoms/ButtonDropdown"),
  {
    suspense: true,
    ssr: true
  }
)

interface IProp {
  defaultValue: string
  list: string[]
  className?: string
  isCheck?: boolean
  onChangeSelect?: (_item: number) => void
}

const DropdownTournament = ({
  defaultValue,
  list,
  className,
  onChangeSelect
}: IProp) => {
  // const { t } = useTranslation()

  const [selectLimit, setSelectLimit] = useState<string>(defaultValue)
  const onChangeItem = (_item) => {
    if (_item && onChangeSelect) {
      // setSelectLimit(Number((_item as any).data))
      onChangeSelect(Number((_item as any).data))
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
                        <p className="px-2 text-white-default ">{`${selectLimit}`}</p>
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
                      list.map((ele: string) => ({
                        label: (
                          <div className="flex items-center justify-center">
                            <p>{`${ele}`}</p>
                          </div>
                        ),
                        icon: "",
                        data: ele as string,
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
export default DropdownTournament
