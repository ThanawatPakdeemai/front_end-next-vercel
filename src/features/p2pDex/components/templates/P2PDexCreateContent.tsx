import React, { useState } from "react"
import FormCreate from "../organisms/FormCreate"
import HeaderP2P from "../atoms/HeaderP2P"
// import { v4 as uuid } from "uuid"

// interface IFixedAPR {
//   stakeGroupByDatetime: IStakingGroup[]
// }

const P2PDexCreateContent = () => {
  const [type, setType] = useState<"buy" | "sell">("buy")
  return (
    <div className="p2p-dex-content--create">
      <HeaderP2P
        type={type}
        dataButton={[
          { title: "Create Buy", type: "buy" },
          { title: "Create Sell", type: "sell" }
        ]}
        setType={(value) => {
          setType(value)
        }}
      />

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
}
export default P2PDexCreateContent
