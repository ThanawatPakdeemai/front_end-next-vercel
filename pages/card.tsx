import React, { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import AddIcon from "@mui/icons-material/Add"
import { IMAGES } from "@constants/images"
import ButtonLink from "@components/atoms/button/ButtonLink"

const CardLink = () => {
  const [isHover, setIsHover] = useState<boolean>(false)

  const onHoverCard = () => {
    setIsHover(!isHover)
  }

  return (
    <motion.div
      className="relative h-[218px] w-[218px] overflow-hidden rounded-3xl"
      onHoverStart={onHoverCard}
      onHoverEnd={onHoverCard}
    >
      <motion.div
        className="absolute h-[218px] w-[218px] rounded-3xl bg-warning-light"
        whileHover={{ marginTop: "18%" }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 150
        }}
      >
        <Image
          src={IMAGES.frontBlogBand.src}
          alt={IMAGES.frontBlogBand.alt}
          width={IMAGES.frontBlogBand.width}
          height={IMAGES.frontBlogBand.height}
          className={`absolute left-[50px] top-[35px] z-[1] ${
            isHover ? "top-[-36px] w-40" : "top-[35px"
          }`}
          style={{ transition: "all 0.2s ease-in" }}
        />
        <Image
          src={IMAGES.backBlogBand.src}
          alt={IMAGES.backBlogBand.alt}
          width={IMAGES.backBlogBand.width}
          height={IMAGES.backBlogBand.height}
          className={`absolute left-[50px] my-auto mx-0 ${
            isHover ? "left-[75px] top-4 w-[60px]" : "top-[35px]"
          }`}
          style={{ transition: "0.2s" }}
        />
      </motion.div>
      <ButtonLink
        href="/"
        text="View All"
        icon={<AddIcon />}
        size="small"
        className="button-global button-transparent absolute left-2.5 right-2.5 bottom-2.5 border border-solid border-[#01010133] text-primary-main"
      />
    </motion.div>
  )
}
export default CardLink
