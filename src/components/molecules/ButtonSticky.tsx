import RocketIcon from "@components/icons/RocketIcon"
import React, { ReactNode } from "react"

interface IProps {
  icon?: ReactNode
  notify?: boolean
  multi?: boolean
  className?: string
  onClick?: () => void
}

const ButtonSticky = ({
  icon = <RocketIcon />,
  notify = false,
  multi = false,
  className,
  onClick
}: IProps) => {
  const hasNotify = notify ? <div className="btn-sticky-dot" /> : null
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative mx-auto flex h-[88px] w-[88px] items-center justify-center lg:mx-0 ${className}`}
    >
      {multi ? (
        <>
          <div className="btn-sticky-out flex items-center justify-center" />
          <div className="btn-sticky-in flex items-center justify-center" />
          <div className="btn-sticky-icon flex items-center justify-center">
            {icon}
          </div>
          {hasNotify}
        </>
      ) : (
        <>
          <div className="btn-sticky-icon flex items-center justify-center">
            {icon}
          </div>
          {hasNotify}
        </>
      )}
    </button>
  )
}
export default ButtonSticky
