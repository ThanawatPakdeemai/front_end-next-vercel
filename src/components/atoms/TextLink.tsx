import React, { ReactNode } from "react"
import { motion, Variants } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

export interface ITextLink {
  name?: string | null
  initial?: string
  whileHover?: string
  animate?: string
  variantsArrow?: Variants
  variantsText?: Variants
  icon?: ReactNode | null
  arrow?: boolean
  className?: string
  onClick?: () => void
  href?: string
  target?: string
  active?: boolean
}

const TextLink = ({
  name,
  variantsArrow,
  variantsText,
  icon,
  arrow = true,
  className,
  onClick,
  href,
  target,
  active
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

  const renderButton = () => (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate={active ? "hover" : "rest"}
      className="relative max-w-[200px] cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        className="opacity-1 icon-arrow__start absolute left-0 top-[2px] translate-y-[-30%] transition-all"
        variants={variantsArrow || arrowMotion}
      >
        {arrow ? (
          <Icomoon className="icon-Link-out text-[rgb(152, 160, 181)]" />
        ) : (
          <></>
        )}
      </motion.div>
      <div className="text-link__text-wrapper flex max-w-[120px] text-center">
        <motion.div
          className={`flex items-center pb-[14px] ${className}`}
          variants={variantsText || textMotion}
        >
          {name}
          {icon && (
            <motion.span
              variants={iconEnd}
              className="icon-arrow__end"
            >
              {icon || <Icomoon className="icon-Link-out" />}
            </motion.span>
          )}
        </motion.div>
      </div>
    </motion.div>
  )

  return href ? (
    <Link
      href={href}
      target={target}
    >
      {renderButton()}
    </Link>
  ) : (
    renderButton()
  )
}

export default TextLink
