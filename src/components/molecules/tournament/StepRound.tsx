/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable object-shorthand */
import { Slider } from "@mui/material"
import React from "react"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const StepRound = () => {
  const datas = [
    {
      text: "qualifying",
      round: 0,
      active: true
    },
    {
      text: "round 1",
      round: 1,
      active: true
    },
    {
      text: "round 2",
      round: 2,
      active: true
    },
    {
      text: "round 3",
      round: 3,
      active: true
    },
    {
      text: "QUARTERFINALS",
      round: 4,
      active: false
    },
    {
      text: "SEMI FINAL",
      round: 5,
      active: false
    },
    {
      text: "GRAND FINAL",
      round: 6,
      active: false
    }
  ]
  const result = datas.filter((word) => word.active)

  return (
    <div className="h-auto w-full">
      <div className="flex h-[20px] w-full items-center justify-center rounded-[4px] border border-neutral-800 bg-[#0c0c0d] px-2">
        <Slider
          key="slider-100"
          disabled
          aria-label="scale tube"
          defaultValue={result.length}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={datas.length}
        />
      </div>
      <div
        className={`mt-[12px] flex  items-center justify-between overflow-x-auto `}
      >
        {datas.map((item, index) => (
          <div className="m-2 flex h-auto w-full flex-col">
            <div
              className={`m-2 flex w-full  items-center ${
                index === 0
                  ? "justify-start"
                  : index + 1 === datas.length
                  ? "justify-end"
                  : "justify-center"
              } `}
              key={index}
            >
              {index + 1 === datas.length ? (
                item.active ? (
                  <Icomoon className="icon-Star text-[#7B5BE6]" />
                ) : (
                  <Icomoon className="icon-Star" />
                )
              ) : item.active ? (
                <Icomoon className="icon-Star text-[#7B5BE6]" />
              ) : (
                <Icomoon className="icon-Star" />
              )}
            </div>
            <div
              className={`mx-2 flex w-full items-center justify-center    rounded-[8px] text-center ${
                item.active ? "bg-[#7B5BE6]" : "bg-[#232329]"
              }`}
            >
              <p
                className="font-dogicapixel text-gray-default whitespace-nowrap p-2 text-[9px] uppercase"
                key={index}
              >
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default StepRound
