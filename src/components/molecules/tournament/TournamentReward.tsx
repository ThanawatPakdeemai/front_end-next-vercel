import React, { memo } from "react"

// interface IProp {
//   reward?: number
// }

const TournamentReward = () => (
  <div className="reward reward--round bg-line-linear-gradient text-neon  my-4 mb-2 flex h-36 w-full flex-row items-center justify-center overflow-hidden rounded-3xl border  border-neutral-800 bg-[#310809] font-digital-7 text-3xl uppercase text-error-main md:mb-12">
    <div className="reward-label ">TOTAL PRIZE :</div>

    <div className="reward-value ml-4">200,000 NAKA</div>
    {/* <div className="reward-value">{reward}</div> */}
  </div>
)

export default memo(TournamentReward)
