import useGlobalStaking from "@feature/staking/containers/hook/useGlobalStaking"
import { Box } from "@mui/material"
import dayjs from "dayjs"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { v4 as uuid } from "uuid"
import StakingTitle from "../atoms/StakingTitle"
import StakingDetails from "./StakingDetails"
import StakingModal from "./StakingModal"
import StakingPeriodDate from "./StakingPeriodDate"

const FixedAPRContent = () => {
  const router = useRouter()
  const { slug } = router.query
  const { fixedAPRGroupByDate } = useGlobalStaking()

  // State
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  /**
   * @description find staking data by slug
   */
  const stakingData = fixedAPRGroupByDate.find(
    (item) =>
      dayjs(item.datetime)
        .format("DD MM YYYY")
        .split(" ")
        .join("-")
        .toLocaleLowerCase() === slug
  )

  // NOTE: Delete after finished testing
  // const FAKE_UNLOCK_DATA = fixedAPRGroupByDate.find(
  //   (item) =>
  //     dayjs(item.datetime)
  //       .format("DD MM YYYY")
  //       .split(" ")
  //       .join("-")
  //       .toLocaleLowerCase() === slug
  // )
  // // update the value of datetime in the object
  // if (FAKE_UNLOCK_DATA) {
  //   FAKE_UNLOCK_DATA.locked_status = "unlocked"
  // }

  return (
    <>
      {stakingData && (
        <Box component="section">
          {stakingData.data.map((item) => (
            <div key={uuid()}>
              <StakingPeriodDate
                days={item.period}
                label={item.type}
                date={dayjs(item.start_stake_time).format("DD MMM YYYY")}
                time={dayjs(item.start_stake_time).format("h:mm A")}
                lockedStatus={stakingData.locked_status}
                className="mb-10"
                onClick={handleOpen}
              />
              <StakingTitle title={`${item.title}`} />
              <StakingDetails
                dataStaking={item}
                className="my-4"
              />
            </div>
          ))}
        </Box>
      )}
      <StakingModal
        open={open}
        handleClose={handleClose}
      />
    </>
  )
}

export default FixedAPRContent
