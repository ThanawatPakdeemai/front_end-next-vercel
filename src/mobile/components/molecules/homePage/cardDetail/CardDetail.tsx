import React, { useEffect } from "react"
import { Typography } from "@mui/material"
import { Image } from "@components/atoms/image"
import useProfileStore from "@stores/profileStore"
import useGetAllQuest from "@feature/quest/containers/hook/useGetAllQuest"
import useClaimQuestById from "@feature/quest/containers/hook/useClaimQuestById"
import QuestBar from "../questBar/QuestBar"

const CardDetail = ({ type, title, detail, time, image }: any) => {
  const { profile } = useProfileStore()
  const [value, setValue] = React.useState<number>(0)
  const [max, setMax] = React.useState<number>(0)

  const { dataAllQuest, refetchAllQuest } = useGetAllQuest(
    profile.data ? profile.data.id : ""
  )

  const { claimRespondData } = useClaimQuestById()

  useEffect(() => {
    let load = false
    if (!load) {
      if (claimRespondData) {
        refetchAllQuest()
      }
    }
    return () => {
      load = true
    }
  }, [claimRespondData, refetchAllQuest])

  const dailyCount = dataAllQuest?.data.filter(
    (filter) => filter.type === "daily"
  ).length

  const questDone = dataAllQuest?.data.filter(
    (filter) => filter.type === "daily" && filter.status === "done"
  ).length

  const questNotDone = dataAllQuest?.data.filter(
    (filter) => filter.type === "daily" && filter.status === "in_progress"
  ).length

  /**
   * @description State for close loading
   */
  useEffect(() => {
    let load = false

    if (!load) {
      if (questDone !== undefined && dailyCount !== undefined) {
        setValue(questDone)
        setMax(dailyCount)
      }
    }

    return () => {
      load = true
    }
  }, [dailyCount, questDone])

  return (
    <>
      <div className=" my-[16px] flex flex-row">
        <div className="mx-[16px] flex h-[52px] w-[52px] items-center justify-center rounded-[14px]">
          <Image
            src={image}
            alt="avatar"
            width={52}
            height={52}
            className="rounded-lg"
          />
        </div>
        <div className="mr-[16px] flex w-full flex-col justify-around">
          <div className="flex items-center justify-between">
            {type === "quest" ? (
              <Typography className="text-[10px] uppercase text-neutral-500">
                Dairy Quest
              </Typography>
            ) : (
              <Typography className="text-[12px] uppercase text-white-primary">
                {title}
              </Typography>
            )}
            {time ? (
              <Typography className="text-[10px] uppercase text-neutral-500">
                * Countdown *
              </Typography>
            ) : null}
          </div>
          {type === "quest" ? (
            <Typography className="text-[12px] uppercase text-white-primary">
              {questNotDone && questNotDone[0]?.name}
            </Typography>
          ) : (
            <Typography className="text-[12px] text-neutral-500">
              {detail}
            </Typography>
          )}
          {type === "quest" ? (
            <div className="flex items-center justify-between">
              <QuestBar
                barColor="text-error-main"
                count={value}
                countMax={max}
              />
              {questNotDone && (
                <Typography className="text-[10px] uppercase text-neutral-500">
                  Rewards : {questNotDone[0]?.rewards[0].amount}{" "}
                  {questNotDone[0]?.rewards[0].type}
                </Typography>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div className="border-b-[1px] border-solid border-neutral-700" />
    </>
  )
}

export default CardDetail
