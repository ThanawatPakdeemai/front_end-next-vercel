import CheckMarkIcon from "@components/icons/CheckMarkIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import ItemRewardDetails from "@feature/game/containers/components/molecules/ItemRewardDetails"
import SkeletonDetails from "@feature/game/containers/components/molecules/SkeletonDetails"
import useClaimReward from "@feature/game/containers/hooks/useClaimEarnedRewardByPlayerId"
import useGetAllGames from "@feature/game/containers/hooks/useGetAllGame"
import useGetP2ERewardByPlayerId from "@feature/game/containers/hooks/useGetP2ERewardByPlayerId"
import { useToast } from "@feature/toast/containers"
import { Chip, Typography, Box } from "@mui/material"
import { IPlayToEarnRewardData } from "@src/types/games"
import useProfileStore from "@stores/profileStore"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

const EarnRewardPage = () => {
  const { profile } = useProfileStore()
  const [rewardList, setRewardList] = useState<IPlayToEarnRewardData[]>()
  const { allGameData, isLoading: isGameLoading } = useGetAllGames()
  const { mutateClaimReward } = useClaimReward()
  const { earnRewardData, refetchRewardData, isLoading } =
    useGetP2ERewardByPlayerId(profile.data ? profile.data.id : "")
  // useGetP2ERewardByPlayerId("61bc7f6be434487ef8e4a7c6")

  const { successToast, errorToast, warnToast } = useToast()

  const countUnClaim = rewardList ? rewardList.length : 0

  const handleClaimReward = (reward_id: string) => {
    if (profile.data && profile.data.id) {
      mutateClaimReward({
        _playerId: profile.data.id,
        _rewardId: reward_id
      })
        .then((res) => {
          if (res.status) {
            successToast(res.data)
          }
        })
        .catch((err) => {
          errorToast(err.message)
        })
      setTimeout(() => {
        refetchRewardData()
      }, 1000)
    }
  }

  const onClaimAll = () => warnToast("Claim all is not available yet")

  useEffect(() => {
    if (earnRewardData && allGameData && earnRewardData.data.length > 0) {
      setRewardList([])
      earnRewardData.data.map(async (item) => {
        const game = allGameData.data.find((data) => data.id === item.game_id)
        if (game) {
          setRewardList((oldArray) => {
            if (oldArray) {
              return [
                ...oldArray,
                {
                  ...item,
                  game_item_name: game?.item?.[0]?.name,
                  game_item_image: game?.item?.[0]?.image,
                  game_name: game?.name,
                  game_image: game?.image_category_list
                }
              ]
            }
          })
        }
      })
    }
  }, [allGameData, earnRewardData])

  let content: React.ReactElement | React.ReactElement[]

  if (isLoading || isGameLoading) {
    content = <SkeletonDetails />
  } else if (rewardList && rewardList.length > 0) {
    content = rewardList.map((data) => (
      <ItemRewardDetails
        key={uuidv4()}
        rewardData={data}
        onClaim={() => handleClaimReward(data._id)}
      />
    ))
  } else {
    content = (
      <div className="flex w-full justify-center rounded-lg border border-neutral-800 bg-neutral-700 py-3 text-center">
        No data
      </div>
    )
  }

  return (
    <div className="grid max-w-[678px] gap-10">
      <div className="mt-6 flex items-center justify-end md:mt-0">
        <Typography className="flex-1 text-[22px] uppercase text-neutral-400">
          item rewards
        </Typography>
        {countUnClaim > 0 && (
          <>
            <Chip
              label={`UNCLAIM ${countUnClaim}`}
              color="error"
              size="small"
            />
            {/* for claim all */}
            <ButtonToggleIcon
              text="Claim All"
              className="ml-4 h-[50px] !w-[135px] !rounded-[24px] border border-neutral-700 bg-primary-main font-bold capitalize text-white-primary md:ml-[30px]"
              startIcon={<CheckMarkIcon />}
              handleClick={onClaimAll}
            />
          </>
        )}
      </div>
      <Box
        className="flex h-[100px] w-full items-center justify-center rounded-[13px] text-center text-[26px] uppercase"
        sx={{
          backgroundColor: "#2C0909",
          backgroundImage:
            "repeating-linear-gradient(0deg, #e1e2e20A 4%, #2c0909 8%)",
          backdropFilter: "blur(2.5px)"
        }}
      >
        <Typography className="text-shadow-red font-digital-7 text-[26px] text-error-main">
          Earn item rewards while you play your favorite games
        </Typography>
      </Box>
      <div className="grid max-w-[678px] gap-[10px] !overflow-x-auto md:flex md:flex-col">
        {content}
      </div>
    </div>
  )
}

export default EarnRewardPage
