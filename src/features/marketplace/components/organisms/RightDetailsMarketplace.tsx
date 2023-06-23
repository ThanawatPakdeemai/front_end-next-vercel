import React from "react"
import { useRouter } from "next/router"
import ButtonClose from "@components/atoms/button/ButtonClose"
import CopyButton from "@components/atoms/CopyButton"
import { Chip, Divider, Typography } from "@mui/material"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"
import { Image } from "@components/atoms/image"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import CONFIGS from "@configs/index"
import MiniMap from "@feature/map/components/organisms/MiniMap"
import RedemptionCode from "@components/molecules/RedemptionCode"
import Video from "@components/atoms/Video"
import TextfieldDetailContent from "../molecules/TextfieldDetailContent"
import ChipsLink from "../molecules/ChipsLink"

interface IProp {
  type: TNFTType
  id?: string
  token?: string | number
  title?: string
  method?: "buy" | "mint"
  position?: {
    x: string
    y: string
  }
  itemAmount?: number
  price?: number
  qrCode?: string
  durability?: string
  count?: {
    helperText?: string
    label?: string
    min: number
    max: number
    count: number
  }
  children?: React.ReactNode
  redemption?: boolean
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
  checkRedreemMobile?: boolean
  image?: string
  video?: string
  showListMintItem?: React.ReactNode
  transferBox?: React.ReactNode
}

const RightDetailsMarketplace = ({
  type,
  id,
  token,
  title,
  method,
  position,
  itemAmount,
  price,
  qrCode,
  durability,
  count,
  children,
  redemption,
  sellingType,
  checkRedreemMobile = true,
  image,
  video,
  showListMintItem,
  transferBox
}: IProp) => {
  const router = useRouter()
  const getPathnameType = router.pathname.includes("inventory")
    ? router.asPath.split("/")[3]
    : router.asPath.split("/")[2]

  const handleType = () => {
    const pathMap = {
      land: "land",
      building: "building",
      game: "game assets",
      material: "material",
      "naka-punk": "nft",
      "arcade-game": "arcade game",
      "avatar-reef": "nft",
      default: "nft"
    }
    return pathMap[getPathnameType] || pathMap["default"]
  }

  const handleRouter = () => {
    if (router.asPath.includes("inventory")) {
      router.push("/marketplace/inventory")
    } else {
      router.back()
    }
  }

  return (
    <div className="flex w-full max-w-[563px] flex-col">
      {token && (
        <div className="flex w-fit flex-row-reverse items-center sm:w-full sm:flex-row">
          <div className="flex gap-[6px]">
            <Chip
              label={`TOKEN ID : ${String(token)}`}
              size="small"
              variant="outlined"
            />
            <CopyButton
              text={token as string}
              className="!bg-neutral-780"
            />
          </div>
          <ButtonClose
            onClick={handleRouter}
            insideClassName="!bg-error-main hover:bg-error-main"
          />
        </div>
      )}
      <Typography className="block text-[46px] font-bold uppercase text-neutral-300">
        {title}
      </Typography>

      <div className="flex w-full flex-col rounded-xl border-neutral-800 bg-neutral-780 p-1 pb-6 uppercase">
        <div className="flex h-[320px] w-full items-center justify-center rounded-lg bg-neutral-900 sm:hidden">
          {method === "mint" && showListMintItem ? (
            <main>{showListMintItem}</main>
          ) : (
            <Video
              src={video as string}
              poster={image as string}
              className="h-full rounded-2xl object-cover"
              autoPlay
              controls={false}
            />
          )}
        </div>
        {transferBox ? (
          <div className="block w-full flex-col py-2 sm:hidden">
            <main>{transferBox}</main>
          </div>
        ) : undefined}
        <Divider className="mt-1 !block border-[1px] border-neutral-800 sm:!hidden" />

        <div className="flex flex-col gap-y-4 px-4 pt-6">
          <div className="flex items-center gap-4">
            <Typography className="text-neutral-300">{method}</Typography>
            <Chip
              label={handleType()}
              size="small"
              color="info"
            />
            {sellingType && (
              <Chip
                label={sellingType.title}
                variant="filled"
                size="small"
                className="cursor-pointer uppercase"
                color={sellingType.color || "info"}
              />
            )}
          </div>
          <Divider
            className={`border-[1px] border-neutral-800 ${
              !method && (type === "nft_avatar" || type === "nft_game")
                ? "!hidden"
                : "!block"
            }`}
          />
          {!method &&
          (type === "nft_avatar" || type === "nft_game") ? undefined : (
            <TextfieldDetailContent
              type={type}
              position={position}
              itemAmount={itemAmount}
              price={price}
              count={count}
              isUSD={method === "mint" && type !== "nft_avatar"}
            />
          )}
          {qrCode && id && position && (
            <>
              <div className="flex h-[158px] w-full gap-1 rounded-lg bg-primary-main p-1">
                <div className="w-3/4">
                  <MiniMap
                    pos={position}
                    className="rounded"
                  />
                </div>
                <div className="relative flex w-1/4 items-center justify-center rounded bg-neutral-800">
                  <Image
                    src={qrCode}
                    alt={`QRCode ${token}`}
                    width={80}
                    height={80}
                  />
                  <a
                    href={`${CONFIGS.BASE_URL.NAKAVERSE}/nft-land/${id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Chip
                      className="absolute bottom-0 right-0 cursor-pointer"
                      label="LAND INFO"
                      color="primary"
                      size="small"
                      deleteIcon={
                        <ArrowOutwardOutlinedIcon sx={{ height: 14 }} />
                      }
                      onDelete={() => null}
                    />
                  </a>
                </div>
              </div>
              <ChipsLink
                id={id}
                position={position}
              />
            </>
          )}
          {durability && (
            <Typography className="text-[46px] font-bold uppercase text-neutral-300">
              {durability}
            </Typography>
          )}
          <Divider
            className={`border-[1px] border-neutral-800 ${
              !method && (type === "nft_avatar" || type === "nft_game")
                ? "!hidden"
                : "!block"
            }`}
          />
        </div>
        <main className="h-auto w-full px-4">{children}</main>
      </div>
      {redemption && checkRedreemMobile && <RedemptionCode />}
      <div className="flex flex-row items-center" />
    </div>
  )
}

export default RightDetailsMarketplace
