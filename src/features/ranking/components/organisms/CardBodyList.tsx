/* eslint-disable jsx-a11y/alt-text */
import React, { memo } from "react"
import { Card } from "@mui/material"
import { IPlayerRanking } from "@feature/ranking/interfaces/IRanking"
import NumberRank from "../atoms/NumberRank"
import PlayerList from "../molecules/PlayerList"

interface Iprop {
  width: string
  players: IPlayerRanking[]
}
const CardBodyList = ({ width, players }: Iprop) => (
  <div className="custom-scroll h-[375px] overflow-y-scroll pr-4">
    {players.map((item, index: number) => (
      <Card
        key={item._id}
        sx={{ maxWidth: width ?? "auto" }}
        className={` ${
          index > 2 ? "bg-neutral-700" : "bg-neutral-900"
        } border-1 top-player mb-3 rounded-default border-neutral-900 `}
      >
        <div className=" flex items-center justify-between p-2">
          <NumberRank index={index} />
          <PlayerList
            item={item}
            index={index}
            className="mr-[10px] "
          />
        </div>
      </Card>
    ))}
  </div>
)

export default memo(CardBodyList)
