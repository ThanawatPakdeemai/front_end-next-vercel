import React, { useState } from "react"
import { motion } from "framer-motion"
import { Image } from "@components/atoms/image"
import { IMAGES } from "@constants/images"
import ButtonLink from "@components/atoms/button/ButtonLink"
import IBookReading from "@components/icons/BookReading"
import { useRouter } from "next/router"

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
  onClick?: () => void
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
  href = "/",
  onClick
}: ICardLink) => {
  const router = useRouter()
  const [isHover, setIsHover] = useState<boolean>(false)

  const onHoverCard = () => {
    setIsHover(!isHover)
  }

  const cardLinkMotion = {
    rest: {
      // scale: 0.5,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 150
      }
    },
    hover: {
      // scale: 1.1,
      ease: "easeIn",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 150
      }
    }
  }

  const slideBottomMotion = {
    rest: {
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.4
      }
    },
    hover: {
      y: 40,
      scale: 1,
      ease: "easeIn",
      transition: {
        type: "spring",
        duration: 0.4
      }
    }
  }

  const zoomInMotion = {
    rest: {
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.4,
        stiffness: 400,
        damping: 5
      }
    },
    hover: {
      scale: 1.2,
      ease: "easeIn",
      transition: {
        type: "spring",
        duration: 0.4,
        stiffness: 400,
        damping: 5
      }
    }
  }

  const zoomOutMotion = {
    rest: {
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.4
      }
    },
    hover: {
      scale: 0.5,
      ease: "easeIn",
      transition: {
        type: "spring",
        duration: 0.4
      }
    }
  }

  return (
    <>
      <motion.div
        className={`card-link relative h-[26.625vw] max-h-[218px] w-full overflow-hidden rounded-3xl ${classNameMain}`}
        style={styleMain}
        onHoverStart={onHoverCard}
        onHoverEnd={onHoverCard}
      >
        <motion.div
          className="md card-link absolute flex h-full w-full flex-col items-center justify-center rounded-3xl lg:h-[218px] xl:w-[218px]"
          style={styleSecond || { backgroundColor: `${bgMain}` }}
          whileHover="hover"
          variants={cardLinkMotion}
          initial="rest"
          animate="rest"
        >
          <motion.div
            className={`image--bg absolute h-full w-full rounded-3xl ${classNameSecond}`}
            style={styleSecond || { backgroundColor: `${bgMain}` }}
            variants={slideBottomMotion}
          />
          <motion.div
            className="image--object absolute flex h-full w-full flex-col items-center justify-center pb-[48px]"
            style={styleSecond || { backgroundColor: `${bgMain}` }}
            variants={zoomInMotion}
          >
            <Image
              src={srcMain}
              alt={altMain}
              width={123}
              height={123}
              className={`absolute z-[1] max-w-[80px] md:max-w-[120px] ${imageClassNameMain}`}
              style={imageStyleMain || { transition: "all 0.2s ease-in" }}
              loading="eager"
              priority
            />
          </motion.div>
          <motion.div
            className="image--objectBg absolute flex h-full w-full flex-col items-center justify-center pb-[48px]"
            style={styleSecond || { backgroundColor: `${bgMain}` }}
            variants={zoomOutMotion}
          >
            <Image
              src={srcSecond}
              alt={altSecond}
              width={123}
              height={123}
              className={`md:max-w-[120px absolute mx-0 my-auto max-w-[80px] ${imageClassNameSecond}`}
              style={imageStyleSecond || { transition: "0.2s" }}
              loading="eager"
              priority
            />
          </motion.div>
          <ButtonLink
            href={href}
            onClick={() => {
              onClick ? onClick() : router.push(href)
            }}
            text={textBtn}
            icon={iconBtn}
            size="medium"
            className="button-global button-transparent absolute bottom-2.5 left-2.5 right-2.5 !h-[38px] border border-solid border-black-300 text-primary-main lg:left-0 lg:mx-2 lg:!min-w-[134px] xl:left-2.5  xl:!min-w-[154px]"
            stroke="#010101"
          />
        </motion.div>
      </motion.div>
    </>
  )
}

export default CardLink
