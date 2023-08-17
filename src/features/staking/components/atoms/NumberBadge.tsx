import { Skeleton } from "@mui/material"
import React from "react"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

export interface INumberBadge {
  title: string
  color?: "purple" | "red"
  value: number
  className?: string
}

const NumberBadge = ({
  title,
  color = "purple",
  value,
  className
}: INumberBadge) => (
  <div
    className={`flex h-full w-full items-center justify-between rounded-[10px] bg-neutral-900 p-5 uppercase ${className}`}
  >
    <p className="max-w-[35%] text-neutral-600">{title}</p>
    <div className="flex w-[calc(100%-35%)] items-center justify-end">
      {value !== -1 ? (
        <p
          className={`font-digital-7 text-2xl ${
            color === "purple" ? "text-secondary-main" : "text-red-card"
          }`}
        >
          {value}
        </p>
      ) : (
        <Skeleton className="h-[32px] w-full rounded-sm sm:h-[50px]" />
      )}

      <Icomoon
        className={`icon-Naka ml-4 ${
          color === "purple" ? "#7B5BE6" : "#F42728"
        }`}
      />
    </div>
  </div>
)

export default NumberBadge
