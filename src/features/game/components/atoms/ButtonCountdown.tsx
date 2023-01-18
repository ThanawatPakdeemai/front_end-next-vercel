import RoomListBox from "@components/molecules/roomList/RoomListBox"
import { motion } from "framer-motion"
import { ReactNode, memo } from "react"

interface IProp {
  handleClick: () => void
  text?: ReactNode | string
  className?: string
  time?: boolean
  endTime?: string
  endIcon?: ReactNode
}
const ButtonCountdown = ({
  handleClick,
  text,
  endTime,
  className,
  endIcon,
  time = false
}: IProp) => {
  const stiffValue = 300

  const iconStart = {
    rest: {
      x: 0,
      opacity: 1
    },
    hover: {
      x: -10,
      opacity: 1,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  }

  const textBtn = {
    rest: {
      x: 0
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
    <>
      <motion.p
        className={`mr-3 w-fit font-neue-machina  ${
          time ? " p-2 text-xl text-neutral-700" : "text-sm"
        }`}
        variants={textBtn}
      >
        {time ? (
          <RoomListBox
            type="timer"
            timer={{
              time: new Date(),
              onExpire: () => null
            }}
            color="secondary"
            shade="main"
            borderColor="border-secondary-main"
          />
        ) : (
          text ?? ""
        )}
      </motion.p>
      <motion.button
        variants={iconStart}
        className={`btn-icon-container m-auto mt-5 flex h-10 w-full items-center justify-center md:mt-0 ${className}`}
        initial="rest"
        whileHover="hover"
        type="button"
        onClick={handleClick}
      >
        {endIcon ?? ""}
      </motion.button>
    </>
  )
}
export default memo(ButtonCountdown)
