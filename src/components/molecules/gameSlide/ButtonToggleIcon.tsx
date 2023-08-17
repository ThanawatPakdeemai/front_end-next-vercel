import React, { ReactNode } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

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
  startIcon = <Icomoon className="icon-Joystick text-[22px]" />,
  endIcon = <Icomoon className="icon-Full-Arrow-Right text-[22px]" />,
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
      className={`btn-icon-container flex h-10 w-full  items-center justify-center gap-[18px] rounded-md ${className} ${
        disabled && " !bg-neutral-680"
      }`}
      style={style}
      initial="rest"
      whileHover="hover"
      type={type}
      onClick={handleClick}
      disabled={disabled}
      aria-label="button-toggle-icon"
    >
      <motion.span
        variants={iconStart}
        transition={{ duration: 0.1, type: "spring", stiffness: stiffValue }}
        className="text-[24px]"
      >
        {startIcon}
      </motion.span>
      <motion.p
        className={`${textClassName} whitespace-nowrap font-neue-machina text-sm`}
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
      <motion.span
        variants={iconEnd}
        className="text-[24px]"
      >
        {endIcon}
      </motion.span>
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
