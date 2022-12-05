import React, { ComponentPropsWithoutRef } from "react"

export interface IPropsTag extends ComponentPropsWithoutRef<"div"> {
  variant?: "primary" | "purple" | "red" | "green"
}

const Tag = ({
  children,
  className = "",
  variant = "primary",
  ...props
}: IPropsTag) => {
  const hasVariant = {
    primary: "bg-black-01 text-black-default",
    purple: "bg-purple-01",
    red: "bg-red-01",
    green: "bg-green-01"
  }

  return (
    <span
      role="status"
      aria-label=""
      className={`${hasVariant[variant]} ${className} rounded border-[1px] border-white-default/20 py-1 px-2 pt-2 font-neue-machina text-[65%] uppercase tracking-wider`}
      {...props}
    >
      {children}
    </span>
  )
}

export default Tag
