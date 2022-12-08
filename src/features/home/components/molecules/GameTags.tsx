import { IGameTag } from "@feature/home/interfaces/IHomeService"
import { Chip, Link } from "@mui/material"
import React from "react"

export interface ICardGameTag {
  gameTags: IGameTag[]
}

const CardGameTag = ({ gameTags }: ICardGameTag) => (
  <div className="flex flex-wrap gap-2">
    {gameTags.map((gameTag, index) =>
      gameTag.name !== "" ? (
        <Link
          href={gameTag.link ? gameTag.link : ""}
          key={`${`tag--${index}`}`}
        >
          <Chip
            key={`${`tag--${index}`}`}
            id={`${`tag--${index}`}`}
            label={gameTag.name}
            variant="outlined"
            size="small"
            className="uppercase"
          />
        </Link>
      ) : null
    )}
  </div>
)

export default CardGameTag
