import * as React from "react"
import { useState } from "react"
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
  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <>
      {DROPDOWN.map(
        (item: IDropdown) =>
          item.title === title && (
            <div key={item.title}>
              <button
                type="button"
                onClick={handleOnExpandClick}
                className={`${className} mb-1 flex h-[40px] w-[218px] flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 text-[12px] text-black-default hover:text-white-primary`}
              >
                {item.icon}
                <span className="">{item.title}</span>
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
                  title={title}
                  className={className}
                />
              </Collapse>
            </div>
          )
      )}
    </>
  )
}
export default Dropdown
