import CONFIGS from "@configs/index"
import React from "react"
import { BrowserView, MobileView } from "react-device-detect"

interface IProp {
  title: string
  value: string | number
}

const SummaryGameDetail = ({ title, value }: IProp) => (
  <>
    <BrowserView>
      <div className="flex w-[260px] border-b border-neutral-800 py-[10px]">
        <span className="flex-1 uppercase text-neutral-500">{title}</span>
        <span className="uppercase text-neutral-300">{value}</span>
      </div>
    </BrowserView>
    {CONFIGS.DISPLAY_MOBILE_MODE === "true" && (
      <MobileView>
        <div className="flex w-full justify-between  border-b border-neutral-800 py-[10px]">
          <span className="flex-1 uppercase text-neutral-500">{title}</span>
          <span className="uppercase text-neutral-300">{value}</span>
        </div>
      </MobileView>
    )}
  </>
)

export default SummaryGameDetail
