import ButtonIcon from "@components/atoms/button/ButtonIcon"
import { isMobile } from "@hooks/useGlobal"
import { Typography } from "@mui/material"
import Helper from "@utils/helper"
import React from "react"
import { MobileView } from "react-device-detect"

interface IProp {
  icon: React.ReactNode
  className?: string
  textColor: string
  title: string
  amount: number | string
  unit: string
  classNameDiv?: string
}

/**
 *
 * @param className for background of icon should be tailwind class
 * @param classNameDiv for div of icon
 * @example "bg-primary-main"
 * @param textColor should be tailwind class
 * @example "text-primary-main"
 */

const StatWithIcon = ({
  icon,
  textColor,
  className,
  title,
  amount,
  unit,
  classNameDiv
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
    <>
      {isMobile ? (
        <MobileView>
          <div
            className={`flex flex-wrap items-center justify-start gap-4 rounded-lg border-[1px] border-neutral-700 border-opacity-80 ${classNameDiv}`}
          >
            <ButtonIcon
              variants={iconmotion}
              icon={icon}
              className={`rounded-lg ${className}`}
            />
            <div className={` uppercase ${textColor}`}>
              <Typography className=" text-xs font-bold">{title}</Typography>
              <Typography className="text-default font-bold">
                {Helper.formatNumber(amount as number)}
              </Typography>
              <Typography className="text-xs font-bold">{unit}</Typography>
            </div>
          </div>
        </MobileView>
      ) : (
        <div className="flex items-center rounded-lg border-[1px] border-neutral-700 border-opacity-80 p-2">
          <ButtonIcon
            variants={iconmotion}
            icon={icon}
            className={`rounded-lg ${className}`}
          />
          <div className={`ml-5 mr-14 uppercase ${textColor}`}>
            <Typography className="mb-6 text-xs font-bold">{title}</Typography>
            <Typography className="text-default font-bold">
              {Helper.formatNumber(amount as number)}
            </Typography>
            <Typography className="text-xs font-bold">{unit}</Typography>
          </div>
        </div>
      )}
    </>
  )
}

export default StatWithIcon
