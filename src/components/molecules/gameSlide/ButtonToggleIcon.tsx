import React, { ReactNode } from "react"
import IconArrowRight from "@components/icons/arrowRightIcon"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import { motion } from "framer-motion"
import Link from "next/link"

type TTypeButton = "submit" | "reset" | "button" | undefined
interface IProps {
  startIcon: ReactNode
  endIcon?: ReactNode
  text: string | ReactNode
  handleClick?: () => void
  className?: string
  textClassName?: string
  style?: React.CSSProperties
  type?: TTypeButton
  disabled?: boolean
  dropColor?: boolean
  href?: string
}

const ButtonToggleIcon = ({
  href,
  startIcon = <SportsEsportsOutlinedIcon />,
  endIcon = <IconArrowRight />,
  text,
  handleClick,
  className,
  textClassName,
  style,
  type = "button",
  disabled,
  dropColor
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

  const renderContent = () => (
    <motion.button
      className={`btn-icon-container flex h-10 w-full  items-center justify-center rounded-md ${className} ${
        disabled && " !bg-neutral-680"
      }`}
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
        className={`${textClassName} mx-1 min-w-[40%] font-neue-machina text-sm`}
        variants={textBtn}
      >
        {dropColor ? (
          <motion.div
            initial={{ color: "#4E5057" }}
            animate={{
              color: "#ffff",
              transition: { delay: 0.1, duration: 0.2 }
            }}
            exit={{ x: "-100vw", transition: { ease: "easeInOut" } }}
          >
            {text}
          </motion.div>
        ) : (
          text
        )}
        {/* {text} */}
      </motion.p>
      <motion.span variants={iconEnd}>{endIcon}</motion.span>
    </motion.button>
  )

  return href ? (
    <Link
      href={href || "/"}
      className="flex w-full items-center justify-center"
    >
      {renderContent()}
    </Link>
  ) : (
    renderContent()
  )
}

export default ButtonToggleIcon
