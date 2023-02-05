import ProgressBar from "@ramonak/react-progress-bar"
import { numberWithCommas } from "@utils/helpers"
import React from "react"

interface ITotalStaked {
  totalPoolLimit: number
  totalPoolStake: number
  stakingValueMin?: number
  stakingValueMax?: number
  className?: string
}

const TotalStaked = ({
  totalPoolLimit,
  totalPoolStake,
  className
}: ITotalStaked) => {
  /**
   * @description Calculate total naka staked
   */
  const totalNAKAStaked = () => {
    if (totalPoolLimit > 0 && totalPoolStake > 0) {
      const result = (totalPoolStake / totalPoolLimit) * 100
      return result > 0.0001 ? parseFloat(result.toString()).toFixed(4) : 0.0001
    }
    return 0
  }

  return (
    <div
      className={`flex h-full items-center rounded-[10px] bg-neutral-900 ${className}`}
    >
      <div className="w-[30%]">
        <ProgressBar
          className="progress-wrapper"
          barContainerClassName="progress-container"
          completedClassName="progress-barCompleted"
          labelClassName="progress-label"
          completed={`${totalNAKAStaked().toString()}%`}
        />
      </div>
      <div className="pl-5 font-neue-machina-semi text-[14px]">
        <span className="text-neutral-600">total naka staked : </span>
        <span className="text-neutral-300">
          {numberWithCommas(totalPoolStake)}
        </span>
        &nbsp;/&nbsp;
        <span className="text-neutral-300">
          {numberWithCommas(totalPoolLimit)}
        </span>
      </div>
    </div>
  )
}
export default TotalStaked
