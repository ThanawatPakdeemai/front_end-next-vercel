import DollarIcon from "@components/icons/Referral/DollarIcon"
import { v4 as uuid } from "uuid"
import React from "react"

interface IProp {
  className?: string
  title: string
  labels?: {
    player_count: number
    transaction_count: number
  }
  children: React.ReactNode
  icon?: React.ReactNode
  textColor?: string
}

const CardContent = ({ ...props }: IProp) => {
  const {
    children,
    title,
    className,
    icon = <DollarIcon />,
    textColor = "text-neutral-300",
    labels
  } = props
  return (
    <div {...props}>
      <div
        className={`h-fit ${className} rounded-3xl border border-solid border-neutral-700 bg-neutral-800 p-2`}
      >
        <div className="h-[50px] w-full rounded-2xl border border-solid border-neutral-680 bg-neutral-700">
          <div className="flex h-full items-center pl-[26px]">
            {icon}
            <div className={`ml-4 uppercase ${textColor}`}>{title}</div>
            {labels ? (
              <div className="flex h-3 flex-row text-sm uppercase">
                <div
                  key={uuid()}
                  className="mr-2 w-full rounded-[8px] border-[1px] border-neutral-700 bg-neutral-780 text-neutral-500 md:py-2 md:px-4"
                >
                  {`total paticipants: ${labels.player_count}`}
                </div>
                <div
                  key={uuid()}
                  className="mr-2 w-full rounded-[8px] border-[1px] border-neutral-700 bg-neutral-780 text-neutral-500 md:py-2 md:px-4"
                >
                  {`total games played: ${labels.transaction_count}`}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default CardContent
