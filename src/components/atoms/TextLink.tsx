import React, { ReactNode } from "react"
import { motion, Variants } from "framer-motion"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"

export interface ITextLink {
  name?: string
  initial?: string
  whileHover?: string
  animate?: string
  variantsArrow?: Variants
  variantsText?: Variants
  icon?: ReactNode
  arrow?: boolean
  arrowHeight?: number
  className?: string
  onClick?: () => void
}

const TextLink = ({
  name,
  variantsArrow,
  variantsText,
  icon,
  arrow = true,
  className,
  arrowHeight,
  onClick
}: ITextLink) => {
  const arrowMotion = {
    rest: { opacity: 0, ease: "easeOut", duration: 0.2, type: "spring" },
    hover: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        type: "spring",
        ease: "easeIn"
      }
    }
  }

  const textMotion = {
    visible: {
      scale: 0.8,
      transition: { delay: 0.4 }
    },
    rest: {
      color: "#98A0B5",
      x: 0,
      transition: {
        duration: 2,
        type: "spring",
        stiffness: 300
      }
    },
    hover: {
      color: "#fff",
      x: 30,
      transition: {
        duration: 0.4,
        stiffness: 300,
        type: "spring"
      }
    }
  }

  const iconEnd = {
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

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative max-w-[200px] cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        className="opacity-1 absolute left-0 translate-y-[-30%]"
        variants={variantsArrow || arrowMotion}
      >
        {arrow ? (
          <ArrowForwardIcon sx={{ height: arrowHeight || 14 }} />
        ) : (
          <></>
        )}
      </motion.div>
      <div className="flex max-w-[120px]">
        <motion.div
          className={`pb-[14px]  ${className}`}
          variants={variantsText || textMotion}
        >
          {name}
          <motion.span variants={iconEnd}>
            {icon || <ArrowOutwardOutlinedIcon sx={{ height: 14 }} />}
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default TextLink
