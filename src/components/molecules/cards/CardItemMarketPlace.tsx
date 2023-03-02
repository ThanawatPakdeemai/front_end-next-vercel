import React from "react"
import { motion } from "framer-motion"
import ILogoMaster from "@components/icons/LogoMaster"
import { Chip, Typography } from "@mui/material"
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp"
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded"
import Helper from "@utils/helper"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { IMarketplaceInfoData } from "@constants/mockupMarketplace"
import { Image } from "@components/atoms/image"
import Video from "@components/atoms/Video"

interface IProp {
  cardType: "game" | "land" | "building" | "material"
  data: IMarketplaceInfoData
}

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

const CardItemMarketPlace = (props: IProp) => {
  const { cardType, data } = props
  const { copyClipboard } = Helper
  const { successToast } = useToast()

  return (
    // <Link href={`/marketplace/`}>
    <motion.div
      whileHover="hover"
      className="group relative h-fit w-[218px] cursor-pointer rounded-2xl border border-neutral-700 bg-neutral-780 p-2 hover:bg-neutral-900"
    >
      <div className="relative">
        <div className="pointer-events-auto absolute z-20 m-[5px] flex">
          {cardType === "game" ||
            (cardType === "land" && (
              <Chip
                label={data.land_data?.land_id || data.order_id}
                variant="outlined"
                size="small"
                className="pointer-events-auto w-[93px] cursor-pointer truncate uppercase"
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
                  copyClipboard("0xfd86E58bCc217B2671Ca918441685a0a3444D253")
                  successToast(MESSAGES.copy)
                }}
              />
            ))}
          {cardType === "game" && (
            <Chip
              label={data.item_amount}
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
          {cardType === "building" && (
            <Chip
              label={`${data.item_amount}/${data.item_total}`}
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
        </div>

        {/* item */}
        {data.item_data && (
          <div className="flex h-[202px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 p-6 group-hover:border-secondary-main">
            <motion.div
              transition={{ type: "spring", stiffness: 100, damping: 6 }}
              variants={imgMotion}
              className="relative flex !max-h-[182px] !w-[182px] items-center justify-center"
            >
              <Image
                src={data.item_data.image}
                alt={data.item_data.name}
                className="object-contain"
                width={data.item_data.name.includes("Bullet") ? 40 : 100}
              />
            </motion.div>
          </div>
        )}
        {/* land */}
        {data.land_data && (
          <div className="relative h-[202px] w-full overflow-hidden">
            <Video
              src={data.land_data.NFT_video}
              poster={data.land_data.NFT_image}
              className="rounded-2xl"
            />
          </div>
        )}
        {data.building_data && (
          <div className="flex h-[202px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 p-6 group-hover:border-secondary-main">
            <motion.div
              transition={{ type: "spring", stiffness: 100, damping: 6 }}
              variants={imgMotion}
              className="relative flex items-center justify-center"
            >
              <Image
                src={data.building_data.image}
                alt={data.building_data.name}
                className="h-full w-full"
                width={200}
                height={200}
              />
            </motion.div>
          </div>
        )}
      </div>
      <div className="mx-2 mt-[14px] flex items-center justify-between">
        <Typography className="text-sm uppercase text-white-default">
          {data.item_data?.name ||
            data.land_data?.name ||
            data.building_data?.name}
        </Typography>
        {data.item_data && (
          <Chip
            label={`${data.item_data && `Size ${data.item_data.item_size}`}`}
            variant="filled"
            size="small"
            className="cursor-pointer uppercase"
            color="error"
          />
        )}
        {data.building_data && (
          <Chip
            label={`${
              data.building_data && `level : ${data.building_data.level}`
            }`}
            variant="filled"
            size="small"
            className="cursor-pointer uppercase"
            color="error"
          />
        )}
      </div>
      {/* <div className="" /> */}
      <div className="my-[10px] border-b border-neutral-700 border-opacity-80" />
      <div className="mx-2 flex items-center justify-between">
        <div className="flex items-center">
          <ILogoMaster
            width="24"
            height="11"
            color="#ffff"
          />
          <Typography className="ml-[11px] text-sm uppercase text-white-default">
            {data.price}
          </Typography>
        </div>
        <Chip
          label="= ... naka amount"
          variant="outlined"
          size="small"
          className="cursor-pointer uppercase"
        />
      </div>
    </motion.div>
    // </Link>
  )
}

export default CardItemMarketPlace
