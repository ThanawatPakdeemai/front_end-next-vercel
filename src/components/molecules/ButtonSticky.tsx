import YourMissionIcon from "@components/icons/MenunIcon/YourMissionIcon"
import React, { ReactNode } from "react"

interface IProps {
  icon?: ReactNode
  multi?: boolean
  className?: string
}

const ButtonSticky = ({
  icon = <YourMissionIcon />,
  multi = false,
  className
}: IProps) => (
  <button
    type="button"
    className={`${className} relative z-[5] flex h-[88px] w-[88px] items-center justify-center`}
  >
    {multi ? (
      <>
        <div className="btn-sticky-out flex items-center justify-center" />
        <div className="btn-sticky-in flex items-center justify-center" />
        <div className="btn-sticky-icon flex items-center justify-center">
          {icon}
        </div>
        <div className="btn-sticky-dot" />
      </>
    ) : (
      <>
        <div className="btn-sticky-icon flex items-center justify-center">
          {icon}
        </div>
        <div className="btn-sticky-dot" />
      </>
    )}
  </button>
)
export default ButtonSticky
