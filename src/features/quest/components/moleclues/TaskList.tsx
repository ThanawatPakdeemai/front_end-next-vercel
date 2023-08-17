import { Chip } from "@mui/material"
import React from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { IQuestTaskList } from "@feature/quest/interfaces/IQuestService"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProp {
  dataQuestTask: IQuestTaskList
  isLast: boolean
}

const TaskList = ({ dataQuestTask, isLast }: IProp) => (
  <motion.div
    initial={{ y: 15 }}
    animate={{
      y: 0,
      transition: { delay: 0.2, stiffness: 120, type: "spring", damping: 4 }
    }}
    className={`flex w-full flex-wrap items-center justify-start gap-[6px] py-3 ${
      !isLast && "border-b border-neutral-800"
    }`}
  >
    {dataQuestTask.complete_status ? (
      <>
        <Icomoon className="icon-Checkmark1" />
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
        <Icomoon className="icon-X" />
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
  </motion.div>
)

export default TaskList
