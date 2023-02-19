import React from "react"
import CrumbCustom from "@components/atoms/CrumbCustom"
import CheckBoxNaka from "@components/atoms/checkBox/CheckBoxNaka"
import Divider from "@mui/material/Divider"

interface IPorp {
  openBadges: boolean
  handleOnExpandClick: () => void
}

const SliderGameStat = ({ openBadges, handleOnExpandClick }: IPorp) => (
  <div className="mt-[124px] mb-[38px] flex items-center justify-between">
    <div className="flex">
      <CrumbCustom
        text="My Game Stats Overview"
        background="text-neutral-400 border border-solid border-neutral-700 p-[20px] mr-4"
      />
    </div>
    <Divider className="w-[40%]" />
    <div className="flex items-center">
      <CheckBoxNaka
        value={openBadges}
        onHandle={handleOnExpandClick}
        text="Hide My Game Stats"
        className="mr-4 items-center self-center uppercase"
        fontStyle="text-xs text-black-default"
      />
      <CrumbCustom
        text="View Rank Info"
        background="bg-purple-primary"
      />
    </div>
  </div>
)

export default SliderGameStat
