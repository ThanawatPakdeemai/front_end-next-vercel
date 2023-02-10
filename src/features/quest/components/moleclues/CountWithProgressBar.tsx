import { IQuestData } from "@feature/quest/interfaces/IQuestService"
import { LinearProgress } from "@mui/material"
import Helper from "@utils/helper"
import React from "react"
import { motion } from "framer-motion"

interface IProp {
  data: IQuestData
  withText?: boolean
  className?: string
}

const linearProgressmotion = {
  initial: {
    width: 20
  },
  animate: {
    width: 125
  }
}

const CountWithProgressBar = ({
  data: { claim_reward_progress, task_list, type },
  withText,
  className
}: IProp) => {
  const countCurrent = task_list.filter(
    (filter) => filter.complete_status
  ).length
  const countTotal = task_list.length
  const percentageBar = Helper.percentageCalc(countCurrent, countTotal)

  const backgroundColor = () => {
    if (claim_reward_progress === "none") {
      if (type === "main") {
        return "rgba(244, 39, 40, 1)"
      }
      return "rgba(123, 91, 230, 1)"
    }
    return "rgba(61, 205, 149, 1)"
  }

  return (
    <div
      className={`flex h-[68px] w-[151px] flex-col rounded-lg border border-neutral-800 bg-primary-main p-[10px] ${className}`}
    >
      <div className="flex items-center">
        {withText && claim_reward_progress === "none" ? (
          <>
            <span
              className={`flex-1 text-xs uppercase ${
                type === "main" ? "text-error-main" : "text-secondary-main"
              }`}
            >
              mission
              <br />
              on-going...
            </span>
            <div className="flex font-digital-7 text-[26px]">
              <span className="text-neutral-400">{countCurrent}</span>
              <span
                className={`${
                  type === "main"
                    ? "text-red-with-shadow"
                    : "text-purple-with-shadow"
                }`}
              >
                &nbsp;: {countTotal}
              </span>
            </div>
          </>
        ) : (
          <>
            {withText && (
              <span className="flex-1 text-xs uppercase text-varidian-default">
                mission
                <br />
                complete
              </span>
            )}
            <div className="text-green-with-shadow flex font-digital-7 text-[26px]">
              <span>{countCurrent}</span>
              <span>&nbsp;: {countTotal}</span>
            </div>
          </>
        )}
      </div>
      <div className="rounded-[2px] border border-neutral-800 bg-neutral-780 p-[2px]">
        <div className="bg-neutral-780">
          <motion.div
            variants={linearProgressmotion}
            initial="initial"
            animate="animate"
            transition={{
              stiffness: 320,
              type: "spring",
              damping: 20
            }}
            className="full"
          >
            <LinearProgress
              variant="determinate"
              className="progress-bar-mission w-full rotate-180"
              value={percentageBar}
              sx={{
                ".MuiLinearProgress-bar1Determinate": {
                  backgroundColor: backgroundColor(),
                  background: `linear-gradient(90deg, rgba(1,1,1,1) 50%, ${backgroundColor()} 50%);`,
                  backgroundRepeat: "repeat-x",
                  backgroundSize: "2%"
                }
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CountWithProgressBar
