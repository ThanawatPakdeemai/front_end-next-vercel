import ButtonIcon from "@components/atoms/button/ButtonIcon"
import { Image } from "@components/atoms/image"
import LogoIcon from "@components/icons/LogoIcon"
import CopyMiniIcon from "@components/icons/Referral/CoopyMiniIcon"
import { Chip, Typography } from "@mui/material"
import dayjs from "dayjs"
import React from "react"

interface IProp {
  textHead: string
  name?: string
  link?: string
  date?: string
  image?: string
  alt?: string
}

const CardWriterDetails = ({
  name,
  link,
  date,
  image,
  textHead,
  alt
}: IProp) => (
  <div>
    <Typography className="text-sm uppercase text-black-default">
      {textHead}
    </Typography>
    <div className="my-2 flex">
      <div
        className={`image grid h-[45px] w-[45px] content-center justify-center rounded bg-error-main ${
          image ? " bg-neutral-800" : "bg-error-main"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={alt as string}
            width={450}
            height={450}
          />
        ) : (
          <LogoIcon />
        )}
      </div>
      <div className="ml-2 grid content-between">
        <Typography className="text-xs uppercase text-white-primary">
          {name}
        </Typography>
        {link && (
          <div className="flex">
            <Chip
              label={link}
              variant="outlined"
              size="small"
              className="max-w-[129px] cursor-pointer uppercase"
            />
            <ButtonIcon
              onClick={() => {}}
              className="ml-2 flex !h-[25px] !w-[25px] items-center justify-center rounded-[4px] border border-neutral-700 bg-neutral-900"
              icon={<CopyMiniIcon />}
            />
          </div>
        )}
      </div>
    </div>
    <Typography className="text-sm uppercase text-neutral-600">
      {dayjs(date).format("DD MMM YYYY")}
    </Typography>
  </div>
)

export default CardWriterDetails
