import GameTags from "@feature/slider/components/atoms/GameTags"
import { IGameTag } from "@feature/slider/interfaces/IGameTags"
import { Typography } from "@mui/material"

interface ITagMultiple {
  title: string
  tags: IGameTag[]
  className?: string
}

const TagMultiple = ({ tags, title, className }: ITagMultiple) => (
  <div className={`mb-3 flex items-center gap-3 ${className}`}>
    <Typography className="font-neue-machina-semi text-xs uppercase text-neutral-600">
      {title}
    </Typography>
    <GameTags gameTags={tags} />
  </div>
)

export default TagMultiple
