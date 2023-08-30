import {
  IQuestData,
  IQuestService
} from "@feature/quest/interfaces/IQuestService"
import React from "react"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"

const ClaimAllComponent = dynamic(
  () => import("../moleclues/ClaimAllComponent"),
  {
    suspense: true,
    ssr: true
  }
)
const MissionItem = dynamic(() => import("../moleclues/MissionItem"), {
  suspense: true,
  ssr: true
})
const TabControl = dynamic(() => import("../moleclues/TabControl"), {
  suspense: true,
  ssr: true
})

interface IProp {
  value: string
  mainCount?: number
  dailyCount?: number
  dataAllQuest?: IQuestService
  handleClaimAll: () => void
}

const MissionList = ({
  dataAllQuest,
  value,
  mainCount,
  dailyCount,
  handleClaimAll
}: IProp) => (
  <>
    <TabControl
      value={value}
      mainMissionCount={mainCount || 0}
      dailyMissionCount={dailyCount || 0}
    />
    {/* main content */}
    <div
      className={`custom-scroll mt-5 flex h-full flex-col gap-5 overflow-y-auto pr-2 `}
    >
      {value === "main"
        ? dataAllQuest &&
          dataAllQuest.data
            .filter((filter) => filter.type === "main")
            .map((item) => (
              <MissionItem
                key={uuidv4()}
                data={item as IQuestData}
              />
            ))
        : dataAllQuest &&
          dataAllQuest.data
            .filter((filter) => filter.type === "daily")
            .map((item) => (
              <>
                <MissionItem
                  key={uuidv4()}
                  data={item as IQuestData}
                />
              </>
            ))}
    </div>
    <ClaimAllComponent
      count={value === "main" ? mainCount : dailyCount}
      handleClaimAll={handleClaimAll}
    />
  </>
)

export default MissionList
