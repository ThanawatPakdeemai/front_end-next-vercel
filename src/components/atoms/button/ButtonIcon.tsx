import React from "react"
import { motion, Transition, Variants } from "framer-motion"

export interface IButtonIcon {
  type?: "square" | "circle"
  icon?: React.ReactNode
  whileHover?: string
  className?: string
  variants?: Variants | undefined
  transition?: Transition | undefined
}

const ButtonIcon = ({
  type = "square",
  icon,
  whileHover,
  className,
  variants,
  transition
}: IButtonIcon) => {
  const typeButton = {
    "circle": "!min-w-0 w-auto h-auto rounded-full !p-4",
    "square": "!min-w-0"
  }
  return (
    <div>
      <motion.div
        whileHover={whileHover}
        className={`${className} ${typeButton[type]}`}
      >
        <motion.div
          variants={variants}
          transition={transition}
        >
          {icon}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ButtonIcon
