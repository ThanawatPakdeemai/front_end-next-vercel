import React from "react"
import { motion } from "framer-motion"
import ILogoMaster from "@components/icons/LogoMaster"
import { Chip, Typography } from "@mui/material"
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp"
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded"
import Helper from "@utils/helper"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { Image } from "@components/atoms/image"
import Video from "@components/atoms/Video"
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import Link from "next/link"
import { TType } from "@feature/marketplace/interfaces/IMarketService"

// motion
const imgMotion = {
  visible: {
    scale: 0.5,
    transition: { delay: 2.8 }
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
    scale: 1.2,
    rotate: 10,
    ease: "easeIn"
  }
}

interface IProp {
  cardType: TType
  id?: string
  itemAmount?: number
  itemTotal?: number
  itemImage?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  itemVideo?: {
    src: string
    poster: string
  }
  itemName?: string
  itemSize?: string
  itemLevel?: string | number
  percentage?: number
  sellingType?: {
    title?: string
    color?:
      | "default"
      | "info"
      | "primary"
      | "secondary"
      | "error"
      | "success"
      | "warning"
  }
  price?: number
  nakaPrice?: number
  href?: string
}

const CardItemMarketPlace = ({
  cardType,
  id,
  itemAmount,
  itemTotal,
  itemImage,
  itemVideo,
  itemName,
  itemSize,
  itemLevel,
  percentage,
  sellingType,
  price,
  nakaPrice,
  href
}: IProp) => {
  const { copyClipboard, formatNumber } = Helper
  const { successToast } = useToast()
  // "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
  const handleColor = () => {
    if (percentage)
      switch (true) {
        case percentage >= 80:
          return "success"
        case percentage >= 40:
          return "warning"
        default:
          return "error"
      }
  }

  const handleIcon = () => {
    if (percentage)
      switch (true) {
        case percentage >= 80:
          return <SentimentSatisfiedAltIcon sx={{ color: "#3DCD95" }} />
        case percentage >= 40:
          return <SentimentDissatisfiedIcon sx={{ color: "#E1D35A" }} />
        default:
          return <SentimentVeryDissatisfiedIcon sx={{ color: "#F42728" }} />
      }
  }

  return (
    <div className="relative">
      {id && (
        <Chip
          label={id}
          variant="outlined"
          size="small"
          className="pointer-events-auto absolute left-4 top-4 z-10 w-[93px] cursor-pointer truncate uppercase"
          deleteIcon={
            <ContentCopySharpIcon
              sx={{
                width: 16,
                height: 16
              }}
              className="pb-[2px] !text-neutral-400"
            />
          }
          onDelete={() => {
            copyClipboard(id)
            successToast(MESSAGES.copy)
          }}
        />
      )}
      <Link href={href || "/"}>
        <motion.div
          whileHover="hover"
          className="group relative h-fit w-[218px] cursor-pointer rounded-2xl border border-neutral-700 bg-neutral-780 p-2 hover:bg-neutral-900"
        >
          <div className="relative">
            <div className="pointer-events-auto absolute z-20 m-[5px] flex">
              {itemAmount && (
                <Chip
                  label={`${itemAmount}${itemTotal ? ` / ${itemTotal}` : ""}`}
                  variant="outlined"
                  size="small"
                  className="ml-1 cursor-pointer uppercase"
                  icon={
                    <GridViewRoundedIcon
                      sx={{
                        width: 16,
                        height: 16
                      }}
                      className="pb-[2px] !text-neutral-400"
                    />
                  }
                />
              )}
              {itemLevel && percentage && (
                <div className="flex w-[190px] justify-between">
                  <Chip
                    label={`LV. : ${itemLevel}`}
                    variant="outlined"
                    size="small"
                    className="cursor-pointer uppercase"
                    icon={
                      <GridViewRoundedIcon
                        sx={{
                          width: 16,
                          height: 16
                        }}
                        className="pb-[2px] !text-neutral-400"
                      />
                    }
                  />
                  <Chip
                    label={`${percentage} %`}
                    variant="filled"
                    size="small"
                    className="cursor-pointer uppercase"
                    color={handleColor()}
                    icon={handleIcon()}
                  />
                </div>
              )}
            </div>

            {itemImage && (
              <div
                className={`flex h-[202px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 ${
                  cardType !== "naka-punk" ? "p-6" : "p-0"
                } group-hover:border-secondary-main`}
              >
                <motion.div
                  transition={{ type: "spring", stiffness: 100, damping: 6 }}
                  variants={cardType !== "naka-punk" ? imgMotion : undefined}
                  className="relative flex items-center justify-center"
                >
                  <Image
                    src={itemImage.src}
                    alt={itemImage.alt}
                    className={`object-contain ${
                      cardType === "naka-punk"
                        ? "rounded-lg"
                        : cardType === "building" && "image-building"
                    }`}
                    width={itemImage.width}
                    height={itemImage.height}
                  />
                </motion.div>
              </div>
            )}
            {/* land */}
            {itemVideo && (
              <div className="relative h-[202px] w-full overflow-hidden">
                <Video
                  src={itemVideo.src}
                  poster={itemVideo.poster}
                  className={`rounded-2xl ${
                    cardType === "avatar-reef"
                      ? "h-full w-full object-cover"
                      : ""
                  }`}
                />
              </div>
            )}
          </div>
          <div className="mx-2 mt-[14px] flex items-center justify-between">
            <Typography className="text-sm uppercase text-white-default">
              {itemName}
            </Typography>
            <div className="flex flex-col justify-end gap-2">
              {itemSize && (
                <Chip
                  label={`Size ${itemSize}`}
                  variant="filled"
                  size="small"
                  className="cursor-pointer uppercase"
                  color="error"
                />
              )}

              {sellingType &&
                (cardType === "land" ||
                  cardType === "building" ||
                  cardType === "arcade-game") && (
                  <Chip
                    label={sellingType.title}
                    variant="filled"
                    size="small"
                    className="cursor-pointer uppercase"
                    color={sellingType.color || "info"}
                  />
                )}
            </div>
          </div>
          <div className="my-[10px] border-b border-neutral-700 border-opacity-80" />
          <div className="mx-2 flex items-center justify-between">
            {price && (
              <div className="flex items-center">
                <ILogoMaster
                  width="24"
                  height="11"
                  color="#ffff"
                />
                <Typography className="ml-[11px] text-sm uppercase text-white-default">
                  {formatNumber(price as number, { maximumFractionDigits: 4 })}
                </Typography>
              </div>
            )}
            {nakaPrice && (
              <Chip
                label={`= ${formatNumber(nakaPrice, {
                  maximumFractionDigits: 4
                })} usd`}
                variant="outlined"
                size="small"
                className="cursor-pointer uppercase"
              />
            )}
          </div>
        </motion.div>
      </Link>
    </div>
  )
}

export default CardItemMarketPlace
