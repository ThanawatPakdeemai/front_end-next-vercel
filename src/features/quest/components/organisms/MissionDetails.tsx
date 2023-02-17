import ButtonIcon from "@components/atoms/button/ButtonIcon"
import { ArrowBack } from "@mui/icons-material"
import { Chip } from "@mui/material"
import useQuestStore from "@stores/quest"
import { v4 as uuidv4 } from "uuid"
import React, { useState } from "react"
import { motion } from "framer-motion"
import ClaimOnDetail from "../moleclues/ClaimOnDetail"
import CountWithProgressBar from "../moleclues/CountWithProgressBar"
import TaskList from "../moleclues/TaskList"
import RewardList from "../moleclues/RewardList"

const MissionDetails = () => {
  const { data: dataQuestDetails, clearQuestStore } = useQuestStore()
  const [value, setValue] = useState<string>("mission")

  return dataQuestDetails ? (
    <div className="relative h-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col justify-start gap-2">
          <div className="flex gap-[6px]">
            <Chip
              label="main mission"
              variant="filled"
              color="error"
              size="small"
              className="!max-w-[103px] uppercase"
            />
            <Chip
              label={`${dataQuestDetails.task_list.length} mission`}
              variant="outlined"
              color="primary"
              size="small"
              className="!max-w-[103px] uppercase"
            />
            <Chip
              label={`${dataQuestDetails.rewards.length} rewards`}
              variant="outlined"
              color="primary"
              size="small"
              className="!max-w-[103px] uppercase"
            />
          </div>
          <span className="text-[14px] uppercase text-neutral-400">
            {dataQuestDetails.name}
          </span>
        </div>
        <ButtonIcon
          icon={<ArrowBack />}
          onClick={clearQuestStore}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900"
        />
      </div>
      {/* NOTE: show data area */}
      <div className="mb-[14px] flex min-h-[50px] w-full flex-row justify-center gap-2 rounded-[13px] bg-neutral-700 p-1 text-sm">
        <button
          type="button"
          onClick={() => setValue("mission")}
          className={`w-1/2 rounded-2xl ${
            value === "mission" ? "bg-neutral-900" : "bg-neutral-800"
          }  p-2 capitalize text-white-default`}
        >
          mission
        </button>
        <button
          type="button"
          onClick={() => setValue("rewards")}
          className={`w-1/2 rounded-2xl ${
            value === "rewards" ? "bg-neutral-900" : "bg-neutral-800"
          }  p-2 capitalize text-white-default`}
        >
          rewards
        </button>
      </div>
      {value === "mission" ? (
        <>
          <div className="mb-[14px] flex items-center gap-5">
            <CountWithProgressBar data={dataQuestDetails} />
            <span className="max-w-[339px] text-sm">
              Exploration of Mars to study its geology, climate, and potential
              for past or present life and prepare for human settlement.
            </span>
          </div>
          <motion.div
            initial={{ y: -80 }}
            animate={{
              y: 0,
              transition: { stiffness: 120, type: "spring", damping: 8 }
            }}
            className="flex h-fit w-full flex-col rounded-[8px] border border-solid border-neutral-700 p-4"
          >
            {dataQuestDetails.task_list.map((data, index) => (
              <TaskList
                key={uuidv4()}
                dataQuestTask={data}
                isLast={index === dataQuestDetails.task_list.length - 1}
              />
            ))}
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ y: 80 }}
          animate={{
            y: 0,
            transition: { stiffness: 100, type: "spring", damping: 8 }
          }}
          className="w-full rounded-[8px] border border-solid border-neutral-700 px-4"
        >
          {dataQuestDetails &&
            dataQuestDetails.rewards.map((reward, index) => (
              <RewardList
                key={uuidv4()}
                reward={reward}
                isLast={index === dataQuestDetails.rewards.length - 1}
              />
            ))}
        </motion.div>
      )}

      {/* NOTE: footer area */}
      <ClaimOnDetail
        data={dataQuestDetails}
        isComplete={dataQuestDetails.claim_reward_status}
      />
    </div>
  ) : (
    <>Loading..</>
  )
}

export default MissionDetails
