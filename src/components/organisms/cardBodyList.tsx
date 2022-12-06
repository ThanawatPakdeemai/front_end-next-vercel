/* eslint-disable jsx-a11y/alt-text */
import React, { memo } from "react"
import { Card, Typography } from "@mui/material"
import { IPlayerRanking } from "@feature/ranking/interfaces/IRanking"
import { Image } from "@components/atoms/image/index"

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
          index > 2 ? "bg-black-03" : "bg-black-01"
        } border-1 mb-3 rounded-default border-black-01`}
      >
        <div className="flex items-center justify-between p-3 ">
          <div
            className={`${index === 0 && "bg-red-card"} ${
              index === 1 && "bg-purple-primary"
            } ${index === 2 && "bg-green-card"} ${
              index > 2 && "bg-black-02"
            } text-md font-neue-machina ${
              index > 2 ? "text-white-primary" : "text-black-01"
            } flex h-[58px] w-[58px] items-center justify-center rounded-sm`}
          >
            {index + 1}
          </div>
          <div className="mr-[10px] flex items-center">
            <div>
              <Typography className="text-right font-neue-machina text-sm uppercase text-white-primary">
                {item.username}
              </Typography>
              <Typography
                className={`rounded-less border border-solid border-black-03 p-2 text-right font-neue-machina text-xs uppercase text-gray-neutral04 ${
                  index > 2 && "bg-black-01"
                }`}
              >
                {item.naka_earn.toLocaleString("en-US", {
                  maximumFractionDigits: 4
                })}{" "}
                NAKA
              </Typography>
            </div>
            <div className="h-[58px] w-[58px]">
              <Image
                src={item.avatar}
                width="200"
                height="200"
                alt={item.username}
                className="ml-3 h-[58px] w-full rounded-sm object-fill object-center"
              />
            </div>
          </div>
        </div>
      </Card>
    ))}
  </div>
)

export default memo(CardBodyList)
