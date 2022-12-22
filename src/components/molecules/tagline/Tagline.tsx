import React from "react"
import { InsideTagLine } from "@components/molecules/insideTagLine"

interface IProp {
  icon: React.ReactNode
  bgColor: string
  textColor: string
  text: string
}

const Tagline = ({ icon, bgColor, textColor, text }: IProp) => (
  <div
    className={`relative ${bgColor} my-16 flex h-8 w-full items-center overflow-hidden rounded-lg`}
  >
    <div className="absolute flex w-full animate-right-to-left flex-row">
      <InsideTagLine
        icon={icon}
        textColor={textColor}
        text={text}
      />
      <InsideTagLine
        icon={icon}
        textColor={textColor}
        text={text}
      />
      <InsideTagLine
        icon={icon}
        textColor={textColor}
        text={text}
      />
      <InsideTagLine
        icon={icon}
        textColor={textColor}
        text={text}
      />
    </div>
  </div>
)

export default Tagline
