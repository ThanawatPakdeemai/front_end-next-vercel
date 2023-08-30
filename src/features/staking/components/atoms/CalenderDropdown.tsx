import { Popover } from "@mui/material"
import { useState } from "react"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state"
// eslint-disable-next-line import/no-extraneous-dependencies
import dynamic from "next/dynamic"

const SelectDropdown = dynamic(
  () => import("@components/atoms/selectDropdown/SelectDropdown"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ButtonDropdown = dynamic(
  () => import("@feature/gameItem/components/atoms/ButtonDropdown")
)

interface IProp {
  defaultValue: number
  list: number[]
  className?: string
  isCheck?: boolean
  onChangeSelect?: (_item: number) => void
}

const CalenderDropdown = ({
  defaultValue,
  list,
  className,
  onChangeSelect
}: IProp) => {
  const [selectLimit, setSelectLimit] = useState<Number>(defaultValue)
  const onChangeItem = (_item: number) => {
    if (_item && onChangeSelect) {
      setSelectLimit(_item)
      onChangeSelect(_item)
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
                  className={` ${className}`}
                >
                  <ButtonDropdown
                    className={`${className} !mb-2 !rounded-[8px]`}
                    isOpen={popupState.isOpen}
                    leftContent={
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <Icomoon className="icon-Calendar-Check" />
                          <p className="px-2 uppercase">Period</p>
                        </div>
                        <p className="px-2 text-[#ffffff]">
                          {`${selectLimit}`} Days
                        </p>
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
                          <div className="flex items-center justify-center pr-7">
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
                      onChangeItem(_item as number)
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
export default CalenderDropdown
