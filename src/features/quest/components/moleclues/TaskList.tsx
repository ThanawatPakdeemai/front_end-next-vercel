import CheckList from "@components/icons/CheckListIcon"
import { IQuestTaskList } from "@feature/quest/interfaces/IQuestService"
import { Chip } from "@mui/material"
import React from "react"

interface IProp {
  dataQuestTask: IQuestTaskList
  isLast: boolean
}

const TaskList = ({ dataQuestTask, isLast }: IProp) => (
  <div
    className={`flex w-full items-center justify-start gap-[6px] py-3 ${
      !isLast && "border-b border-neutral-800"
    }`}
  >
    {dataQuestTask.complete_status ? (
      <>
        <CheckList.CheckPass />
        <Chip
          label={`${dataQuestTask.title}`}
          variant="outlined"
          color="default"
          size="small"
          className="w-fit uppercase"
        />
        <Chip
          label={`${dataQuestTask.counter_value}/${dataQuestTask.condition_value}`}
          variant="outlined"
          color="default"
          size="small"
          className="w-fit border uppercase !text-green-lemon"
        />
      </>
    ) : (
      <>
        <CheckList.CheckWrong />
        <Chip
          label={`${dataQuestTask.title}`}
          variant="outlined"
          color="default"
          size="small"
          className="w-fit rounded border !border-neutral-700 !bg-neutral-780 uppercase !text-neutral-400"
        />
        <Chip
          label={`${dataQuestTask.counter_value}/${dataQuestTask.condition_value}`}
          variant="outlined"
          color="default"
          size="small"
          className="w-fit rounded border !border-neutral-700 !bg-neutral-780 uppercase !text-neutral-400"
        />
      </>
    )}
  </div>
)

export default TaskList
