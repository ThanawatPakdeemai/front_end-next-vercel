import { Chip, Typography } from "@mui/material"
import Link from "next/link"
import ImageCustom from "@components/atoms/image/Image"
import { ImageProps } from "next/image"

interface ITagSingular extends ImageProps {
  title: string
  label: string
  link?: string
  icon?: string
  className?: string
}

const TagSingular = ({
  label,
  link,
  title,
  className,
  icon,
  ...props
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
            width={props.width}
            height={props.height}
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
            width={props.width}
            height={props.height}
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
