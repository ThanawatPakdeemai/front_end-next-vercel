import React, { memo } from "react"
import { Box } from "@mui/material"
import { v4 as uuid } from "uuid"
import SkeletonNotificationList from "@mobile/components/atoms/skeleton/SkeletonNotificationList"
import { IHistory } from "@feature/history/interfaces/IHistoryService"
import NoData from "@components/molecules/NoData"
import { INotification } from "@feature/notification/interfaces/INotificationService"
import NotificationCardMobile from "./NotificationCardMobile"

export type TNotificationType = "history" | "notification"

interface INotificationListMobile {
  type: TNotificationType
  loading: boolean
  list: IHistory[] | INotification[]
  limit: number
}

const NotificationListMobile = ({
  type,
  loading,
  list,
  limit
}: INotificationListMobile) => {
  const renderContent = () => {
    switch (type) {
      case "history":
        return (
          <div className="reward-section__wrapper grid grid-cols-1 gap-5">
            {!loading &&
              (list as IHistory[]) &&
              (list as IHistory[]).length > 0 &&
              (list as IHistory[]).map((_item) => (
                <NotificationCardMobile
                  key={_item._id}
                  id={_item._id}
                  image={_item.game_detail.image_category_list}
                  title={_item.game_detail.name}
                  createdAt={_item.createdAt}
                />
              ))}
          </div>
        )
      case "notification":
        return (
          <div className="reward-section__wrapper grid grid-cols-1 gap-5">
            {!loading &&
              (list as INotification[]) &&
              (list as INotification[]).length > 0 &&
              (list as INotification[]).map((_item) => (
                <NotificationCardMobile
                  key={_item._id}
                  id={_item._id}
                  title={_item.game_name}
                  createdAt={_item.createdAt}
                />
              ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Box
      component="section"
      className="reward-section"
    >
      {loading &&
        [...Array(limit)].map(() => <SkeletonNotificationList key={uuid()} />)}
      {list && list.length === 0 && <NoData className="w-full" />}
      {renderContent()}
    </Box>
  )
}
export default memo(NotificationListMobile)
