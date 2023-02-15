import React from "react"
import FormCreate from "../organisms/FormCreate"
// import { v4 as uuid } from "uuid"

// interface IFixedAPR {
//   stakeGroupByDatetime: IStakingGroup[]
// }

const P2PDexCreateContent = () => (
  <div className="p2p-dex-content--create">
    <FormCreate />
    {/* {stakeGroupByDatetime.map((item) => (
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
    ))} */}
  </div>
)
export default P2PDexCreateContent
