import useClaimQuestById from "@feature/quest/containers/hook/useClaimQuestById"
import useGetAllQuest from "@feature/quest/containers/hook/useGetAllQuest"
import { IQuestData } from "@feature/quest/interfaces/IQuestService"
import { useToast } from "@feature/toast/containers"
import useProfileStore from "@stores/profileStore"
import useQuestStore from "@stores/quest"
import { motion } from "framer-motion"
import React from "react"

interface IProp {
  data: IQuestData
}

const ButtonClaim = ({ data }: IProp) => {
  const { profile } = useProfileStore()
  const { mutateClaimQuestById } = useClaimQuestById()
  const { successToast, errorToast } = useToast()
  const { refetchAllQuest } = useGetAllQuest(
    profile && profile.data ? profile.data.id : ""
  )
  const { clearQuestStore } = useQuestStore()

  const handleClaim = (_questId: string) => {
    mutateClaimQuestById(_questId)
      .then((res) => {
        successToast(res.message)
        setTimeout(() => {
          refetchAllQuest()
          clearQuestStore()
        }, 1000)
      })
      .catch((error) => errorToast(error.message))
  }

  if (
    data.status === "done" &&
    data.claim_reward_status === false &&
    data.claim_reward_progress !== "claimed"
  ) {
    return (
      <motion.button
        initial={{ x: -15 }}
        animate={{ x: 0 }}
        transition={{
          stiffness: 120,
          type: "spring",
          damping: 4
        }}
        type="button"
        className="w-[108px] rounded-2xl border border-neutral-800 bg-varidian-default py-[8px] px-5 text-xs text-neutral-900"
        onClick={() => handleClaim(data.id)}
      >
        Claim
      </motion.button>
    )
  }
  if (data.claim_reward_progress !== "claimed") {
    return (
      <motion.button
        initial={{ width: 168 }}
        animate={{ width: 144 }}
        transition={{
          stiffness: 220,
          type: "spring",
          damping: 8
        }}
        type="button"
        className="w-[108px] rounded-2xl border border-neutral-800 py-[8px] px-5 text-xs text-neutral-600"
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
    )
  }
  return <></>
}

export default ButtonClaim
