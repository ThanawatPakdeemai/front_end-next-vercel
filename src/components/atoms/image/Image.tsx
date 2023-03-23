import { memo } from "react"
import Image, { ImageProps } from "next/image"

export const ImageCustom = ({
  src,
  width,
  height,
  alt,
  style,
  placeholder,
  className,
  blurDataURL,
  fill,
  onClick = () => {}
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
      onClick={onClick}
    />
  )
}

export default memo(ImageCustom)
