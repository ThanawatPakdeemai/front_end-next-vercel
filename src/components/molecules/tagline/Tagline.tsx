import React from "react"
import { ImageProps } from "next/image"
import { InsideTagLine } from "@components/molecules/insideTagLine"

interface IProp extends ImageProps {
  bgColor: string
  textColor: string
  text: string
  alt: string
}

const Tagline = ({ bgColor, textColor, text, alt, ...props }: IProp) => (
  <div
    className={`relative ${bgColor} my-16 flex h-8 w-full items-center overflow-hidden rounded-lg`}
  >
    <div className="absolute flex w-full animate-right-to-left flex-row">
      <InsideTagLine
        textColor={textColor}
        text={text}
        alt={alt}
        {...props}
      />
      <InsideTagLine
        textColor={textColor}
        text={text}
        alt={alt}
        {...props}
      />
      <InsideTagLine
        textColor={textColor}
        text={text}
        alt={alt}
        {...props}
      />
      <InsideTagLine
        textColor={textColor}
        text={text}
        alt={alt}
        {...props}
      />
    </div>
  </div>
)

export default Tagline
