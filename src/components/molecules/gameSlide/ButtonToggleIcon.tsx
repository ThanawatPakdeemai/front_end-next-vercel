import React, { ReactNode } from "react"
import IconArrowRight from "@components/icons/arrowRightIcon"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import { motion } from "framer-motion"

type TTypeButton = "submit" | "reset" | "button" | undefined
interface IProps {
  startIcon: ReactNode
  endIcon?: ReactNode
  text: string
  handleClick?: () => void
  className?: string
  style?: React.CSSProperties
  type: TTypeButton
  disabled?: boolean
}

const ButtonToggleIcon = ({
  startIcon = <SportsEsportsOutlinedIcon />,
  endIcon = <IconArrowRight />,
  text,
  handleClick,
  className,
  style,
  type = "button",
  disabled
}: IProps) => {
  const stiffValue = 300

  const iconStart = {
    rest: {
      x: 10,
      opacity: 1
    },
    hover: {
      x: 40,
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  }

  const iconEnd = {
    rest: {
      x: -40,
      opacity: 0
    },
    hover: {
      x: -10,
      opacity: 1,
      transition: {
        durartion: 0.1,
        type: "spring",
        stiffness: stiffValue
      }
    }
  }

  const textBtn = {
    rest: {
      x: 10
    },
    hover: {
      x: -10,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: stiffValue
      }
    }
  }

  return (
    <motion.button
      className={`btn-icon-container flex h-10 w-full items-center justify-center rounded-md ${className}`}
      style={style}
      initial="rest"
      whileHover="hover"
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      <motion.span
        variants={iconStart}
        transition={{ duration: 0.1, type: "spring", stiffness: stiffValue }}
      >
        {startIcon}
      </motion.span>
      <motion.p
        className="mx-1 min-w-[40%] font-neue-machina text-sm"
        variants={textBtn}
      >
        {text}
      </motion.p>
      <motion.span variants={iconEnd}>{endIcon}</motion.span>
    </motion.button>
  )
}

export default ButtonToggleIcon
