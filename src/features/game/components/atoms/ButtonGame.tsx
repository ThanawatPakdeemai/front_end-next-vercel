import { motion } from "framer-motion"
import { ReactNode, memo } from "react"

interface IProp {
  startIcon: ReactNode
  handleClick: () => void
  text: ReactNode | string
  className?: string
}
const ButtonGame = ({ startIcon, handleClick, text, className }: IProp) => {
  const stiffValue = 300

  const iconStart = {
    rest: {
      x: 15,
      opacity: 1
    },
    hover: {
      x: 20,
      opacity: 1,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  }

  const textBtn = {
    rest: {
      x: 10
    },
    hover: {
      x: 15,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: stiffValue
      }
    }
  }

  return (
    <>
      <motion.button
        className={`btn-icon-container flex h-10 w-full items-center ${className}`}
        initial="rest"
        whileHover="hover"
        type="button"
        onClick={handleClick}
      >
        <motion.span
          variants={iconStart}
          transition={{ duration: 0.1, type: "spring", stiffness: stiffValue }}
        >
          {startIcon}
        </motion.span>
        <motion.div
          className="mr-3 w-full font-neue-machina text-sm"
          variants={textBtn}
        >
          {text}
        </motion.div>
      </motion.button>
    </>
  )
}
export default memo(ButtonGame)
