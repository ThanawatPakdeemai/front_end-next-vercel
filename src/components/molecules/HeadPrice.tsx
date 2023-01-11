import React, { memo, useEffect, useState } from "react"
import { Image } from "@components/atoms/image"
import { IPointCurrent } from "@feature/home/interfaces/IHomeService"
import { Box, Typography } from "@mui/material"
import { getPriceCurrent } from "src/features/home/containers/services/home.service"
import { IMAGES } from "@constants/images"
import { siteInfo } from "@configs/sites"
import Helper from "@utils/helper"
import dayjs from "dayjs"
import CircleNakaIcon from "@components/icons/CircleNakaIcon"
import ButtonClose from "@components/atoms/button/ButtonClose"
import { BUY_NAKA_MENU } from "@configs/buynaka"
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
  const [price, setPrice] = useState<IPointCurrent>()
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const getPrice = async () => {
    const prices = await getPriceCurrent()
    if (prices) {
      setPrice(prices.data)
    }
  }

  useEffect(() => {
    getPrice()
  }, [])

  return (
    <Box className="flex h-[30px] w-[100%]  flex-row justify-between rounded-b-lg bg-neutral-800">
      <Typography className="text-black-01 flex w-[15%] items-center justify-center rounded-bl-lg  bg-secondary-main">
        <span className="font-neue-machina text-sm uppercase text-primary-main">
          TOKENS INFO =
        </span>
      </Typography>
      <div className="mx-3 flex w-[100%] flex-row justify-between">
        <Box
          component="div"
          className="flex items-center font-neue-machina text-sm uppercase"
        >
          <span className="mr-2 text-black-default">NAKA Contract </span>
          <div className="flex flex-row items-center">
            <span className="mr-1 text-purple-primary">Polygon : </span>
            {siteInfo.contract && (
              <Typography
                paragraph
                component="span"
                variant="body1"
                onClick={() => Helper.copyClipboard(siteInfo.contract)}
                className="mt-4 cursor-pointer font-neue-machina text-sm uppercase text-purple-primary"
              >
                {Helper.textWithDots(siteInfo.contract, 8)}
              </Typography>
            )}
          </div>
        </Box>
        {price ? (
          <Box className="flex items-center justify-center">
            {showTime && (
              <Typography
                variant="body1"
                className="mr-2 font-neue-machina text-sm text-black-default"
              >
                {dayjs(price.time).format("h:mm A")} {price.symbol}{" "}
              </Typography>
            )}
            {showLast && (
              <Typography
                variant="body1"
                className="mr-2 font-neue-machina text-sm text-black-default"
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
                className="flex items-center justify-center"
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
                className="mx-3 flex items-center justify-center"
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
                className="flex items-center justify-center "
              >
                <span className="font-neue-machina text-sm uppercase text-black-default">
                  24h Low{" "}
                </span>
                <span className="ml-2 font-neue-machina text-sm uppercase text-black-default">
                  {price.low}
                </span>
              </Typography>
            )}
          </Box>
        ) : null}
      </div>
      <button
        type="button"
        className="z-[51] flex w-[15%] flex-row items-center justify-evenly rounded-br-lg bg-error-main "
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
