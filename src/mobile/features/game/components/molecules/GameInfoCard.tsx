import React, { memo } from "react"
import { Box } from "@mui/material"
import dayjs from "dayjs"
import { ImageCustom } from "@components/atoms/image/Image"
import { INotificationProps } from "@mobile/types/INotification"
import { IGameCategory } from "@feature/game/interfaces/IGameService"

interface IGameInfoCardProps extends INotificationProps {
  image: string
  categories?: IGameCategory[]
}
const GameInfoCard = ({ image, categories, ...props }: IGameInfoCardProps) => (
  <Box
    component="div"
    id={`played-history-card-${props.id}`}
    className="played-history-card"
  >
    <div className="played-history-card__mobile__item flex w-full items-center gap-[20px]">
      <div className="played-history-card__mobile__item--image h-[80px] w-[80px] overflow-hidden rounded-[22px]">
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
        {categories &&
          categories.length > 0 &&
          categories.map((item) => (
            <div
              key={item.id}
              className="played-history-card__mobile__categoriy--item font-urbanist text-[16px] font-semibold text-[#F2C94C]"
            >
              {item.name}
            </div>
          ))}
        {props.createdAt && (
          <div className="played-history-card__mobile__item--details">
            <p className="truncate font-urbanist text-[14px]">
              Last played :{" "}
              {dayjs(props.createdAt).format("DD/MMM/YYYY HH:mm A")}
            </p>
          </div>
        )}
        {/* <p className="text-[14px]">In-App Purchase</p> */}
      </div>
    </div>
  </Box>
)

export default memo(GameInfoCard)
