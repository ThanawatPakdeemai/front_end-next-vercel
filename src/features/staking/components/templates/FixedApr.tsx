import { IStakingGroup } from "@src/types/staking"
import dayjs from "dayjs"
import React from "react"
import { v4 as uuid } from "uuid"
import RedBanner from "../organisms/RedBanner"
import StakingPeriodDate from "../organisms/StakingPeriodDate"

interface IFixedAPR {
  stakeGroupByDatetime: IStakingGroup[]
  // dataStaking: IStakingAll[]
}

const FixedAPR = ({ stakeGroupByDatetime }: IFixedAPR) => {
  // const { onClickStaking } = useGlobalStaking()
  // const [isFixedAPR, setIsFixedAPR] = useState<boolean>(true)
  const [dataStaking, setDataStaking] = React.useState<IStakingGroup>()
  /**
   * @description Handle click staking
   */
  const onClickStaking = (_item: IStakingGroup) => {
    setDataStaking(_item)
  }

  return (
    <section className="relative w-full overflow-hidden">
      <RedBanner
        message="Fixed staking earn up to 12,916.02% APR"
        className="mb-12"
      />
      <>
        {dataStaking
          ? dataStaking.data.map((item) => {
              const date1 = dayjs(item.start_stake_time)
              const date2 = dayjs(item.end_stake_time)
              const diff = date2.diff(date1, "day")
              return (
                <StakingPeriodDate
                  key={uuid()}
                  days={diff && diff > 0 ? diff : 0}
                  label={item.type}
                  date={dayjs(item.start_stake_time).format("DD MMM YYYY")}
                  time={dayjs(item.start_stake_time).format("h:mm A")}
                  className="mt-5"
                />
              )
            })
          : stakeGroupByDatetime.map((item) => (
              <StakingPeriodDate
                key={uuid()}
                label={item.type}
                date={dayjs(item.datetime).format("DD MMM YYYY")}
                time={dayjs(item.datetime).format("h:mm A")}
                className="mt-5"
                onClick={() => onClickStaking(item)}
                // link={`/staking/${dayjs(item.datetime)
                //   .format("DD MMM YYYY")
                //   .split(" ")
                //   .join("-")
                //   .toLocaleLowerCase()}`}
              />
            ))}
      </>
      {/* {isFixedAPR ? (
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
      )} */}
    </section>
  )
}

export default FixedAPR
