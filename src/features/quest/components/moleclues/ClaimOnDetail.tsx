import { IQuestData } from "@feature/quest/interfaces/IQuestService"
import React from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import ButtonClaim from "../atoms/ButtonClaim"

interface IProp {
  data: IQuestData
  isComplete: boolean
}

const textDamping = {
  initial: {
    x: -90
  },
  animate: {
    x: 0,
    transition: { stiffness: 220, type: "spring", damping: 20 }
  }
}

const buttonClaim = {
  initial: { width: 168 },
  animate: {
    width: 144,
    transition: { stiffness: 220, type: "spring", damping: 8 }
  }
}

const ClaimOnDetail = ({ data }: IProp) => {
  const { t } = useTranslation()

  return (
    <div className="absolute bottom-0 flex h-[54px] w-full flex-row items-center justify-between gap-2 rounded-lg border border-neutral-700 bg-neutral-780 p-1">
      <div className="flex h-[41px] w-full justify-center rounded-[1px] border border-neutral-800 bg-neutral-900 px-5 py-[14px] uppercase">
        <motion.span
          variants={textDamping}
          initial="initial"
          animate="animate"
          className="text-xs text-neutral-600"
        >
          {t("mission")} {t("status")} :&nbsp;
        </motion.span>
        {data.status === "done" &&
        data.claim_reward_progress === "none" &&
        data.claim_reward_status === false ? (
          <motion.span
            variants={textDamping}
            initial="initial"
            animate="animate"
            className="text-xs text-varidian-default"
          >
            {t("complete")}
          </motion.span>
        ) : (
          <motion.span
            variants={textDamping}
            initial="initial"
            animate="animate"
            className="text-xs text-error-main"
          >
            {t("on_going")}
          </motion.span>
        )}
      </div>
      <ButtonClaim
        data={data}
        variants={buttonClaim}
        initial="initial"
        animate="animate"
      />
    </div>
  )
}

export default ClaimOnDetail
