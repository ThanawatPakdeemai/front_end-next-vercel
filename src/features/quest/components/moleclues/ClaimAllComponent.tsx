import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import AddIcon from "@mui/icons-material/Add"
import React from "react"
import { motion } from "framer-motion"

interface IProp {
  count?: number
  handleClaimAll: () => void
}

const ClaimAllComponent = ({ count, handleClaimAll }: IProp) => (
  <div className="flex h-[54px] w-full flex-row items-center justify-center gap-[10px] rounded-lg border border-neutral-700 bg-neutral-780 p-1">
    <motion.div
      initial={{ x: 15 }}
      animate={{ x: 0 }}
      transition={{
        stiffness: 220,
        type: "spring",
        damping: 8
      }}
      className="flex w-full items-center justify-between rounded-[1px] border border-neutral-800 bg-neutral-900  px-5"
    >
      <motion.span
        initial={{ x: 130 }}
        animate={{ x: 0 }}
        transition={{
          stiffness: 220,
          type: "spring",
          damping: 20
        }}
        className="text-xs uppercase text-neutral-600"
      >
        total mission complete
      </motion.span>
      <motion.span
        initial={{ scale: 0, top: 100 }}
        animate={{ scale: 1, top: 30 }}
        transition={{ stiffness: 120 }}
        className="font-digital-7 text-[26px] text-varidian-default"
      >
        {count}
      </motion.span>
    </motion.div>
    <motion.div
      initial={{ width: 184 }}
      animate={{ width: 248 }}
      transition={{
        stiffness: 220,
        type: "spring",
        damping: 8
      }}
    >
      <ButtonToggleIcon
        startIcon={<AddIcon className="text-neutral-300" />}
        text="Claim all"
        className="w-full rounded-lg border border-neutral-700 text-neutral-300"
        handleClick={handleClaimAll}
        dropColor
      />
    </motion.div>
  </div>
)

export default ClaimAllComponent
