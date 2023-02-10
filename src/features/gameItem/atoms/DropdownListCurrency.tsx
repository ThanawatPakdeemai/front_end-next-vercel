import * as React from "react"
import { useState } from "react"
import { Popover } from "@mui/material"
import ImageCustom from "@components/atoms/image/Image"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
import { useTranslation } from "next-i18next"
import SelectDropdown from "@components/atoms/selectDropdown/SelectDropdown"
import { ICURENCY } from "@interfaces/ICurrency"
import ButtonDropdown from "./ButtonDropdown"

interface IProp {
  icon?: React.ReactNode
  list: ICURENCY[]
  className: string
}

const DropdownListCurrency = ({ list, className }: IProp) => {
  const { t } = useTranslation()
  const [defaultItem, setDefaultItem] = useState<ICURENCY>()

  return (
    <>
      {list && (
        <div>
          <PopupState
            variant="popover"
            popupId="demo-popup-popover"
          >
            {(popupState) => (
              <div>
                <div {...bindTrigger(popupState)}>
                  <ButtonDropdown
                    className={className}
                    isOpen={popupState.isOpen}
                    leftContent={
                      <>
                        <div className="flex">
                          <ImageCustom
                            src="/images/logo/Logo-Master1.png"
                            alt=""
                            width="30"
                            height="30"
                          />
                          <p className="px-2">{t("currency")}</p>
                          <p className="px-2 text-white-default">
                            {defaultItem?.name}
                          </p>
                        </div>
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
                  <SelectDropdown
                    className={className}
                    details={list}
                    setOnTitle={setDefaultItem}
                    icon={
                      <ImageCustom
                        src={list && list[0].image_icon}
                        alt={list && list[0].name}
                        width="20"
                        height="20"
                      />
                    }
                  />
                </Popover>
              </div>
            )}
          </PopupState>
        </div>
      )}
    </>
  )
}
export default DropdownListCurrency
