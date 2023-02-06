import { ImageCustom } from "@components/atoms/image/Image"
import { Chip, Typography } from "@mui/material"
import { ImageProps } from "next/image"
import Link from "next/link"

interface ITagSingular {
  title: string
  label: string
  link?: string
  icon?: string
  width?: ImageProps["width"]
  height?: ImageProps["height"]
  className?: string
}

const TagSingular = ({
  label,
  link,
  title,
  className,
  icon,
  width,
  height
}: ITagSingular) => (
  // mb-3
  <div className={`flex items-center gap-3 ${className}`}>
    <Typography className="font-neue-machina-semi text-xs uppercase text-neutral-600">
      {title}
    </Typography>
    {link ? (
      <Link href={link}>
        {icon && (
          <ImageCustom
            src={icon}
            alt={title}
            width={width}
            height={height}
          />
        )}
        <Chip
          label={label}
          variant="outlined"
          size="small"
          className="cursor-pointer uppercase"
        />
      </Link>
    ) : (
      <>
        {icon && (
          <ImageCustom
            src={icon}
            alt={title}
            width={width}
            height={height}
          />
        )}
        <Chip
          label={label}
          variant="outlined"
          size="small"
          className="cursor-pointer uppercase"
        />
      </>
    )}
  </div>
)

export default TagSingular
