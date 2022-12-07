/* eslint-disable jsx-a11y/alt-text */
import React, { memo } from "react"
import { Card } from "@mui/material"
import { IPlayerRanking } from "@feature/ranking/interfaces/IRanking"
import PlayerList from "../molecules/playerList"
import NumberRank from "../atoms/numberRank"

interface Iprop {
  width: string
  players: IPlayerRanking[]
}
const CardBodyList = ({ width, players }: Iprop) => (
  <div className="custom-scroll h-[365px] overflow-y-scroll pr-4">
    {players.map((item, index: number) => (
      <Card
        key={item._id}
        sx={{ maxWidth: width ?? "auto" }}
        className={` ${
          index > 2 ? "bg-black-03" : "bg-black-01"
        } border-1 top-player mb-3 rounded-default border-black-01 `}
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
