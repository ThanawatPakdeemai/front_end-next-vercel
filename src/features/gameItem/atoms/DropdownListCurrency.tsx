import * as React from "react"
import { useState } from "react"
import { Popover } from "@mui/material"
import DropdownIcon from "@components/icons/DropdownIcon"
import Image from "next/image"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { useTranslation } from "react-i18next"
import SelectDropdown from "@components/atoms/selectDropdown/SelectDropdown"
import { ICURENCY } from "@interfaces/ICurrency"
import ButtonDropdown from "./ButtonDropdown"

interface IProp {
  icon?: React.ReactNode
  list: ICURENCY[]
  className: string
  onChangeSelect?: (_item: ICURENCY) => void
}

const DropdownListCurrency = ({ list, className, onChangeSelect }: IProp) => {
  const { t } = useTranslation()
  const [defaultItem, setDefaultItem] = useState<ICURENCY>()

  const onChangeItem = (_item: ICURENCY) => {
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
                        <div className="flex">
                          <Image
                            src="/images/logo/Logo-Master1.png"
                            alt=""
                            width="30"
                            height="30"
                          />
                          <p className="px-2">{t("currency")}</p>
                          <p className="px-2 text-[#ffffff]">
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
                      list
                        ? list.map((ele) => ({
                            label: (
                              <div className="flex items-center justify-between">
                                <p>{ele.name}</p>
                              </div>
                            ),
                            icon: (
                              <Image
                                src={ele.image_icon ?? ""}
                                alt={ele.name}
                                width="20"
                                height="20"
                              />
                            ),
                            data: ele,
                            href: ""
                          }))
                        : { icon: "", href: "", label: "" }
                    }
                    onChange={(item: IGameItemListData) => {
                      onChangeItem(item)
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
