import Dropdown from "@components/atoms/DropdownCustom"
import Note from "@components/molecules/Note"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import { Card, Divider } from "@mui/material"
import Image from "next/image"
import React from "react"

const CardRank = () => (
  <>
    <div className="w-[580px] rounded-2xl border border-neutral-800 p-2">
      <div className="flex justify-between rounded-2xl bg-neutral-800 p-4">
        <div className="uppercase">
          <h1 className="col-span-2 text-[14px]">
            weekly prize pool :
            <span className="text-info-main"> 5467,987 naka</span>
          </h1>
          <h1 className="pt-2 text-[10px] text-neutral-600">
            07 dec 2022 - 14 dec 2022
          </h1>
        </div>
        <div>
          <Dropdown
            title="Currently Week"
            className=""
          />
        </div>
      </div>
      <div className="grid grid-cols-8 gap-1 p-4 text-[10px] uppercase">
        <h1 className="col-span-1">Rank</h1>
        <h1 className="col-span-3">Player</h1>
        <h1 className="col-span-2">Prize pool EST. %</h1>
        <h1 className="col-span-2">
          Total naka : <span className="text-info-main"> 300,000</span>
        </h1>
      </div>
      <Divider />
      <div className="p-4">
        <div className="flex pb-2">
          <div className="h-[40px] w-[70px] hover:w-[100px]">
            <div className="flex h-[35px]  w-[35px]  items-center justify-center rounded-lg bg-error-main	text-primary-main">
              1
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-4/5">
              <div className="flex items-center">
                <Image
                  className="rounded-lg"
                  src="/images/home/table-com.svg"
                  alt="profile"
                  width={35}
                  height={35}
                />
                <h1 className="text-[12px]">Birgit Smith</h1>
              </div>
            </div>
            <div className="w-3/5 pt-2 pl-4 text-[12px]">40.34%</div>
            <div className="w-3/6">
              <div className="flex items-center">
                <Image
                  className="rounded-lg"
                  src="/images/home/table-com.svg"
                  alt="profile"
                  width={35}
                  height={35}
                />
                <h1 className="text-[12px] text-info-main">120,000</h1>
              </div>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </div>
    <Note
      className="flex  w-[580px] uppercase"
      textTitle=" System will distribute these rewards every Sunday 0:00 UTC and reset
        Tier (Bronze, Silver, Gold, Platinum)"
      subTitle=" Rank 1st - 10th from totals score."
    />
    <TopPlayer
      element="select"
      subtitle
      background="neutral"
      note
      elevation={0}
      className="!w-[550px] !bg-primary-main"
    />
  </>
)

export default CardRank
