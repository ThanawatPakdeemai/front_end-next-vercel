import ProgressBar from "@ramonak/react-progress-bar"
import React from "react"

interface ITotalStaked {
  value?: number
  stakingValueMin?: number
  stakingValueMax?: number
  className?: string
}

const TotalStaked = ({
  value,
  stakingValueMin,
  stakingValueMax,
  className
}: ITotalStaked) => (
  <div
    className={`flex h-full items-center rounded-[10px] bg-neutral-900 ${className}`}
  >
    <div className="w-[30%]">
      <ProgressBar
        completed={value || 55}
        className="progress-wrapper"
        barContainerClassName="progress-container"
        completedClassName="progress-barCompleted"
        labelClassName="progress-label"
      />
    </div>
    <div className="">
      <p className="pl-5 font-neue-machina-semi text-[14px]">
        <span className="text-neutral-600">total naka staked : </span>
        <span className="text-neutral-300">{stakingValueMin || 11000000}</span>
        &nbsp;/&nbsp;
        <span className="text-neutral-300">{stakingValueMax || 25000000}</span>
      </p>
    </div>
  </div>
)

export default TotalStaked
