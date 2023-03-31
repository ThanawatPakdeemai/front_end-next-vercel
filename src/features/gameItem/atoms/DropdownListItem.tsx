import * as React from "react"
import { useState } from "react"
import { Popover } from "@mui/material"
import { Image } from "@components/atoms/image"

import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
import { useTranslation } from "next-i18next"
import SelectDropdown from "@components/atoms/selectDropdown/SelectDropdown"
import useGameStore from "@stores/game"
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
  const { data: gameData, itemSelected } = useGameStore()
  // const { errorToast } = useToast()

  const [defaultItem, setDefaultItem] = useState<IGameItemListData | null>(
    itemSelected ?? list[0] ?? null
  )

  const onChangeItem = (_item: IGameItemListData) => {
    if (isCheck) {
      if (_item.qty > 0) setDefaultItem(_item)
    } else {
      setDefaultItem(_item)
    }
    if (_item && onChangeSelect) onChangeSelect(_item)
  }

  React.useEffect(() => {
    let load = false

    if (!load) {
      if (itemSelected) {
        setDefaultItem(itemSelected)
      }
    }

    return () => {
      load = true
    }
  }, [itemSelected, setDefaultItem])

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
                      <>
                        <div className="flex items-start">
                          {defaultItem?.image_icon && (
                            <Image
                              src={
                                defaultItem?.image_icon && gameData
                                  ? gameData?.item?.[0]?.image_icon
                                  : ""
                              }
                              alt=""
                              width="20"
                              height="20"
                            />
                          )}
                          <p className="px-2 pt-1">{defaultItem?.name}</p>
                        </div>

                        <p className="px-2 text-white-default">
                          {defaultItem?.price
                            ? `${defaultItem?.price ?? 0} USD`
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
                    details={list}
                    setOnTitle={setDefaultItem}
                    title="GameItem"
                    icon={
                      <Image
                        src={list && list?.[0]?.image_icon}
                        alt={list && list?.[0]?.name}
                        width="20"
                        height="20"
                      />
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
export default DropdownListItem
