import { memo } from "react"
import Image, { ImageProps } from "next/image"

const ImageCustom = ({
  src,
  width,
  height,
  alt,
  style,
  placeholder,
  className,
  blurDataURL,
  fill
}: ImageProps) => {
  const imgSrc = src || ""

  return (
    <Image
      src={imgSrc}
      width={width || 0}
      height={height || 0}
      style={style}
      blurDataURL={blurDataURL}
      className={className}
      placeholder={placeholder}
      fill={fill}
      alt={alt || ""}
    />
  )
}

export default memo(ImageCustom)
