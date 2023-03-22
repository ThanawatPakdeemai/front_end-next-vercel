/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react"
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"

const QualifyingRound = () => {
  const [isActive, setIsActive] = useState(false)
  const listQualifying = [
    "Random 8 players per round",
    "Follow players time zone (Group zone)",
    "Top 64 best score wins.",
    "This round has one week.",
    "No need to use the ticket to play.",
    "Player need to record the game play video by themself to claim if any issue happen between play game.",
    "1 player can play 3 rounds",
    "System will random for 3 rooms for each player."
  ]
  return (
    <div className="my-4 h-auto w-full uppercase">
      <div
        className={`flex w-full items-center
            justify-between rounded-[15px] border border-neutral-830  ${
              isActive ? "bg-neutral-900" : "bg-neutral-800"
            } p-2 text-center  text-neutral-300 hover:rotate-0 `}
      >
        <div>
          <p className="ml-4 ">Tournaments rules</p>
        </div>
        <div>
          {isActive ? (
            <div
              className="flex w-full items-center
            justify-between text-neutral-500"
              onClick={() => setIsActive(!isActive)}
            >
              <p>Hide</p>
              <div className="ml-2 rounded-[15px] border border-neutral-830 bg-neutral-800 p-2">
                <VisibilityOffOutlinedIcon className="text-white-default" />
              </div>
            </div>
          ) : (
            <div
              className="flex w-full items-center
            justify-between text-neutral-500"
              onClick={() => setIsActive(!isActive)}
            >
              <p>View</p>
              <div className="ml-2 rounded-[15px] border border-neutral-830 bg-neutral-800 p-2">
                <RemoveRedEyeOutlinedIcon className="text-white-default" />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* {isActive && ( */}
      <div
        className={`my-4 grid w-full grid-flow-col grid-rows-4 gap-4 rounded-[15px] border border-neutral-830 bg-neutral-780 p-2 ${
          isActive ? "showlist block" : "hidden"
        } `}
      >
        {listQualifying.map((text, index) => (
          <div
            className="flex items-center
            text-xs"
          >
            <div className="ml-2 rounded-[9px]  border-2   border-neutral-700 bg-neutral-900 px-2  py-[2px] text-neutral-400">
              {index + 1}
            </div>
            <p className="ml-4 text-neutral-500">{text}</p>
          </div>
        ))}
      </div>
      {/* )} */}
    </div>
  )
}
export default QualifyingRound
