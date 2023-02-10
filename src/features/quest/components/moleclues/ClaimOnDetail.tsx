import useClaimQuestById from "@feature/quest/containers/hook/useClaimQuestById"
import { IQuestData } from "@feature/quest/interfaces/IQuestService"
import { useToast } from "@feature/toast/containers"
import React from "react"
import { motion } from "framer-motion"

interface IProp {
  data: IQuestData
  isComplete: boolean
}

const ClaimOnDetail = ({ data, isComplete }: IProp) => {
  const { mutateClaimQuestById } = useClaimQuestById()
  const { successToast, errorToast } = useToast()

  const handleClaim = (_questId: string) => {
    mutateClaimQuestById(_questId)
      .then((res) => successToast(res.message))
      .catch((error) => errorToast(error.message))
  }

  return (
    <div className="absolute bottom-0 flex h-[54px] w-full flex-row items-center justify-between gap-2 rounded-lg border border-neutral-700 bg-neutral-780 p-1">
      <div className="flex h-[41px] w-full justify-center rounded-[1px] border border-neutral-800 bg-neutral-900 px-5 py-4 uppercase">
        <motion.span
          initial={{ x: -90 }}
          animate={{ x: 0 }}
          transition={{
            stiffness: 220,
            type: "spring",
            damping: 20
          }}
          className="text-xs text-neutral-600"
        >
          mission status :&nbsp;
        </motion.span>
        {isComplete ? (
          <motion.span
            initial={{ x: -90 }}
            animate={{ x: 0 }}
            transition={{
              stiffness: 220,
              type: "spring",
              damping: 20
            }}
            className="text-xs text-varidian-default"
          >
            COMPLETE
          </motion.span>
        ) : (
          <motion.span
            initial={{ x: -90 }}
            animate={{ x: 0 }}
            transition={{
              stiffness: 220,
              type: "spring",
              damping: 20
            }}
            className="text-xs text-error-main"
          >
            ON-GOING
          </motion.span>
        )}
      </div>
      {!isComplete ? (
        <motion.button
          initial={{ width: 168 }}
          animate={{ width: 144 }}
          transition={{
            stiffness: 220,
            type: "spring",
            damping: 8
          }}
          type="button"
          className="h-[41px] w-1/4 rounded-[20px] border border-neutral-700 bg-neutral-800 py-[8px] px-5 text-xs text-neutral-600"
          disabled
        >
          <motion.div
            initial={{ color: "#ffff" }}
            animate={{
              color: "#4E5057",
              transition: { delay: 0.1, duration: 0.2 }
            }}
            exit={{ x: "-100vw", transition: { ease: "easeInOut" } }}
          >
            X&nbsp;&nbsp;&nbsp;&nbsp;Claim
          </motion.div>
        </motion.button>
      ) : (
        data.claim_reward_progress !== "claimed" && (
          <motion.button
            initial={{ x: -15 }}
            animate={{ x: 0 }}
            transition={{
              stiffness: 120,
              type: "spring",
              damping: 4
            }}
            type="button"
            className="h-[full] w-1/4  rounded-[20px] border border-neutral-800 bg-varidian-default py-[8px] px-5 text-xs text-neutral-900"
            onClick={() => handleClaim(data.id)}
          >
            Claim
          </motion.button>
        )
      )}
    </div>
  )
}

export default ClaimOnDetail
