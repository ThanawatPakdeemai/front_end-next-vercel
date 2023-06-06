import React, { memo } from "react"
import { Box } from "@mui/material"
import { v4 as uuid } from "uuid"
import SkeletonNotificationList from "@mobile/components/atoms/skeleton/SkeletonNotificationList"
import { IHistory } from "@feature/history/interfaces/IHistoryService"
import NoData from "@components/molecules/NoData"
import GameInfoCard from "@mobile/features/game/components/molecules/GameInfoCard"

interface IPlayedHistoryListMobile {
  loading: boolean
  list: IHistory[]
  limit: number
}

const PlayedHistoryListMobile = ({
  loading,
  list,
  limit
}: IPlayedHistoryListMobile) => (
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
        <GameInfoCard
          key={_item._id}
          id={_item._id}
          image={_item.game_detail.image_category_list}
          title={_item.game_detail.name}
          createdAt={_item.createdAt}
        />
      ))}
  </Box>
)
export default memo(PlayedHistoryListMobile)
