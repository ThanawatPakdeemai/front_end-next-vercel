import * as React from "react"
import { useEffect, useState } from "react"
import { Collapse } from "@mui/material"
import DropdownIcon from "@components/icons/DropdownIcon"
import SelectDropdownList from "@components/atoms/selectDropdown/SelectDropdown"
import { Image } from "@components/atoms/image"

interface IProp {
  icon?: React.ReactNode
  title: string
  list: any
  className: string
}

const DropdownList = ({ title, list, className }: IProp) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>()
  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }
  useEffect(() => {
    setData(list[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {list && data && (
        <div>
          <button
            type="button"
            onClick={handleOnExpandClick}
            className={`${className} mb-1 flex h-[40px] w-[218px] flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 text-[12px] text-black-default hover:text-white-primary`}
          >
            <div className="flex ">
              {title === "List Items" ? (
                <>
                  <Image
                    src={data.image_icon}
                    alt=""
                    width="20"
                    height="20"
                  />
                  <p className="px-2">{data.name}</p>
                  <p className="px-2 text-[#ffffff]">XL {data.price} USD</p>
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
                  <p className="px-2 text-[#ffffff]">{data.name}</p>
                </>
              )}
            </div>

            <div
              className={`${
                expanded === true
                  ? "rotate-180 transition-all duration-300"
                  : "rotate-0 transition-all duration-300"
              }`}
            >
              <DropdownIcon />
            </div>
          </button>
          <Collapse
            in={expanded}
            timeout="auto"
            className="rounded-[19px]"
            sx={{
              backgroundColor: "#010101D9",
              zIndex: 99999,
              position: "absolute",
              width: "218px"
            }}
          >
            <SelectDropdownList
              className={className}
              details={list}
            />
          </Collapse>
        </div>
      )}
    </>
  )
}
export default DropdownList
