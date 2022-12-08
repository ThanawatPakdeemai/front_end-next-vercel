import { IGameTagSlide } from "@constants/gameTags"
import { Chip } from "@mui/material"
import React from "react"

interface ICardGameTag {
  gameTags: IGameTagSlide[]
}

const CardGameTag = ({ gameTags }: ICardGameTag) => (
  <div className="flex flex-wrap gap-2">
    {gameTags.map((item) => (
      <Chip
        key={item.id}
        label={item.text}
        variant="outlined"
        size="small"
        className="uppercase"
      />
    ))}
  </div>
)

export default CardGameTag
