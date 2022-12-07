import React from "react"
import Image, { ImageProps } from "next/image"

interface IProp extends ImageProps {
  textColor: string
  text: string
  alt: string
}

const InsideTagLine = ({ textColor, text, alt, ...props }: IProp) => (
  <div className="mr-6 flex w-full items-center">
    <div className="pr-6">
      <Image
        {...props}
        className="mr-6"
        alt={alt}
      />
    </div>
    <p className={`${textColor} whitespace-nowrap uppercase`}>{text}</p>
  </div>
)

export default InsideTagLine
