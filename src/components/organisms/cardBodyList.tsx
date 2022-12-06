/* eslint-disable jsx-a11y/alt-text */
import React, { memo } from "react"
import { Card, Typography } from "@mui/material"
import { IPlayerRanking } from "@feature/ranking/interfaces/IRanking"
import Image from "@components/atoms/image"

interface Iprop {
  width: string
  players: IPlayerRanking[]
}
const CardBodyList = ({ width, players }: Iprop) => (
  <div className="custom-scroll h-[412px] overflow-y-scroll pr-4">
    {players.map((item, index: number) => (
      <Card
        key={item._id}
        sx={{ maxWidth: width ?? "auto" }}
        className={` ${
          index > 2 ? "bg-black-neutral07" : "bg-black-neutral08"
        } rounded-default border-1 border-black-neutral08 mb-3`}
      >
        <div className="flex items-center justify-between p-3 ">
          <div
            className={`${index === 0 && "bg-red-card"} ${
              index === 1 && "bg-purple-primary"
            } ${index === 2 && "bg-green-card"} ${
              index > 2 && "bg-black-neutral7.5"
            } font-neue-machina text-md ${
              index > 2 ? "text-white-primary" : "text-black-neutral08"
            } w-[58px] h-[58px] rounded-sm flex items-center justify-center`}
          >
            {index + 1}
          </div>
          <div className="flex items-center mr-[10px]">
            <div>
              <Typography className="text-white-primary font-neue-machina text-sm text-right uppercase">
                {item.username}
              </Typography>
              <Typography className="text-gray-neutral04 font-neue-machina text-xs border-gray-110 border border-solid p-2 text-right uppercase rounded-less">
                {item.naka_earn.toLocaleString("en-US", {
                  maximumFractionDigits: 4
                })}{" "}
                NAKA
              </Typography>
            </div>
            <div className="w-[58px] h-[58px]">
              <Image
                src={item.avatar}
                width="200"
                height="200"
                alt={item.username}
                className="rounded-sm ml-3 object-fill object-center w-full h-[58px]"
              />
            </div>
          </div>
        </div>
      </Card>
    ))}
  </div>
)

export default memo(CardBodyList)
