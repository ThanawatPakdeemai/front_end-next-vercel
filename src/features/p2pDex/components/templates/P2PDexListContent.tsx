// import SkeletonTableWallet from "@components/atoms/skeleton/SkeletonTableWallet"
import React from "react"
import OrderList from "../organisms/OrderList"
// import { v4 as uuid } from "uuid"

const P2PDexList = () => (
  <div className="p2p-dex-content--pageList">
    {/* <SkeletonTableWallet /> */}
    <OrderList />
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
export default P2PDexList
