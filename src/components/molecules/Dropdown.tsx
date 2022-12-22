import * as React from "react"
import { useState } from "react"
import { Collapse } from "@mui/material"
import DropdownIcon from "@components/icons/DropdownIcon"
import SelectDropdown from "@components/atoms/dropdown/SelectDropdown"
import { DROPDOWN } from "@configs/dropdown"
import { IDropdown } from "@interfaces/IMenu"

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
                className={`${className} m-[6px] flex h-[40px] w-[280px] min-w-[200px] flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 hover:text-white-primary`}
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
                  position: "absolute",
                  backgroundColor: "#010101D9",
                  zIndex: 99999
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
