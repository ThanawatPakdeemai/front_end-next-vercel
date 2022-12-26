import * as React from "react"
import { useEffect, useState } from "react"
import { Collapse } from "@mui/material"
import DropdownIcon from "@components/icons/DropdownIcon"
import { DROPDOWN } from "@configs/dropdown"
import { IDropdown } from "@interfaces/IMenu"
import SelectDropdown from "./selectDropdown/SelectDropdown"

interface IProp {
  icon?: React.ReactNode
  title: string
  className: string
}

const Dropdown = ({ title, className }: IProp) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [data, setData] = useState<IDropdown>()
  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }

  const GetData = () => {
    const dataFilter = DROPDOWN.filter(
      (item: IDropdown) =>
        item.title.toLocaleLowerCase() === title.toLocaleLowerCase()
    )
    setData(dataFilter[0])
  }

  useEffect(() => {
    GetData()
  })

  return (
    <>
      {data && (
        <div>
          <button
            type="button"
            onClick={handleOnExpandClick}
            className={`${className} mb-1 flex h-[40px] w-[218px] flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 text-[12px] text-black-default hover:text-white-primary`}
          >
            {data.icon}
            <span className="">{data.title}</span>
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
            <SelectDropdown
              className={className}
              details={data.details}
            />
          </Collapse>
        </div>
      )}
    </>
  )
}
export default Dropdown
