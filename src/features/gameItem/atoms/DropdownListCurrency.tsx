/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react"
import { useState } from "react"
import { Popover } from "@mui/material"
import ImageCustom from "@components/atoms/image/Image"
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
import { useTranslation } from "next-i18next"
import SelectDropdown from "@components/atoms/selectDropdown/SelectDropdown"
import INaka from "@components/icons/Naka"
import { ICURRENCY } from "@interfaces/ICurrency"
import ButtonDropdown from "./ButtonDropdown"

interface IProp {
  icon?: React.ReactNode
  list: ICURRENCY[]
  className: string
  onChangeSelect?: (_item: ICURRENCY) => void
}

const DropdownListCurrency = ({ list, className, onChangeSelect }: IProp) => {
  const { t } = useTranslation()
  const [defaultItem, setDefaultItem] = useState<ICURRENCY>()

  const onChangeItem = (_item: ICURRENCY) => {
    setDefaultItem(_item)
    if (_item && onChangeSelect) onChangeSelect(_item)
  }
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
                        <div className="flex items-center">
                          <INaka color="#fff" />
                          {/* <Image
                            src="/images/home/logoNakaMaster.svg"
                            alt=""
                            width="30"
                            height="30"
                          /> */}
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
                    details={
                      list &&
                      list.map((ele) => ({
                        label: (
                          <div className="flex items-center justify-between">
                            <p>
                              <span> {ele.name} </span>
                            </p>
                          </div>
                        ),
                        icon:
                          typeof ele.image_icon === "string" ? (
                            <ImageCustom
                              src={ele.image_icon ?? ""}
                              alt={ele.name}
                              width="20"
                              height="20"
                            />
                          ) : (
                            ""
                          ),
                        data: ele,
                        href: ""
                      }))
                    }
                    onChange={(item) => {
                      onChangeItem(item as ICURRENCY)
                      popupState.close()
                    }}
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
