import { IGameTag } from "@feature/slider/interfaces/IGameTags"
import { Chip, Link } from "@mui/material"
import React from "react"

export interface ICardGameTag {
  gameTags: IGameTag[]
}

const GameTags = ({ gameTags }: ICardGameTag) => (
  <div className="flex flex-wrap gap-2">
    {gameTags.map((gameTag, index) =>
      gameTag.name !== "" ? (
        <Link
          href={gameTag.link ? gameTag.link : ""}
          key={`${`tag--${index}`}`}
          className="relative z-[1] flex items-center justify-center"
        >
          <Chip
            key={`${`tag--${index}`}`}
            id={`${`tag--${index}`}`}
            label={gameTag.name}
            variant="outlined"
            size="small"
            className="cursor-pointer uppercase"
          />
        </Link>
      ) : null
    )}
  </div>
)

export default GameTags
