import React from "react"
import { motion, Transition, Variants } from "framer-motion"

export interface IButtonIcon {
  type?: "square" | "circle"
  icon?: React.ReactNode
  whileHover?: string
  className?: string
  variants?: Variants | undefined
  transition?: Transition | undefined
  onClick?: () => void
}

const iconmotionDefault = {
  hover: {
    scale: 1.2,
    rotate: 17,
    ease: "easeIn",
    transition: {
      duration: 0.4,
      stiffness: 500,
      type: "spring"
    }
  }
}

const transitionDefault = { type: "spring", stiffness: 400, damping: 4 }

const ButtonIcon = ({
  type = "square",
  icon,
  whileHover,
  className,
  variants,
  transition,
  onClick
}: IButtonIcon) => {
  const typeButton = {
    "circle": "!min-w-0 w-auto h-auto rounded-full !p-4",
    "square": "!min-w-0"
  }
  return (
    <motion.div
      onClick={onClick}
      whileHover={whileHover || "hover"}
      className={`${className} ${typeButton[type]} cursor-pointer`}
    >
      <motion.div
        variants={variants || iconmotionDefault}
        transition={transition || transitionDefault}
      >
        {icon}
      </motion.div>
    </motion.div>
  )
}

export default ButtonIcon
