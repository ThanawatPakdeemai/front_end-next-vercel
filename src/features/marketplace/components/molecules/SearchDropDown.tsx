import React, { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { ISelectDropDown } from "@interfaces/IMenu"

const Collapse = dynamic(() => import("@mui/material/Collapse"), {
  suspense: true,
  ssr: false
})
const MenuItemCustom = dynamic(
  () => import("@components/atoms/MenuItemCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProps {
  title: string
  onClick?: (_value: string | number | null) => void
  dropDown: ISelectDropDown[]
}

const SearchDropDown = ({ title, dropDown, onClick }: IProps) => {
  const [expandedPrice, setExpandedPrice] = useState<boolean>(false)
  const searchRef = useRef<HTMLDivElement | null>(null)

  const handleOnExpandPrice = () => {
    setExpandedPrice(!expandedPrice)
  }

  useEffect(() => {
    const handler = (e) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (!searchRef?.current?.contains(e.target)) {
        setExpandedPrice(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
    }
  }, [])

  return (
    <div
      className="relative flex w-full"
      ref={searchRef}
    >
      <button
        type="button"
        aria-label="expand price"
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
          <Icomoon className="icon-Arrow-Down" />
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
