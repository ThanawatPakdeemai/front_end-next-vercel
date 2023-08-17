import React from "react"
import Divider from "@mui/material/Divider"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"

const CrumbCustom = dynamic(() => import("@components/atoms/CrumbCustom"), {
  suspense: true,
  ssr: true
})
const CheckBoxNaka = dynamic(
  () => import("@components/atoms/checkBox/CheckBoxNaka"),
  {
    suspense: true,
    ssr: true
  }
)

interface IPorp {
  openBadges: boolean
  handleOnExpandClick: () => void
}

const SliderGameStat = ({ openBadges, handleOnExpandClick }: IPorp) => {
  const { t } = useTranslation()
  return (
    <div className="mb-[38px] mt-[124px] flex items-center justify-between">
      <div className="flex">
        <CrumbCustom
          text={t("my_game_stats_overview")}
          className="mr-4 cursor-default border border-solid border-neutral-700 p-[20px] text-neutral-400"
        />
      </div>
      <Divider className="w-[40%]" />
      <div className="flex items-center">
        <CheckBoxNaka
          value={openBadges}
          onHandle={handleOnExpandClick}
          text={t("hide_my_game_stats")!}
          className="mr-4 items-center self-center uppercase"
          fontStyle="text-xs text-black-default"
        />
        <CrumbCustom
          text={t("view_rank_info")}
          className="cursor-default bg-purple-primary"
        />
      </div>
    </div>
  )
}

export default SliderGameStat
