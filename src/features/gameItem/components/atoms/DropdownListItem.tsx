/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react"
import { useState } from "react"
import { Popover } from "@mui/material"
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
import { useTranslation } from "next-i18next"
import dynamic from "next/dynamic"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import useGameStore from "@stores/game"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"

const ButtonDropdown = dynamic(() => import("./ButtonDropdown"), {
  suspense: true,
  ssr: false
})
const SelectDropdown = dynamic(
  () => import("@components/atoms/selectDropdown/SelectDropdown"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonIcon = dynamic(
  () => import("@components/atoms/button/ButtonIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProp {
  icon?: React.ReactNode
  list: IGameItemListData[]
  className?: string
  isCheck?: boolean
  onChangeSelect?: (_item: IGameItemListData) => void
  hideIcon?: boolean
  hideDropdownIcon?: boolean
  hideStartIcon?: boolean
}

const DropdownListItem = ({
  list,
  className,
  onChangeSelect,
  isCheck = false,
  hideIcon = false,
  hideDropdownIcon = false,
  hideStartIcon = false
}: IProp) => {
  const { t } = useTranslation()
  const { itemSelected, onSetGameItemSelectd } = useGameStore()
  const { qtyItemSelected } = useBuyGameItemController()
  // const { errorToast } = useToast()

  const [defaultItem, setDefaultItem] = useState<IGameItemListData | null>(
    itemSelected ?? list[0] ?? null
  )

  const onChangeItem = (_item: IGameItemListData) => {
    if (isCheck) {
      if (_item.qty > 0) {
        setDefaultItem(_item)
        onSetGameItemSelectd(_item)
      }
    } else {
      setDefaultItem(_item)
      onSetGameItemSelectd(_item)
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
              <div className="relative">
                <div
                  {...bindTrigger(popupState)}
                  className={`flex items-center gap-3 ${className}`} // m-auto block
                >
                  <ButtonDropdown
                    className={`${className} w-[calc(100%-52px)] ${
                      !hideStartIcon ? "pl-10" : ""
                    }`}
                    isOpen={popupState.isOpen}
                    leftContent={
                      <>
                        {!hideStartIcon && (
                          <div className="absolute left-0 flex h-10 w-10 flex-1 items-center justify-center rounded-lg p-[10px]">
                            <ImageCustom
                              src={defaultItem?.image_icon || ""}
                              alt={defaultItem?.name || ""}
                              width={60}
                              height={60}
                              className="h-full w-full object-contain opacity-40"
                            />
                          </div>
                        )}
                        <div className="flex items-start">
                          <p className="font-neue-machina-semi text-xs uppercase">
                            Size
                          </p>
                        </div>
                        <p className="px-2 text-sm text-white-default">
                          {defaultItem?.price
                            ? `${defaultItem?.price ?? 0} USD`
                            : t(`Please select Item.`)}
                        </p>
                      </>
                    }
                    rightContent={
                      !hideIcon ? (
                        <span className="item-balance ml-auto font-neue-machina-semi text-xs uppercase text-green-lemon">
                          {/* {`${itemSelected?.qty} ${itemSelected?.name}`} */}
                          {`${qtyItemSelected} ${itemSelected?.name}`}
                        </span>
                      ) : (
                        <></>
                      )
                    }
                    hideDropdownIcon={hideDropdownIcon}
                  />
                  {!hideIcon && (
                    <ButtonIcon
                      whileHover="hover"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 4
                      }}
                      icon={
                        <Icomoon className="icon-Diagonal-Arrows-01 text-white-primary" />
                      }
                      className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-red-card"
                    />
                  )}
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
                      width: "290px"
                    }
                  }}
                >
                  <SelectDropdown
                    className={className}
                    details={list}
                    setOnTitle={setDefaultItem}
                    title="GameItem"
                    icon={
                      <div className="opacity-40">
                        <ImageCustom
                          src={list && list?.[0]?.image_icon}
                          alt={list && list?.[0]?.name}
                          width="20"
                          height="20"
                        />
                      </div>
                    }
                    onChange={(_item) => {
                      popupState.close()
                      onChangeItem(_item)
                    }}
                  />
                </Popover>
              </div>
            )}
          </PopupState>
        </>
      )}
    </>
  )
}
export default DropdownListItem
