import React, { memo } from "react"
import { Box } from "@mui/material"
import { v4 as uuid } from "uuid"
import dynamic from "next/dynamic"
import { IHistory } from "@feature/history/interfaces/IHistoryService"
import useHistoryController from "@feature/history/containers/hook/useHistoryController"
import useGlobalControllerMobile from "@mobile/features/game/containers/hooks/useGlobalControllerMobile"

const SkeletonNotificationList = dynamic(
  () => import("@mobile/components/atoms/skeleton/SkeletonNotificationList"),
  {
    suspense: true,
    ssr: true
  }
)
const GameInfoCard = dynamic(
  () => import("@mobile/features/game/components/molecules/GameInfoCard"),
  {
    suspense: true,
    ssr: false
  }
)
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: true
})

interface IPlayedHistoryListMobile {
  loading: boolean
  list: IHistory[]
  limit: number
}

const PlayedHistoryListMobile = ({
  loading,
  list,
  limit
}: IPlayedHistoryListMobile) => {
  const { handleClickView } = useHistoryController()
  const { handleClickOpenLoading } = useGlobalControllerMobile()

  return (
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
          <div
            key={_item._id}
            onClick={() => {
              // setOpen("")
              handleClickOpenLoading()
              handleClickView(_item)
            }}
            aria-hidden="true"
          >
            <GameInfoCard
              id={_item._id}
              image={_item.game_detail.image_category_list}
              title={_item.game_detail.name}
              createdAt={_item.createdAt}
            />
          </div>
        ))}
    </Box>
  )
}
export default memo(PlayedHistoryListMobile)
