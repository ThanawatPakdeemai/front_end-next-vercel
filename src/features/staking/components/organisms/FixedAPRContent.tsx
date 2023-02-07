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
  const { fixedStaking, flexibleStaking } = useGlobalStaking()

  // State
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  /**
   * @description find staking data by slug
   */
  const stakingData =
    fixedStaking.find(
      (item) =>
        dayjs(item.datetime)
          .format("DD MMM YYYY")
          .split(" ")
          .join("-")
          .toLocaleLowerCase() === slug
    ) ||
    flexibleStaking.find(
      (item) =>
        dayjs(item.datetime)
          .format("DD MMM YYYY")
          .split(" ")
          .join("-")
          .toLocaleLowerCase() === slug
    )

  return (
    <>
      {stakingData && (
        <Box component="section">
          {stakingData.data.map((item) => (
            <div key={uuid()}>
              <StakingTitle title={`${item.title}`} />
              <StakingPeriodDate
                days={item.period}
                label={item.type}
                date={dayjs(item.start_stake_time).format("DD MMM YYYY")}
                time={dayjs(item.start_stake_time).format("h:mm A")}
                lockedStatus={stakingData.locked_status}
                className="mb-4"
                onClick={handleOpen}
              />
              <StakingDetails
                dataStaking={item}
                className="mb-10"
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
