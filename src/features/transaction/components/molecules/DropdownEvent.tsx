import React, { useState } from "react"
import { Popover } from "@mui/material"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"

const SelectDropdown = dynamic(
  () => import("@components/atoms/selectDropdown/SelectDropdown")
)
const ButtonDropdown = dynamic(
  () => import("@feature/gameItem/atoms/ButtonDropdown")
)

interface IProp {
  defaultValue: string
  list: string[]
  className?: string
  isCheck?: boolean
  onChangeEvent?: (_item: string) => void
}
const DropdownEvent = ({
  defaultValue,
  list,
  className,
  onChangeEvent
}: IProp) => {
  const { t } = useTranslation()

  const [event, setEvent] = useState<string>(defaultValue)
  const onChangeItem = (_item) => {
    if (_item && onChangeEvent) {
      setEvent(_item)
      onChangeEvent(_item)
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
                          <p className="px-2 uppercase">{t("event")}</p>
                        </div>
                        <p className="px-2 text-[#ffffff]">{`${t(event)}`}</p>
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
                      maxHeight: "270px"
                    }
                  }}
                >
                  <SelectDropdown
                    className={`${className} w-[250px]`}
                    details={
                      list &&
                      list.map((m) => ({
                        label: (
                          <div className="flex items-center justify-center">
                            <p>{`${t(m)}`}</p>
                          </div>
                        ),
                        data: m,
                        icon: "",
                        href: "",
                        active: m === event
                      }))
                    }
                    onChange={(_item) => {
                      popupState.close()
                      onChangeItem(_item.data)
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
export default DropdownEvent
