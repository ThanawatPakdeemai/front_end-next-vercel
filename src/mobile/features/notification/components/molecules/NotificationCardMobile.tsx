import React, { memo } from "react"
import { Box, Chip } from "@mui/material"
import dayjs from "dayjs"
import { INotification } from "@mobile/types/INotification"

interface INotificationCardMobileProps extends INotification {
  status: boolean
}
const NotificationCardMobile = ({
  status,
  ...props
}: INotificationCardMobileProps) => (
  <Box
    component="div"
    id={`notificaton-card-${props.id}`}
    className="notificaton-card"
  >
    <div className="notificaton-card__mobile__item flex w-full items-center gap-[20px]">
      <div className="notificaton-card__mobile__item--content relative w-full text-white-primary">
        <h3 className="truncate font-urbanist text-[18px] font-bold">
          {props.title}
        </h3>
        <div className="notificaton-card__mobile__item--details">
          <p className="truncate font-urbanist text-[14px]">
            Last played : {dayjs(props.createdAt).format("DD/MMM/YYYY HH:mm A")}
          </p>
        </div>
        {status ? (
          <div className="notificaton-card__mobile__item--status absolute right-0 top-[10px]">
            <Chip
              label="Unread"
              color="error"
              variant="filled"
              size="small"
              className="!rounded-[6px] font-urbanist font-bold !text-white-primary"
            />
          </div>
        ) : (
          <div className="notificaton-card__mobile__item--status absolute right-0 top-[10px]">
            <Chip
              label="Read"
              color="primary"
              variant="filled"
              size="small"
              className="!rounded-[6px] !bg-[#616161] font-urbanist font-bold !text-white-primary"
            />
          </div>
        )}
      </div>
    </div>
  </Box>
)

export default memo(NotificationCardMobile)
