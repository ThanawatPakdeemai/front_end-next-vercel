import { Chip, Typography } from "@mui/material"
import Link from "next/link"

interface ITagSingular {
  title: string
  label: string
  link?: string
  className?: string
}

const TagSingular = ({ label, link, title, className }: ITagSingular) => (
  <div className={`mb-3 flex items-center gap-3 ${className}`}>
    <Typography className="font-neue-machina-semi text-xs uppercase text-neutral-600">
      {title}
    </Typography>
    {link ? (
      <Link href={link}>
        <Chip
          label={label}
          variant="outlined"
          size="small"
          className="cursor-pointer uppercase"
        />
      </Link>
    ) : (
      <Chip
        label={label}
        variant="outlined"
        size="small"
        className="cursor-pointer uppercase"
      />
    )}
  </div>
)

export default TagSingular
