import React, { ReactNode } from "react"
import { motion, Variants } from "framer-motion"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export interface ITextLink {
  name?: string
  initial?: string
  whileHover?: string
  animate?: string
  variantsArrow?: Variants
  variantsText?: Variants
  icon?: ReactNode
}

const TextLink = ({ name, variantsArrow, variantsText, icon }: ITextLink) => (
  <motion.div
    initial="rest"
    whileHover="hover"
    animate="rest"
    className="relative max-w-[200px] cursor-pointer"
  >
    <motion.div
      className="opacity-1 absolute left-0 translate-y-[-30%]"
      variants={variantsArrow}
    >
      <ArrowForwardIcon sx={{ height: 14 }} />
    </motion.div>
    <div className="flex">
      <motion.div
        className="pb-[14px]"
        variants={variantsText}
      >
        {name}
        {icon}
      </motion.div>
    </div>
  </motion.div>
)

export default TextLink
