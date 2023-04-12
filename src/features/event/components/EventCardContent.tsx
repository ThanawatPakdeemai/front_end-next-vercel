import DollarIcon from "@components/icons/Referral/DollarIcon"
import { v4 as uuid } from "uuid"
import React from "react"
import PlayersIcon from "@components/icons/PlayersIcon"
import JoinStickIcon from "@components/icons/JoinStickIcon"

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
        <div className="w-full rounded-2xl border border-solid border-neutral-700 bg-neutral-800 p-2">
          <div className="flex h-full w-full items-center">
            <span className="pl-4">{icon}</span>
            {/* <div className={`ml-4 uppercase ${textColor}`}>{title}</div> */}
            {labels ? (
              <div className="flex w-1/2 items-center px-2 text-sm uppercase">
                <div
                  key={uuid()}
                  className="mr-2 flex w-full items-center rounded-lg border-[1px] border-neutral-700 bg-neutral-780 font-neue-machina-semi text-neutral-500 md:px-4 md:py-2"
                >
                  <PlayersIcon />
                  <span className="mx-2">total players:</span>
                  <span className="text-neutral-200">
                    {`${labels.player_count}`}
                  </span>
                </div>
                <div
                  key={uuid()}
                  className="mr-2 flex w-full items-center rounded-lg border-[1px] border-neutral-700 bg-neutral-780 font-neue-machina-semi text-neutral-500 md:px-4 md:py-2"
                >
                  <JoinStickIcon />
                  <span>total games played:</span>
                  <span className="ml-2 text-neutral-200">{`${labels.transaction_count}`}</span>
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
