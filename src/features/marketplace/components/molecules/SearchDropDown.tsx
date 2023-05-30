import MenuItemCustom from "@components/atoms/MenuItemCustom"
import DropdownIcon from "@components/icons/DropdownIcon"
import { ISelectDropDown } from "@interfaces/IMenu"
import { Collapse } from "@mui/material"
import React, { useState } from "react"

interface IProps {
  title: string
  onClick?: (_value: string | number | null) => void
  dropDown: ISelectDropDown[]
}

const SearchDropDown = ({ title, dropDown, onClick }: IProps) => {
  const [expandedPrice, setExpandedPrice] = useState<boolean>(false)

  const handleOnExpandPrice = () => {
    setExpandedPrice(!expandedPrice)
  }

  return (
    <div className="relative flex w-full">
      <button
        type="button"
        onClick={handleOnExpandPrice}
        className="relative mx-auto mb-1 flex h-[40px] w-full flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 text-[12px] text-black-default hover:text-white-primary"
      >
        <span className="capitalize">{title}</span>
        <div
          className={`${
            expandedPrice
              ? "rotate-180 transition-all duration-300"
              : "rotate-0 transition-all duration-300"
          }`}
        >
          <DropdownIcon />
        </div>
      </button>
      <Collapse
        in={expandedPrice}
        className="absolute top-0 mt-10 w-[200px] rounded-[19px] p-2"
        sx={{
          backgroundColor: "#232329",
          zIndex: 99999,
          position: "absolute",
          width: "218px"
        }}
      >
        {dropDown.map((item) => (
          <MenuItemCustom
            key={item.label}
            label={item.label}
            icon=""
            href=""
            id=""
            external={false}
            active
            onClick={() => {
              if (onClick) onClick(item.value)
              setExpandedPrice(!expandedPrice)
            }}
          />
        ))}
      </Collapse>
    </div>
  )
}

export default SearchDropDown
