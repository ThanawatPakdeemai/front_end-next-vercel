import React, { ComponentPropsWithoutRef } from "react"

export interface IPropsTag extends ComponentPropsWithoutRef<"div"> {
  variant?: "primary" | "purple" | "red" | "green"
  text: string
  size?: "small" | "medium" | "large"
}

const Tag = ({
  text,
  className = "",
  variant = "primary",
  size = "small",
  ...props
}: IPropsTag) => {
  const hasVariant = {
    primary: "bg-grey-A200 text-black-default",
    purple: "bg-purple-01",
    red: "bg-red-01",
    green: "bg-green-01"
  }
  const tagSize = {
    small: "py-1 px-2 pt-2 text-[65%] rounded",
    medium: "py-2 px-3 text-[100%] rounded",
    large: "px-[20px] py-[9px] text-[12px] rounded-[8px]"
  }

  return (
    <span
      role="status"
      aria-label=""
      className={`${hasVariant[variant]} ${tagSize[size]} ${className} border-[1px] border-white-default/20 font-neue-machina uppercase tracking-wider`}
      {...props}
    >
      {text}
    </span>
  )
}

export default Tag
