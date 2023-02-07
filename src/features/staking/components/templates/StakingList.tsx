import { IStakingGroup } from "@src/types/staking"
import dayjs from "dayjs"
import React from "react"
import { v4 as uuid } from "uuid"
import RedBanner from "../organisms/RedBanner"
import StakingPeriodDate from "../organisms/StakingPeriodDate"

interface IFixedAPR {
  stakeGroupByDatetime: IStakingGroup[]
}

const StakingList = ({ stakeGroupByDatetime }: IFixedAPR) => (
  <section className="relative w-full overflow-hidden">
    <RedBanner
      message="Fixed staking earn up to 12,916.02% APR"
      className="mb-12"
    />
    {stakeGroupByDatetime.map((item) => (
      <StakingPeriodDate
        key={uuid()}
        label={item.type}
        date={dayjs(item.datetime).format("DD MMM YYYY")}
        time={dayjs(item.datetime).format("h:mm A")}
        className="mt-5"
        // onClick={() => onClickStaking(item)}
        link={`/staking/${dayjs(item.datetime)
          .format("DD MMM YYYY")
          .split(" ")
          .join("-")
          .toLocaleLowerCase()}`}
        lockedStatus={item.locked_status}
      />
    ))}
  </section>
)

export default StakingList
