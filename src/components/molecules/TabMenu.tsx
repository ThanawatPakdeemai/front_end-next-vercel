import React, { ReactNode } from "react"
import { Typography } from "@mui/material"
import Link from "next/link"
import { useTranslation } from "react-i18next"

interface IProps {
  icon: ReactNode
  text: string
  className?: string
  link?: string
  selected?: boolean
  handleClick?: () => void
}

const TabMenu = ({
  icon,
  text,
  className,
  link,
  selected = false,
  handleClick
}: IProps) => {
  const { t } = useTranslation()
  const renderButton = () => (
    <button
      type="button"
      onClick={handleClick}
      className={`flex h-[50px] w-full cursor-pointer items-center rounded-lg bg-neutral-800 pl-5 ${className} ${
        selected ? "border-[1px] border-purple-primary" : ""
      }`}
    >
      <div className="relative flex flex-1 flex-row items-center">
        {icon}
        <Typography className="pl-[15px] uppercase text-neutral-300">
          {text}
        </Typography>
        {selected && (
          <Typography className="absolute right-2 text-xs uppercase text-purple-primary">
            {t("selected")}
          </Typography>
        )}
      </div>
    </button>
  )
  return link ? (
    <Link href={link}>{renderButton()}</Link>
  ) : (
    <>{renderButton()}</>
  )
}

export default TabMenu
