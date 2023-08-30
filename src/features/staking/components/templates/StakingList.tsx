import { IStakingGroup } from "@src/types/staking"
import dayjs from "dayjs"
import dynamic from "next/dynamic"
import React from "react"
import { v4 as uuid } from "uuid"

const StakingPeriodDate = dynamic(
  () => import("../organisms/StakingPeriodDate"),
  {
    suspense: true,
    ssr: false
  }
)

interface IFixedAPR {
  stakeGroupByDatetime: IStakingGroup[]
}

const StakingList = ({ stakeGroupByDatetime }: IFixedAPR) => (
  <>
    {stakeGroupByDatetime.map((item) => (
      <StakingPeriodDate
        key={uuid()}
        type={item.type}
        datetime={item.datetime}
        className="mt-5"
        lockStatus={
          dayjs().unix() > dayjs(item.datetime).unix() ? "locked" : "available"
        }
        link={`/staking/${dayjs(item.datetime)
          .format("DD MMM YYYY")
          .split(" ")
          .join("-")
          .toLocaleLowerCase()}`}
      />
    ))}
  </>
)
export default StakingList
