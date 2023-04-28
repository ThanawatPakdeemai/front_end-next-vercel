import {
  IQuestData,
  IQuestService
} from "@feature/quest/interfaces/IQuestService"
import React from "react"
import { v4 as uuidv4 } from "uuid"
import ClaimAllComponent from "../moleclues/ClaimAllComponent"
import MissionItem from "../moleclues/MissionItem"
import TabControl from "../moleclues/TabControl"

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
