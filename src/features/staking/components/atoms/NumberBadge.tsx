import IconNakaGlitch from "@components/icons/NakaGlitchIcon"
import React from "react"

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
    <p className="max-w-[35%]">{title}</p>
    <div className="flex items-center">
      <p
        className={`font-digital-7 text-[26px] ${
          color === "purple" ? "text-secondary-main" : "text-red-card"
        }`}
      >
        {value}
      </p>
      <IconNakaGlitch
        className="ml-4"
        stroke={color === "purple" ? "#7B5BE6" : "#F42728"}
      />
    </div>
  </div>
)

export default NumberBadge
