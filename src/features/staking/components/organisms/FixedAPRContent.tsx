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
          {stakingData.dataAPI.map((item) => (
            <div key={uuid()}>
              <StakingTitle title={`${item.title}`} />
              <StakingPeriodDate
                days={item.period}
                type={item.type}
                datetime={stakingData.datetime}
                className="mb-4"
                lockStatus={
                  dayjs().unix() > dayjs(stakingData.datetime).unix()
                    ? "locked"
                    : "available"
                }
              />
              <StakingDetails
                dataStaking={item}
                className="mb-10"
                handleOpen={handleOpen}
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
