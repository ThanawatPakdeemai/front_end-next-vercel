import NoticeIcon from "@components/icons/NoticeBar"
import { IQuestData } from "@feature/quest/interfaces/IQuestService"
import useQuestStore from "@stores/quest"
import React from "react"
import { useTranslation } from "react-i18next"
import ButtonClaim from "../atoms/ButtonClaim"
import CountWithProgressBar from "./CountWithProgressBar"

interface IProps {
  data: IQuestData
}

const MissionItem = ({ data }: IProps) => {
  const { setQuestStore } = useQuestStore()
  const { t } = useTranslation()

  const countTotal = data.task_list.length
  const countReward = data.rewards.length

  return (
    <div className="flex w-full flex-row items-center">
      <NoticeIcon.Left fill={data.type === "main" ? "#F42728" : "#7B5BE6"} />
      <div className="h-fit w-full rounded-md border border-neutral-800 bg-neutral-780">
        <div className="flex flex-row items-center p-2">
          <div className="ml-4 flex flex-1 flex-col pr-5">
            {/* quest title */}
            <span className="text-sm uppercase text-neutral-400">
              {data.name}
            </span>
            {/* quest description */}
            <span className="text-sm text-neutral-500">
              {data.task_list.length > 1
                ? `${data.task_list[0].title} ... and more`
                : data.task_list[0].title}
            </span>
          </div>
          <CountWithProgressBar
            data={data}
            withText
          />
        </div>
        <div className="my-2 flex h-fit flex-wrap items-center justify-between border-t border-neutral-800 pl-[18px] pt-2">
          <div className="flex items-center gap-[22px]">
            {/* current mission */}
            <span className="flex items-center gap-2 uppercase">
              <span
                className={`${
                  data.type === "main"
                    ? "text-red-with-shadow"
                    : "text-purple-with-shadow"
                } font-digital-7 text-[26px]`}
              >
                {countTotal}
              </span>
              <span className="text-xs">{t("mission")}</span>
            </span>
            {/* rewards */}
            <span className="flex items-center gap-2 uppercase">
              <span className="text-green-with-shadow font-digital-7 text-[26px]">
                {countReward}
              </span>
              <span className="text-xs">{t("rewards")}</span>
            </span>
          </div>
          <div className="mr-2 flex gap-3">
            <button
              type="button"
              className="w-[108px] rounded-2xl border border-neutral-700 py-[8px] text-xs text-neutral-200"
              onClick={() => setQuestStore(data)}
            >
              {t("view_details")}
            </button>
            {/* check is claim */}
            <ButtonClaim data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissionItem
