import React from "react"
import SportsScoreOutlinedIcon from "@mui/icons-material/SportsScoreOutlined"

const RoundStatus = () => (
  <div className="my-4 flex h-auto w-full flex-col rounded-md border border-neutral-780 bg-neutral-800">
    <div className="m-2 flex items-center  justify-center rounded-md border-2 border-neutral-700 bg-[#212022] p-4">
      <SportsScoreOutlinedIcon className="text-4xl" />
      <p className="ml-2 text-xl uppercase text-neutral-300">Current round</p>
    </div>
    <div className="m-2 flex flex-col  items-center  justify-center rounded-md border-2 border-neutral-700 bg-black-100 p-4">
      <p className="text-neon font-digital-7 text-4xl uppercase text-error-main">
        qualifying
      </p>
      <div className=" rounded-[8px]  border-2   border-neutral-700 bg-neutral-900 px-2  py-[4px] text-neutral-400">
        <p className="uppercase ">300 PLAYERS</p>
      </div>
    </div>
  </div>
)
export default RoundStatus
