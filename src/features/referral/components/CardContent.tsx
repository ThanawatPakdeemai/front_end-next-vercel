import DollarIcon from "@components/icons/Referral/DollarIcon"
import { EventType } from "@feature/event/interface/IEventsService"
import { Box } from "@mui/material"
import React from "react"

interface IProp {
  className?: string
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
  textColor?: string
  eventType: EventType
}

const CardContent = ({ ...props }: IProp) => {
  const {
    children,
    title,
    className,
    icon = <DollarIcon />,
    textColor = "text-neutral-300"
  } = props
  return (
    <div {...props}>
      <div
        className={`h-fit ${className} rounded-3xl border border-solid border-neutral-700 bg-neutral-800 p-2`}
      >
        <div className="h-[50px] w-full rounded-2xl border border-solid border-neutral-680 bg-neutral-700">
          <div className="flex h-full items-center pl-[26px]">
            {props.eventType === "top_score_championship" && (
              <Box
                component="i"
                className="mr-4"
              >
                {icon}
              </Box>
            )}
            <div className={`uppercase ${textColor}`}>{title}</div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default CardContent
