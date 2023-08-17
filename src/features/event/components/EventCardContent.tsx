/* eslint-disable no-unused-vars */
import { v4 as uuid } from "uuid"
import React from "react"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

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
    icon = <Icomoon className="icon-Dollar-Coin" />,
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
              <div className="flex flex-wrap items-center gap-2 px-2 text-sm uppercase lg:w-1/2">
                <div
                  key={uuid()}
                  className="mr-2 flex w-full flex-1 items-center rounded-lg border-[1px] border-neutral-700 bg-neutral-780 px-2 py-2 font-neue-machina-semi text-neutral-500 md:px-4"
                >
                  <Icomoon className="icon-Users-Group" />
                  <span className="mx-2 whitespace-nowrap">total players:</span>
                  <span className="text-neutral-200">
                    {labels.player_count && `${labels.player_count}`}
                  </span>
                </div>
                <div
                  key={uuid()}
                  className="mr-2 flex w-full flex-1 items-center rounded-lg border-[1px] border-neutral-700 bg-neutral-780 px-2 py-2 font-neue-machina-semi text-neutral-500 md:px-4"
                >
                  <Icomoon className="icon-Joystick text-[#70727B]" />
                  <span className="whitespace-nowrap">total games played:</span>
                  <span className="ml-2 text-neutral-200">
                    {labels.transaction_count && `${labels.transaction_count}`}
                  </span>
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
