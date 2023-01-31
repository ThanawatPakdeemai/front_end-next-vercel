import React, { useState } from "react"
import { v4 as uuid } from "uuid"
import RedBanner from "../organisms/RedBanner"
import StakingPeriodDate from "../organisms/StakingPeriodDate"
import StakingDetails from "../organisms/StakingDetails"

const FixedAPR = () => {
  // eslint-disable-next-line no-unused-vars
  const [isFixedAPR, setIsFixedAPR] = useState<boolean>(true)
  const stakingPeriodDetail = [
    {
      days: 180,
      label: "Fixed APR",
      date: "20 SEB 2023",
      time: "08:00 pm"
    },
    {
      days: 360,
      label: "Fixed APR",
      date: "20 SEB 2023",
      time: "12:00 pm"
    }
  ]
  return (
    <section className="relative w-full overflow-hidden">
      <RedBanner
        message="Fixed staking earn up to 12,916.02% APR"
        className="mb-12"
      />
      {isFixedAPR ? (
        <>
          {stakingPeriodDetail?.map((s) => (
            <StakingPeriodDate
              key={uuid()}
              days={s.days}
              label={s.label}
              date={s.date}
              time={s.time}
              className="mt-5"
            />
          ))}
          <StakingDetails
            title="Fixed APR"
            className="mt-24"
          />
        </>
      ) : (
        <>
          <StakingDetails
            title="Variable APR"
            className="mt-12"
          />
          <StakingDetails
            title="Variable APR"
            className="mt-12"
          />
        </>
      )}
    </section>
  )
}

export default FixedAPR
