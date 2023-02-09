import ButtonIcon from "@components/atoms/button/ButtonIcon"
import CloudIcon from "@components/icons/CloudIcon"
import LogoIcon from "@components/icons/LogoIcon"
import NoticeIcon from "@components/icons/NoticeBar"
import React from "react"

interface IProp {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  mainMissionCount: number
  dailyMissionCount: number
}

const TabControl = ({
  value,
  setValue,
  mainMissionCount,
  dailyMissionCount
}: IProp) => (
  <div className="flex w-full gap-2">
    {/* tap1 */}
    <div className="flex h-12 w-1/2 flex-col items-center">
      <button
        type="button"
        onClick={() => setValue("main")}
        className={`flex w-full items-center justify-between rounded-2xl border border-neutral-800 ${
          value === "main" ? "bg-neutral-900" : "bg-neutral-780"
        } p-2 uppercase text-error-main`}
      >
        <span className="ml-4 text-xs font-bold">main mission</span>
        <div className="flex items-center">
          <span className="mr-3 font-digital-7 text-[26px]">
            {mainMissionCount}
          </span>
          <ButtonIcon
            icon={<LogoIcon fill="#F42728" />}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-780"
            aria-label="naka-icon"
          />
        </div>
      </button>
      <div>
        <NoticeIcon.Bottom fill={value === "main" ? "#F42728" : "#232329"} />
      </div>
    </div>
    {/* tap2 */}
    <div className="flex h-12 w-1/2 flex-col items-center">
      <button
        type="button"
        onClick={() => setValue("diary")}
        className={`flex w-full items-center justify-between rounded-2xl border border-neutral-800 ${
          value === "diary" ? "bg-neutral-900" : "bg-neutral-780"
        } p-2 uppercase text-secondary-main`}
      >
        <span className="ml-4 text-xs font-bold">diary mission</span>
        <div className="flex items-center">
          <span className="mr-3 font-digital-7 text-[26px]">
            {dailyMissionCount}
          </span>
          <ButtonIcon
            icon={<CloudIcon />}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-780"
            aria-label="naka-icon"
          />
        </div>
      </button>
      <div>
        <NoticeIcon.Bottom fill={value === "diary" ? "#7B5BE6" : "#232329"} />
      </div>
    </div>
  </div>
)

export default TabControl
