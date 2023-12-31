import React from "react"
import { motion } from "framer-motion"
import { Chip, Typography } from "@mui/material"
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp"
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded"
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import Link from "next/link"
import copy from "copy-to-clipboard"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { TType } from "@feature/marketplace/interfaces/IMarketService"
import { isMobile } from "@hooks/useGlobal"
// eslint-disable-next-line import/no-extraneous-dependencies
import { IGameItemData } from "@feature/gameItem/interfaces/IGameItemService"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import Helper from "@utils/helper"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const Video = dynamic(() => import("@components/atoms/Video"), {
  suspense: true,
  ssr: false
})
const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

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
  keyType?: string // "owner"
  rental?: {
    totalPeriod: number
    totalBalancePeriod: number
    totalPrice: number
    exp: Date
    owner?: string
    buyer?: string
  }
  firstData?: IGameItemData
  // | IInventoryItemList
  // IMarketDetail
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
  href,
  keyType,
  rental,
  firstData
}: IProp) => {
  const { copyClipboard, formatNumber } = Helper
  const { successToast } = useToast()

  // "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"

  const router = useRouter()
  const pathCheck = router.pathname.includes("p2p")
    ? firstData?.item_data.image
    : firstData?.img

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
    <div className="relative justify-self-center">
      <div
        className={`pointer-events-auto absolute z-20 m-[14px] mt-[18px] flex ${
          keyType && "flex-wrap"
        } gap-2`}
      >
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
        {id && !rental && (
          <Chip
            label={id}
            variant="outlined"
            size="small"
            className="pointer-events-auto z-10 w-fit cursor-pointer truncate uppercase"
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
              copy(id, {
                debug: true,
                message: successToast(MESSAGES.copy)
              })
            }}
          />
        )}
        {itemLevel && (
          <div
            className={`flex ${
              keyType ? "" : "w-[135px] justify-between sm:w-[190px]"
            } `}
          >
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
          </div>
        )}
        {percentage && (
          <Chip
            label={`${percentage} %`}
            variant="filled"
            size="small"
            className="absolute top-[110px] cursor-pointer uppercase sm:top-[160px]"
            color={handleColor()}
            icon={handleIcon()}
          />
        )}
        {rental && id && (
          <div className="flex justify-between">
            <Chip
              label={id}
              variant="outlined"
              size="small"
              className={`pointer-events-auto flex-1 ${
                keyType ? "mr-2" : "absolute left-4 top-4 z-10"
              }  w-[93px] cursor-pointer truncate uppercase`}
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
          </div>
        )}
      </div>

      <Link href={href || "/"}>
        <motion.div
          whileHover="hover"
          className="group relative h-fit w-[164px] cursor-pointer rounded-2xl
           border border-neutral-700 bg-neutral-780 p-2 hover:bg-neutral-900 sm:h-fit sm:w-[218px]"
        >
          <div className="relative">
            {itemImage && (
              <div
                className={`flex h-[148px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 sm:h-[202px] ${
                  cardType !== "naka-punk" ? "p-6" : "p-0"
                } group-hover:border-secondary-main`}
              >
                {/* mobile */}
                <motion.div
                  transition={{ type: "spring", stiffness: 100, damping: 6 }}
                  variants={cardType !== "naka-punk" ? imgMotion : undefined}
                  className="relative flex items-center justify-center sm:hidden"
                >
                  <Image
                    src={
                      itemName === "Bullet"
                        ? (pathCheck as string)
                        : itemImage.src
                    }
                    alt={itemImage.alt}
                    className={`!m-0 !h-[80px] w-auto object-contain !p-0 ${
                      cardType === "naka-punk"
                        ? "rounded-lg"
                        : cardType === "building" && "!h-[200px]"
                    }`}
                    width={itemName?.includes("Bullet") ? 40 : itemImage.width}
                    height={
                      itemName?.includes("Bullet") ? 40 : itemImage.height
                    }
                  />
                </motion.div>
                {/* destop */}
                <motion.div
                  transition={{ type: "spring", stiffness: 100, damping: 6 }}
                  variants={cardType !== "naka-punk" ? imgMotion : undefined}
                  className="relative  hidden items-center justify-center sm:block"
                >
                  <Image
                    src={
                      itemName === "Bullet"
                        ? (pathCheck as string)
                        : itemImage.src
                    }
                    // firstData.item_data?.item_data
                    // firstData.item_data.image ||
                    alt={itemImage.alt}
                    className={`object-contain ${
                      cardType === "naka-punk"
                        ? "h-full w-full rounded-lg"
                        : cardType === "building" && "image-building"
                    }`}
                    width={itemName?.includes("Bullet") ? 40 : 148}
                    height={itemName?.includes("Bullet") ? 40 : 148}
                  />
                </motion.div>
              </div>
            )}
            {/* land */}
            {itemVideo && (
              <div
                className={
                  isMobile
                    ? `h-[148px] w-[148px]`
                    : `relative h-[202px] w-full overflow-hidden ${
                        cardType === "material" && "grid content-center"
                      }`
                }
              >
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
          <div
            className={`mx-2 ${
              isMobile ? `mt-[8px]` : `mt-[14px]`
            } flex items-center justify-between`}
          >
            <Typography
              className={`${
                isMobile && `truncate`
              } truncate text-sm uppercase text-white-default`}
            >
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
            </div>
          </div>
          <div
            className={`${
              isMobile ? `my-[8px]` : `my-[10px]`
            } border-b border-neutral-700 border-opacity-80`}
          />
          {sellingType &&
            (cardType === "land" ||
              cardType === "building" ||
              cardType === "arcade-game") && (
              <Chip
                label={sellingType.title}
                variant="filled"
                size="small"
                className="mb-1 ml-2 cursor-pointer uppercase"
                color={sellingType.color || "info"}
              />
            )}
          {rental ? (
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Typography className="ml-[11px] text-sm uppercase text-neutral-500">
                    {formatNumber(rental.totalPrice as number, {
                      maximumFractionDigits: 4
                    })}{" "}
                    NAKA/DAY
                  </Typography>
                </div>
                <Chip
                  label={`= ${formatNumber(rental.totalBalancePeriod, {
                    maximumFractionDigits: 4
                  })} NAKA`}
                  variant="outlined"
                  size="small"
                  className="cursor-pointer uppercase"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Typography className="ml-[11px] text-sm uppercase text-neutral-500">
                    EXPIRE ON
                  </Typography>
                </div>
                <Chip
                  label={rental.totalPeriod}
                  variant="outlined"
                  size="small"
                  className="cursor-pointer uppercase"
                />
              </div>
            </div>
          ) : (
            <div className="mx-2 flex-wrap items-center justify-between sm:flex">
              {price && (
                <div className="flex items-center">
                  <Icomoon className="icon-Naka text-white-primary" />
                  <Typography className="ml-[11px] text-sm uppercase text-white-default">
                    {formatNumber(price as number, {
                      maximumFractionDigits: 4
                    })}
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
          )}
        </motion.div>
      </Link>
    </div>
  )
}

export default CardItemMarketPlace
