import React, { memo } from "react"
import { Box } from "@mui/material"
import dayjs from "dayjs"
import { ImageCustom } from "@components/atoms/image/Image"
import { INotification } from "@mobile/types/INotification"

interface IPlayedHistoryCardMobileProps extends INotification {
  image: string
}
const PlayedHistoryCardMobile = ({
  image,
  ...props
}: IPlayedHistoryCardMobileProps) => (
  <Box
    component="div"
    id={`played-history-card-${props.id}`}
    className="played-history-card"
  >
    <div className="played-history-card__mobile__item flex w-full items-center gap-[20px]">
      <div className="played-history-card__mobile__item--image h-[80px] w-[80px] overflow-hidden rounded-[16px]">
        <ImageCustom
          src={image}
          alt={props.title}
          width={80}
          height={80}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="played-history-card__mobile__item--content text-white-primary">
        <h3 className="truncate font-urbanist text-[18px] font-bold">
          {props.title}
        </h3>
        <div className="played-history-card__mobile__item--details">
          <p className="truncate font-urbanist text-[14px]">
            Last played : {dayjs(props.createdAt).format("DD/MMM/YYYY HH:mm A")}
          </p>
        </div>
      </div>
    </div>
  </Box>
)

export default memo(PlayedHistoryCardMobile)
