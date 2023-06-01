import React, { memo } from "react"
import { Box } from "@mui/material"
import { v4 as uuid } from "uuid"
import SkeletonNotificationList from "@mobile/components/atoms/skeleton/SkeletonNotificationList"
import NoData from "@components/molecules/NoData"
import { INotification } from "@feature/notification/interfaces/INotificationService"
import NotificationCardMobile from "../molecules/NotificationCardMobile"

interface INotificationListMobile {
  loading: boolean
  list: INotification[]
  limit: number
}

const NotificationListMobile = ({
  loading,
  list,
  limit
}: INotificationListMobile) => (
  <Box
    component="section"
    className="reward-section grid grid-cols-1 gap-5"
  >
    {loading &&
      [...Array(limit)].map(() => <SkeletonNotificationList key={uuid()} />)}
    {list && list.length === 0 && <NoData className="w-full" />}
    {!loading &&
      list &&
      list.length > 0 &&
      list.map((_item) => (
        <NotificationCardMobile
          key={_item._id}
          id={_item._id}
          title={_item.game_name}
          createdAt={_item.createdAt}
          status={_item.read}
        />
      ))}
  </Box>
)
export default memo(NotificationListMobile)
