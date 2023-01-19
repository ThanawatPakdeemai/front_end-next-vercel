import * as React from "react"
import { useEffect, useState } from "react"
import { Collapse, Popover } from "@mui/material"
import DropdownIcon from "@components/icons/DropdownIcon"
import { IDropdown } from "@interfaces/IMenu"
import Image from "next/image"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import SelectDropdownList from "./selectDropdownList/SelectDropdownList"

interface IProp {
  icon?: React.ReactNode
  title: string
  list: any
  className: string
  onChangeSelect?: (_item: IGameItemListData) => void
}

const DropdownList = ({ title, list, className, onChangeSelect }: IProp) => {
  const { errorToast } = useToast()
  const [defaultItem, setDefaultItem] = useState<IGameItemListData>()

  const onChangeItem = (_item: IGameItemListData) => {
    setDefaultItem(_item)
    if (onChangeSelect) onChangeSelect(_item)
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
                <button
                  type="button"
                  {...bindTrigger(popupState)}
                  className={`${className} mb-1 flex h-[40px] w-[218px] flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 text-[12px] text-black-default hover:text-white-primary`}
                >
                  <div className="flex ">
                    {title === "List Items" ? (
                      <>
                        {defaultItem?.image_icon && (
                          <Image
                            src={defaultItem?.image_icon ?? ""}
                            alt=""
                            width="20"
                            height="20"
                          />
                        )}

                        <p className="px-2">{defaultItem?.name}</p>
                        <p className="px-2 text-[#ffffff]">
                          {defaultItem?.price
                            ? `XL ${defaultItem?.price} USD`
                            : "Please select"}
                        </p>
                      </>
                    ) : (
                      <>
                        <Image
                          src="/images/logo/Logo-Master1.png"
                          alt=""
                          width="30"
                          height="30"
                        />
                        <p className="px-2">CURENCY</p>
                        <p className="px-2 text-[#ffffff]">
                          {defaultItem?.name}
                        </p>
                      </>
                    )}
                  </div>

                  <div
                    className={`${
                      popupState.isOpen
                        ? "rotate-180 transition-all duration-300"
                        : "rotate-0 transition-all duration-300"
                    }`}
                  >
                    <DropdownIcon />
                  </div>
                </button>
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
                >
                  <div className=" bg-primary-main py-1">
                    <SelectDropdownList
                      className={className}
                      details={list}
                      title={title}
                      onChangeItem={(item: IGameItemListData) => {
                        onChangeItem(item)
                        if (item.qty > 0) {
                          popupState.close()
                        } else {
                          errorToast(MESSAGES["you-don't-have-item"])
                        }
                      }}
                    />
                  </div>
                </Popover>
              </div>
            )}
          </PopupState>
        </div>
      )}
    </>
  )
}
export default DropdownList
