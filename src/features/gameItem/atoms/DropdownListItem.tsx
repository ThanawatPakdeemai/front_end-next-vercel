import * as React from "react"
import { useState } from "react"
import { Popover } from "@mui/material"
import DropdownIcon from "@components/icons/DropdownIcon"
import Image from "next/image"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
import { useTranslation } from "react-i18next"
import SelectDropdown from "@components/atoms/selectDropdown/SelectDropdown"
import useGameStore from "@stores/game"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import ButtonDropdown from "./ButtonDropdown"

interface IProp {
  icon?: React.ReactNode
  list: IGameItemListData[]
  className?: string
  isCheck?: boolean
  onChangeSelect?: (_item: IGameItemListData) => void
}

const DropdownListItem = ({
  list,
  className,
  onChangeSelect,
  isCheck = false
}: IProp) => {
  const { t } = useTranslation()
  const { data: gameData } = useGameStore()
  const { errorToast } = useToast()

  const [defaultItem, setDefaultItem] = useState<IGameItemListData>()

  const onChangeItem = (_item: IGameItemListData) => {
    if (isCheck) {
      if (_item.qty > 0) setDefaultItem(_item)
    } else {
      setDefaultItem(_item)
    }
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
                <div
                  {...bindTrigger(popupState)}
                  className={`m-auto block ${className}`}
                >
                  <ButtonDropdown
                    className={`${className} `}
                    isOpen={popupState.isOpen}
                    leftContent={
                      <>
                        <div className="flex items-start">
                          {defaultItem?.image_icon && (
                            <Image
                              src={
                                defaultItem?.image_icon && gameData
                                  ? gameData?.item[0].image_icon
                                  : ""
                              }
                              alt=""
                              width="20"
                              height="20"
                            />
                          )}
                          <p className="px-2">{defaultItem?.name}</p>
                        </div>

                        <p className="px-2 text-[#ffffff]">
                          {defaultItem?.price
                            ? `XL ${defaultItem?.price ?? 0} USD`
                            : t(`please-select-item`)}
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
                  <SelectDropdown
                    className={className}
                    details={
                      list &&
                      list.map((ele) => ({
                        label: (
                          <div className="flex items-center justify-between">
                            <p>
                              {ele.name} <span>[ {ele.item_size} ]</span>
                            </p>
                            <p>{`${ele.qty ?? 0} ${t("item")}`}</p>
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
                    }
                    onChange={(item: IGameItemListData) => {
                      popupState.close()
                      onChangeItem(item)
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
export default DropdownListItem
