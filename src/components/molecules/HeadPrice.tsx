import React, { memo, useState } from "react"
import { Image } from "@components/atoms/image"
import { Box, Typography } from "@mui/material"
import { IMAGES } from "@constants/images"
import { siteInfo } from "@configs/sites"
import Helper from "@utils/helper"
import dayjs from "dayjs"
import CircleNakaIcon from "@components/icons/CircleNakaIcon"
import ButtonClose from "@components/atoms/button/ButtonClose"
import { BUY_NAKA_MENU } from "@configs/buynaka"
import Link from "next/link"
import CONFIGS from "@configs/index"
import { useNakaPriceProvider } from "@providers/NakaPriceProvider"
import { ModalCustom } from "./Modal/ModalCustom"
import TabMenu from "./TabMenu"

interface IProp {
  showRate?: boolean
  showHigh?: boolean
  showLow?: boolean
  showTime?: boolean
  showLast?: boolean
}

const HeadPrice = ({
  showLast = true,
  showRate = true,
  showHigh = true,
  showLow = true,
  showTime = true
}: IProp) => {
  // const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)
  const { price } = useNakaPriceProvider()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box className="relative mb-2 flex w-[100%] flex-row flex-wrap rounded-b-lg bg-neutral-800 sm:mb-0 lg:h-[30px] lg:flex-nowrap">
      <Typography className="text-black-01 flex h-full w-full max-w-[150px] flex-1 items-center justify-center whitespace-nowrap bg-secondary-main md:absolute md:rounded-bl-lg  lg:static lg:w-[15%] lg:flex-none">
        <span className="font-neue-machina text-sm uppercase text-primary-main">
          TOKENS INFO =
        </span>
      </Typography>
      <Box
        component="div"
        className="flex flex-[1_1_100%] items-center justify-center font-neue-machina text-sm uppercase sm:ml-4 lg:flex-none"
      >
        <span className="xs:block mr-2 hidden text-black-default">
          NAKA Contract{" "}
        </span>
        <div className="flex flex-row items-center">
          <span className="mr-1 text-purple-primary">Polygon : </span>
          {siteInfo.contract && (
            <Link
              href={`${CONFIGS.CHAIN.POLYGON_SCAN}/address/${CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT}`}
              target="_blank"
            >
              <Typography
                paragraph
                component="span"
                variant="body1"
                onClick={() =>
                  Helper.copyClipboard(CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT)
                }
                className="mt-4 cursor-pointer font-neue-machina text-sm uppercase text-purple-primary"
              >
                {Helper.textWithDots(CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT, 8)}
              </Typography>
            </Link>
          )}
        </div>
      </Box>
      {price ? (
        <Box className="flex w-full flex-wrap items-center justify-center md:px-[170px] lg:ml-auto lg:w-auto lg:flex-nowrap lg:px-0">
          {showTime && (
            <Typography
              variant="body1"
              className="mr-2 font-neue-machina text-sm text-black-default sm:flex-none"
            >
              {dayjs(price.time).format("h:mm A")} {price.symbol}{" "}
            </Typography>
          )}
          {showLast && (
            <Typography
              variant="body1"
              className="mr-2 font-neue-machina text-sm text-black-default sm:flex-none"
            >
              {Number(price.changeRate) > 0 ? (
                <span className="flex items-center font-neue-machina text-sm uppercase text-green-card">
                  {price.last}
                </span>
              ) : (
                <span className="flex items-center justify-center font-neue-machina text-sm uppercase text-red-default">
                  {price.last}
                </span>
              )}
            </Typography>
          )}
          {showRate && (
            <Typography
              variant="body1"
              className="flex items-center justify-center lg:flex-none"
            >
              {Number(price.changeRate) > 0 ? (
                <span className="flex items-center font-neue-machina text-sm uppercase text-green-card">
                  +{(Number(price.changeRate) * 100).toFixed(2)}%
                </span>
              ) : (
                <span className="flex items-center justify-center font-neue-machina text-sm uppercase text-red-default">
                  {(Number(price.changeRate) * 100).toFixed(2)}%
                </span>
              )}
            </Typography>
          )}
          {showHigh && (
            <Typography
              variant="body1"
              className="mx-3 flex items-center justify-center lg:flex-none"
            >
              <span className="font-neue-machina text-sm uppercase text-black-default">
                24h High{" "}
              </span>
              <span className="ml-2 font-neue-machina text-sm uppercase text-black-default">
                {price.high}
              </span>
            </Typography>
          )}
          {showLow && (
            <Typography
              variant="body1"
              className="flex items-center justify-center lg:flex-none"
            >
              <span className="font-neue-machina text-sm uppercase text-black-default">
                24h Low{" "}
              </span>
              <span className="ml-2 font-neue-machina text-sm uppercase text-black-default">
                {price.low}
              </span>
            </Typography>
          )}
          <button
            type="button"
            className="absolute top-0 right-0 z-[51] m-auto flex w-full max-w-[150px] flex-row items-center justify-center bg-error-main sm:h-[100%] sm:w-[150px] sm:rounded-br-lg lg:relative lg:right-auto lg:top-auto lg:h-[30px] lg:w-[150px] lg:justify-evenly xl:m-0 xl:ml-4"
            onClick={handleOpen}
          >
            <div className="font-neue-machina text-sm uppercase text-white-primary">
              BUY NAKA
            </div>
            <Image
              src={IMAGES.nakaLogoMaster.src}
              width={IMAGES.nakaLogoMaster.width}
              height={IMAGES.nakaLogoMaster.height}
              alt={IMAGES.nakaLogoMaster.alt}
            />
          </button>
        </Box>
      ) : null}
      {/* <div className="mx-3 w-[100%] flex-row justify-between lg:flex"></div> */}
      <ModalCustom
        open={open}
        onClose={handleClose}
        className="gap-3 rounded-[34px] p-[10px]"
        width={400}
      >
        <>
          <Box
            className="flex items-center rounded-lg bg-neutral-800 pl-5"
            sx={{ height: "54px" }}
          >
            <div className="flex flex-1 flex-row items-center">
              <CircleNakaIcon />
              <Typography className="pl-[15px] uppercase text-neutral-300">
                BUY NAKA
              </Typography>
            </div>
            <ButtonClose onClick={handleClose} />
          </Box>
          {BUY_NAKA_MENU.map((ele) => (
            <TabMenu
              key={ele.title}
              icon={ele.icon}
              text={ele.title}
              link={ele.link}
              className="mt-4"
            />
          ))}
        </>
      </ModalCustom>
    </Box>
  )
}

export default memo(HeadPrice)
