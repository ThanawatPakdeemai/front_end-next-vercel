import { IconButton } from "@mui/material"
import React, { ReactNode } from "react"

interface IProps {
  icon: ReactNode
  dotSize?: "small" | "medium"
  dotClassName?: string
  multiCircle?: boolean
  notify?: boolean
  className?: string
  onClick?: () => void
}

const ButtonCircle = ({
  icon,
  dotSize = "small",
  dotClassName,
  multiCircle = false,
  notify = false,
  className,
  onClick
}: IProps) => {
  const onHandleClick = async () => {
    if (onClick) {
      await onClick()
    }
  }
  if (multiCircle) {
    return (
      <IconButton
        className={`${className} sticky-btn-container`}
        disableRipple
        onClick={onHandleClick}
      >
        <div className="sticky-btn-secondary">
          <div className="sticky-btn relative">
            {notify ? (
              <div
                className={`${dotClassName} absolute bg-error-main ${
                  dotSize === "small"
                    ? "top-[8%] right-[8%] h-[6px] w-[6px]"
                    : "top-[4%] right-[4%] h-[10px] w-[10px]"
                } rounded-sm `}
              />
            ) : null}
            {icon}
          </div>
        </div>
      </IconButton>
    )
  }
  return (
    <IconButton
      className={`${className} sticky-btn`}
      disableRipple
      onClick={onHandleClick}
    >
      {notify ? (
        <div
          className={`${dotClassName} absolute bg-error-main ${
            dotSize === "small"
              ? "top-[8%] right-[8%] h-[6px] w-[6px]"
              : "top-[4%] right-[4%] h-[10px] w-[10px]"
          } rounded-sm `}
        />
      ) : null}
      {icon}
    </IconButton>
  )
}

export default ButtonCircle
