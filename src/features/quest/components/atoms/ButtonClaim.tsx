import useClaimQuestById from "@feature/quest/containers/hook/useClaimQuestById"
import useGetAllQuest from "@feature/quest/containers/hook/useGetAllQuest"
import { IQuestData } from "@feature/quest/interfaces/IQuestService"
import { useToast } from "@feature/toast/containers"
import useLoadingStore from "@stores/loading"
import useProfileStore from "@stores/profileStore"
import useQuestStore from "@stores/quest"
import { useTranslation } from "react-i18next"
import { motion, Variants } from "framer-motion"
import React from "react"

interface IProp {
  data: IQuestData
  variants?: Variants
  initial?: string
  animate?: string
}

const ButtonClaim = ({ data, variants, initial, animate }: IProp) => {
  const { profile } = useProfileStore()
  const { mutateClaimQuestById } = useClaimQuestById()
  const { successToast, errorToast } = useToast()
  const { refetchAllQuest } = useGetAllQuest(
    profile && profile.data ? profile.data.id : ""
  )
  const { clearQuestStore } = useQuestStore()
  const { setOpen, setClose } = useLoadingStore()
  const { t } = useTranslation()

  const handleClaim = (_questId: string) => {
    setOpen("Claim is processing...")
    mutateClaimQuestById(_questId)
      .then((res) => {
        successToast(res.message)
        setTimeout(() => {
          setClose()
          refetchAllQuest()
          clearQuestStore()
        }, 1000)
      })
      .catch((error) => {
        setClose()
        errorToast(error.message)
      })
  }

  if (
    data.status === "done" &&
    data.claim_reward_status === false &&
    data.claim_reward_progress !== "claimed"
  ) {
    return (
      <motion.button
        type="button"
        className="w-[108px] rounded-2xl border border-neutral-800 bg-varidian-default py-[8px] px-5 text-xs uppercase text-neutral-900"
        onClick={() => handleClaim(data.id)}
      >
        <motion.div
          initial={{ x: 15 }}
          animate={{
            x: 0,
            transition: { stiffness: 120, type: "spring", damping: 4 }
          }}
        >
          {t("claim")}
        </motion.div>
      </motion.button>
    )
  }
  if (data.claim_reward_progress !== "claimed") {
    return (
      <motion.button
        variants={variants}
        initial={initial}
        animate={animate}
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
          <motion.div
            initial={{ x: -15 }}
            animate={{
              x: 0,
              transition: { stiffness: 120, type: "spring", damping: 4 }
            }}
            className="uppercase"
          >
            X&nbsp;&nbsp;&nbsp;&nbsp;{t("claim")}
          </motion.div>
        </motion.div>
      </motion.button>
    )
  }
  return <></>
}

export default ButtonClaim
