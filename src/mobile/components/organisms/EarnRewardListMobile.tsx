import React from "react"
import { Box } from "@mui/material"
import { IPlayToEarnRewardData } from "@src/types/games"
import { v4 as uuid } from "uuid"
import NoData from "@components/molecules/NoData"
import SkeletonEarnRewardMobile from "../atoms/skeleton/SkeletonEarnRewardMobile"
import EarnRewardCardMobile from "../molecules/EarnRewardCardMobile"

interface IEarnRewardListMobile {
  earnReward: IPlayToEarnRewardData[] | []
  loading: boolean
  limit: number
}

const EarnRewardListMobile = ({
  earnReward,
  loading,
  limit
}: IEarnRewardListMobile) => (
  <Box
    component="section"
    className="reward-section"
  >
    {earnReward && earnReward.length === 0 && !loading && (
      <NoData className="w-full" />
    )}
    {loading &&
      [...Array(limit)].map(() => <SkeletonEarnRewardMobile key={uuid()} />)}
    {earnReward && earnReward.length > 0 && (
      <div className="grid grid-cols-1 gap-5">
        {!loading &&
          earnReward.map((_earn: IPlayToEarnRewardData) => (
            <EarnRewardCardMobile
              key={_earn._id}
              id={_earn._id}
              image={_earn.item_id.image}
              title={`${_earn.item_id.name} (${_earn.item_amount})`}
              description={`Size ${_earn.item_id.item_size}`}
            />
          ))}
      </div>
    )}
  </Box>
)

export default EarnRewardListMobile
