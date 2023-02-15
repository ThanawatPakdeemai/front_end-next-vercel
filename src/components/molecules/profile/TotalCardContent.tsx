import { Typography } from "@mui/material"
import { Image } from "@components/atoms/image"
import React from "react"

interface IProp {
  rank?: boolean
  text: string
  totalNumber: string | number
  icon?: string
}

const TotalCardContent = ({
  rank,
  text = "Silver",
  totalNumber = 367,
  icon = "bronze"
}: IProp) => (
  <>
    <div className="h-[110px] w-[190px] rounded-lg border border-solid border-neutral-700 p-[20px]">
      {rank ? (
        <div className="grid grid-cols-2">
          <div>
            <Typography className="font-digital-7 text-[26px] text-secondary-main">
              {totalNumber}
            </Typography>
            <Typography className="mt-[10px] text-xs uppercase">
              {text}
            </Typography>
          </div>
          <div className="grid content-center	justify-center	">
            <Image
              src={`/images/gamePage/rank/${icon}.svg`}
              alt=""
              width={50}
              height={50}
            />
          </div>
        </div>
      ) : (
        <>
          <Typography className="font-digital-7 text-[26px] text-error-main ">
            {totalNumber}
          </Typography>
          <Typography className="mt-[10px] text-xs uppercase">
            {text}
          </Typography>
        </>
      )}
    </div>
  </>
)

export default TotalCardContent
