import ButtonIcon from "@components/atoms/button/ButtonIcon"
import { Typography } from "@mui/material"
import Helper from "@utils/helper"
import React from "react"

interface IProp {
  icon: React.ReactNode
  className?: string
  color: "primary" | "secondary" | "error" | "warning" | "info" | "success"
  title: string
  amount: number | string
  unit: string
}

const StatWithIcon = ({
  icon,
  color,
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
    <div
      className={`flex items-center rounded-lg border-[1px] border-neutral-700 border-opacity-80 p-2 ${className}`}
    >
      <ButtonIcon
        variants={iconmotion}
        icon={icon}
        className={`rounded-lg bg-${color}-main`}
      />
      <div className={`ml-5 mr-14 uppercase text-${color}-main`}>
        <Typography className="mb-6 text-xs font-bold">{title}</Typography>
        <Typography className="text-default font-bold">
          {Helper.formatNumber(amount as number)}
        </Typography>
        <Typography className="text-xs font-bold">{unit}</Typography>
      </div>
    </div>
  )
}

export default StatWithIcon
