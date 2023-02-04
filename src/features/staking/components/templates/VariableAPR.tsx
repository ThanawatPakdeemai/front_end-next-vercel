import { IStakingAll } from "@feature/staking/interfaces/IStakingService"
import React from "react"
import RedBanner from "../organisms/RedBanner"

interface IVariableAPR {
  data: IStakingAll[]
}

const VariableAPR = ({ data }: IVariableAPR) => (
  <section className="relative w-full overflow-hidden">
    <RedBanner
      message="Fixed staking earn up to 12,916.02% APR"
      className="mb-12"
    />
    {data.map((item) => (
      <>{item.title}</>
    ))}
    {/* <StakingDetails
        title="Variable APR"
        className="mt-12"
      />
      <StakingDetails
        title="Variable APR"
        className="mt-12"
      /> */}
  </section>
)

export default VariableAPR
