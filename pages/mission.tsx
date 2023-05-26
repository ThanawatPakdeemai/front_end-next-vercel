/* eslint-disable no-unused-vars */
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { MobileView } from "react-device-detect"
import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React, { useEffect, ReactElement } from "react"
import useGetAllQuest from "@feature/quest/containers/hook/useGetAllQuest"
import useProfileStore from "@stores/profileStore"
import useQuestStore from "@stores/quest"
import useClaimQuestById from "@feature/quest/containers/hook/useClaimQuestById"
import { useToast } from "@feature/toast/containers"
import MissionList from "@feature/quest/components/organisms/MissionList"
import MissionDetails from "@feature/quest/components/organisms/MissionDetails"
import HeaderBackPageMobile from "@mobile/components/atoms/headerMenu/HeaderBackPageMobile"

export default function Mission() {
  const {
    data: questStore,
    setClose,
    missionType,
    setHasCompleted
  } = useQuestStore()
  const { profile } = useProfileStore()
  const { warnToast } = useToast()

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

  const mainCount = dataAllQuest?.data.filter(
    (filter) => filter.type === "main"
  ).length
  const dailyCount = dataAllQuest?.data.filter(
    (filter) => filter.type === "daily"
  ).length

  const handleClaimAll = () => warnToast("Claim all is not available yet")

  useEffect(() => {
    let load = false

    if (!load) {
      const checkIfHasClaimableQuest = dataAllQuest?.data.filter(
        (filter) =>
          filter.status === "done" &&
          filter.claim_reward_status === false &&
          filter.claim_reward_progress !== "claimed"
      )
      if (checkIfHasClaimableQuest && checkIfHasClaimableQuest.length > 0) {
        setHasCompleted(true)
      }
    }

    return () => {
      load = true
    }
  }, [dataAllQuest?.data, setHasCompleted])
  const renderElement = () =>
    !questStore ? (
      <MissionList
        value={missionType}
        mainCount={mainCount}
        dailyCount={dailyCount}
        dataAllQuest={dataAllQuest}
        handleClaimAll={handleClaimAll}
      />
    ) : (
      <MissionDetails />
    )

  return (
    <Box
      component="article"
      className="h-full w-full"
    >
      <MobileView>
        <HeaderBackPageMobile text="commission" />
        <div className="z-[999991] flex h-full flex-col gap-5 rounded-md border-[3px] border-neutral-800 bg-neutral-900 p-4">
          {renderElement()}
        </div>
      </MobileView>
    </Box>
  )
}

Mission.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MobileView>{page}</MobileView>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
