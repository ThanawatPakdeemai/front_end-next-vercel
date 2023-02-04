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
  const { fixedAPRGroupByDate } = useGlobalStaking()
  const { slug } = router.query

  // State
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  /**
   * @description find staking data by slug
   */
  // const stakingData = fixedAPRGroupByDate.find(
  //   (item) =>
  //     dayjs(item.datetime)
  //       .format("DD MM YYYY")
  //       .split(" ")
  //       .join("-")
  //       .toLocaleLowerCase() === slug
  // )

  // NOTE: Delete after finished testing
  const FAKE_UNLOCK_DATA = fixedAPRGroupByDate.find(
    (item) =>
      dayjs(item.datetime)
        .format("DD MM YYYY")
        .split(" ")
        .join("-")
        .toLocaleLowerCase() === slug
  )
  // update the value of datetime in the object
  if (FAKE_UNLOCK_DATA) {
    FAKE_UNLOCK_DATA.locked_status = "unlocked"
  }

  return (
    <>
      {FAKE_UNLOCK_DATA && (
        <Box component="section">
          {FAKE_UNLOCK_DATA.data.map((item) => {
            const date1 = dayjs(item.start_stake_time)
            const date2 = dayjs(item.end_stake_time)
            const diff = date2.diff(date1, "day")
            return (
              <div key={uuid()}>
                <StakingTitle title={item.title} />
                <StakingPeriodDate
                  days={diff && diff > 0 ? diff : 0}
                  label={item.type}
                  date={dayjs(item.start_stake_time).format("DD MMM YYYY")}
                  time={dayjs(item.start_stake_time).format("h:mm A")}
                  lockedStatus={FAKE_UNLOCK_DATA.locked_status}
                  className="mt-5"
                  onClick={handleOpen}
                />
                <StakingDetails
                  dataStaking={item}
                  className="my-4"
                />
              </div>
            )
          })}
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
