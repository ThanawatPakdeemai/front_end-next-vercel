import ButtonIcon from "@components/atoms/button/ButtonIcon"
import { Typography } from "@mui/material"
import Helper from "@utils/helper"
import React from "react"

interface IProp {
  icon: React.ReactNode
  className?: string
  textColor: string
  title: string
  amount: number | string
  unit: string
}

/**
 *
 * @param className for background of icon should be tailwind class
 * @example "bg-primary-main"
 * @param textColor should be tailwind class
 * @example "text-primary-main"
 */

// FIXME Boy: เดี๋ยวกลับมาทำ ขอเอาขึ้นก่อน

const StatWithIconCopy = ({
  icon,
  textColor,
  className,
  title,
  amount,
  unit
}: IProp) => {
  const iconmotion = {
    hover: {
      rotate: 30,
      ease: "easeIn",
      transition: {
        mass: 1,
        duration: 0.4,
        stiffness: 600,
        type: "spring"
      }
    }
  }

  return (
    <div className="flex items-center">
      <ButtonIcon
        variants={iconmotion}
        icon={icon}
        className={`rounded ${className}`}
      />
      <div className={`ml-5 uppercase ${textColor}`}>
        <Typography className="text-xs font-bold">{title}</Typography>
        <Typography className="text-default font-bold">
          {Helper.formatNumber(amount as number)}
        </Typography>
        <Typography className="text-xs font-bold">{unit}</Typography>
      </div>
    </div>
  )
}

export default StatWithIconCopy
