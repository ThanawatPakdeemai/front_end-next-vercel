/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-key */
import React, { memo, useEffect, useState } from "react"
import { Box, Table, TableContainer } from "@mui/material"
import { useTranslation } from "next-i18next"
import { INotification } from "@feature/notification/interfaces/INotificationService"
import ListNotification from "@components/icons/ListNotification"
import VerifiediconNotification from "@components/icons/VerifiediconNotification"
import dayjs from "dayjs"
import { ImageCustom } from "@components/atoms/image/Image"

interface INotificationCardMobileProps {
  id: string
  title: string
  createdAt: Date
  image?: string
}
const NotificationCardMobile = ({
  id,
  image,
  title,
  createdAt
}: INotificationCardMobileProps) => (
  <Box
    component="div"
    className="notification-card"
  >
    <div className="notification-card__mobile__item flex w-full items-center gap-[20px]">
      {image && (
        <div className="notification-card__mobile__item--image h-[80px] w-[80px] overflow-hidden rounded-[16px]">
          <ImageCustom
            src={image}
            alt={title}
            width={80}
            height={80}
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}

      <div className="notification-card__mobile__item--content text-white-primary">
        <h3 className="truncate font-urbanist text-[18px] font-bold">
          {title}
        </h3>
        <div className="notification-card__mobile__item--details">
          <p className="truncate font-urbanist text-[14px]">
            Last played : {dayjs(createdAt).format("DD/MMM/YYYY HH:mm A")}
          </p>
        </div>
      </div>
      {/* <div className="notification-card__mobile__item--button ml-auto">
          <ButtonFilledTemplate
            onClick={() => handleClaimReward(id)}
            color="#F32429"
          >
            Claim
          </ButtonFilledTemplate>
        </div> */}
    </div>
  </Box>
)

export default memo(NotificationCardMobile)
