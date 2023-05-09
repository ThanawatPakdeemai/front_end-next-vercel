import { memo } from "react"
import Image, { ImageProps } from "next/image"

interface ImageCustomProps extends ImageProps {
  srcWebp?: string
}

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
  onClick = () => {},
  srcWebp
}: ImageCustomProps) => {
  const imgSrc = src || ""
  const imgSrcWebp = srcWebp || ""

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={imgSrcWebp as string}
      />
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
    </picture>
  )
}

export default memo(ImageCustom)
