import React, { useState } from "react"
import { motion } from "framer-motion"
import ImageCustom from "@components/atoms/image/Image"
import { IMAGES } from "@constants/images"
import ButtonLink from "@components/atoms/button/ButtonLink"
import IBookReading from "@components/icons/BookReading"

interface ICardLink {
  bgMain?: string
  classNameMain?: string
  styleMain?: React.CSSProperties
  classNameSecond?: string
  styleSecond?: React.CSSProperties
  srcMain?: string
  altMain?: string
  srcSecond?: string
  altSecond?: string
  imageClassNameMain?: string
  imageStyleMain?: React.CSSProperties
  imageClassNameSecond?: string
  imageStyleSecond?: React.CSSProperties
  // eslint-disable-next-line no-undef
  iconBtn?: JSX.Element
  textBtn?: string
  href?: string
}

const CardLink = ({
  bgMain,
  classNameMain,
  styleMain,
  classNameSecond,
  styleSecond,
  srcMain = IMAGES.frontBlogBand.src,
  altMain = IMAGES.frontBlogBand.alt,
  srcSecond = IMAGES.backBlogBand.src,
  altSecond = IMAGES.backBlogBand.alt,
  imageClassNameMain,
  imageStyleMain,
  imageClassNameSecond,
  imageStyleSecond,
  iconBtn = <IBookReading />,
  textBtn = "",
  href = "/"
}: ICardLink) => {
  const [isHover, setIsHover] = useState<boolean>(false)

  const onHoverCard = () => {
    setIsHover(!isHover)
  }

  return (
    <>
      <motion.div
        className={`relative h-[218px] w-[218px] overflow-hidden rounded-3xl ${classNameMain}`}
        style={styleMain}
        onHoverStart={onHoverCard}
        onHoverEnd={onHoverCard}
      >
        <motion.div
          className={`absolute h-[218px] w-[218px] rounded-3xl bg-warning-light ${classNameSecond}`}
          whileHover={{ marginTop: "18%" }}
          transition={{
            type: "spring",
            damping: 10,
            stiffness: 150
          }}
          style={styleSecond || { backgroundColor: `${bgMain}` }}
        >
          <ImageCustom
            src={srcMain}
            alt={altMain}
            width={123}
            height={123}
            className={`absolute left-[50px] top-[35px] z-[1] ${
              isHover && "top-[-20px] scale-[1.35]"
            } ${imageClassNameMain}`}
            style={imageStyleMain || { transition: "all 0.2s ease-in" }}
            loading="eager"
            priority
          />
          <ImageCustom
            src={srcSecond}
            alt={altSecond}
            width={123}
            height={123}
            className={`absolute left-[50px] my-auto mx-0 ${
              isHover ? "top-[-15px] scale-50" : "top-[35px]"
            } ${imageClassNameSecond}`}
            style={imageStyleSecond || { transition: "0.2s" }}
            loading="eager"
            priority
          />
        </motion.div>
        <ButtonLink
          href={href}
          text={textBtn}
          icon={iconBtn}
          size="medium"
          className="button-global button-transparent absolute left-2.5 right-2.5 bottom-2.5 border border-solid border-black-300 text-primary-main"
        />
      </motion.div>
    </>
  )
}

export default CardLink
