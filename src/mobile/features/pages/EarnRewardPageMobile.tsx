import CheckMarkIcon from "@components/icons/CheckMarkIcon"
import DownloadIcons from "@components/icons/DownloadIcons"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import ItemRewardDetails from "@feature/game/containers/components/molecules/ItemRewardDetails"
import SkeletonDetails from "@feature/game/containers/components/molecules/SkeletonDetails"
import useClaimReward from "@feature/game/containers/hooks/useClaimEarnedRewardByPlayerId"
import useGetAllGames from "@feature/game/containers/hooks/useGetAllGame"
import useGetP2ERewardByPlayerId from "@feature/game/containers/hooks/useGetP2ERewardByPlayerId"
import { useToast } from "@feature/toast/containers"
import { Chip, Typography } from "@mui/material"
import { IPlayToEarnRewardData } from "@src/types/games"
import useProfileStore from "@stores/profileStore"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { v4 as uuidv4 } from "uuid"
import NoData from "@components/molecules/NoData"
import Headerbackpage from "@mobile/components/organisms/headerMenu/Headerbackpage"

const EarnRewardPageMobile = () => {
  const { profile } = useProfileStore()
  const [rewardList, setRewardList] = useState<IPlayToEarnRewardData[]>()
  const { allGameData, isLoading: isGameLoading } = useGetAllGames()
  const { mutateClaimReward } = useClaimReward()
  const { t } = useTranslation()
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
    let load = false

    if (!load) {
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
    }

    return () => {
      load = true
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
        <NoData />
      </div>
    )
  }

  return (
    <div className="grid max-w-[678px] gap-10">
      <div className="flex items-center justify-end md:mt-0">
        {/* <Typography className="flex-1 text-[22px] uppercase text-neutral-400">
          <Trans i18nKey="item_rewards" />
        </Typography> */}
        <Headerbackpage text="item_rewards" />
        {countUnClaim > 0 && (
          <>
            <Chip
              label={`${t("unclaimed")} ${countUnClaim}`}
              color="error"
              size="small"
            />
            {/* for claim all */}
            <ButtonToggleIcon
              text={t("claim_all")}
              className="ml-4 h-[50px] !w-[135px] !rounded-[24px] border border-neutral-700 bg-primary-main font-bold capitalize text-white-primary md:ml-[30px]"
              startIcon={<CheckMarkIcon />}
              handleClick={onClaimAll}
            />
          </>
        )}
      </div>
      <div className="flex h-[100px] w-full items-center justify-center rounded-[13px] text-center text-[26px] uppercase">
        <Typography className="text-shadow-red px-4 font-digital-7 text-[26px] text-error-main">
          {t("earn_banner_message")}
        </Typography>
      </div>
      <div className="grid max-w-[678px] gap-[10px] !overflow-x-auto md:flex md:flex-col">
        {content}
      </div>
      <div className="header fixed inset-x-0 bottom-0 z-[99]  flex flex-row items-center gap-4 bg-neutral-800 p-2">
        <div className="w-[160%] rounded bg-neutral-900 p-2.5">
          <p className="my-2 pl-2 text-sm font-bold uppercase text-white-default">
            unread: <span className="text-green-lemon">{countUnClaim}</span>
          </p>
        </div>
        <ButtonToggleIcon
          startIcon={<DownloadIcons />}
          text={t("Get all items")}
          className="border-sky-500 z-[2] w-[120px] rounded-full border border-solid text-[12px] capitalize"
          type="button"
        />
      </div>
    </div>
  )
}

export default EarnRewardPageMobile
