import React from "react"

export interface IStakingTitle {
  title?: string
  className?: string
}

const StakingTitle = ({ title, className }: IStakingTitle) => (
  <div className={`${className}`}>
    <div className="mb-10 flex items-center justify-between">
      <p className="min-w-[250px] font-neue-machina-bold text-neutral-400">
        {title}
      </p>
      <div className="h-[10px] w-full rounded-[13px] bg-[url('/images/services/curvy-line.png')]" />
    </div>
  </div>
)

export default StakingTitle
