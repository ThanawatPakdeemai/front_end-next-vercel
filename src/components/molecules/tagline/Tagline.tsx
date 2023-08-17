import React from "react"
import dynamic from "next/dynamic"

// Use dynamic import for the component
const InsideTagLine = dynamic(
  () => import("@components/molecules/insideTagLine/InsideTagLine")
)

interface IProp {
  icon: React.ReactNode
  bgColor: string
  textColor: string
  text: string
  className?: string
  show: boolean
}

const Tagline = ({
  icon,
  bgColor,
  textColor,
  text,
  className,
  show
}: IProp) => (
  <>
    {show && (
      <div
        className={`relative ${bgColor} my-8 flex h-8 w-full items-center overflow-hidden rounded-lg lg:my-16 ${className}`}
      >
        <div className="absolute top-[7px] flex w-full animate-right-to-left flex-row items-center">
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
    )}
  </>
)

export default Tagline
