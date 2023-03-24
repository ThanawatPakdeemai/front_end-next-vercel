import React from "react"
import { useRouter } from "next/router"
import ButtonClose from "@components/atoms/button/ButtonClose"
import CopyButton from "@components/atoms/CopyButton"
import { Chip, Divider, Typography } from "@mui/material"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"
import Helper from "@utils/helper"
import { Image } from "@components/atoms/image"
import { TType } from "@feature/marketplace/interfaces/IMarketService"
import CONFIGS from "@configs/index"
import TextfieldDetailContent from "../molecules/TextfieldDetailContent"
import ChipsLink from "../molecules/ChipsLink"

interface IProp {
  type: TType
  id?: string
  token?: string | number
  title?: string
  method: "buy" | "mint"
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
  children
}: IProp) => {
  const router = useRouter()
  const { shortenString } = Helper
  const getPathnameType = router.pathname.split("/")[2]
  const handleType = () => {
    const pathMap = {
      building: "building",
      game: "game assets",
      material: "material",
      "naka-punk": "nft",
      "arcade-game": "arcade game",
      default: "land"
    }

    return pathMap[getPathnameType] || pathMap["default"]
  }

  return (
    <div className="flex flex-col gap-y-5">
      {token && (
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-[6px]">
            <Chip
              label={`TOKEN ID : ${shortenString(String(token))}`}
              size="small"
              variant="outlined"
            />
            <CopyButton
              text={token as string}
              className="!bg-neutral-780"
            />
          </div>
          <ButtonClose
            onClick={() => router.back()}
            insideClassName="!bg-error-main hover:bg-error-main"
          />
        </div>
      )}
      <Typography className="text-[46px] font-bold uppercase text-neutral-300">
        {title}
      </Typography>
      <div className="w-ful flex flex-col gap-y-6 rounded-3xl border-neutral-800 bg-neutral-780 py-7 px-[42px] uppercase">
        <div className="flex items-center gap-5">
          <Typography className="text-neutral-300">{method}</Typography>
          <Chip
            label={handleType()}
            size="small"
            color="info"
          />
        </div>
        <Divider className="!block border-[1px] border-neutral-800" />
        <TextfieldDetailContent
          type={type}
          position={position}
          itemAmount={itemAmount}
          price={price}
          count={count}
        />
        {qrCode && id && (
          <>
            <div className="flex h-[158px] w-full gap-1 rounded-lg bg-primary-main p-1">
              <div className="w-3/4">map</div>
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
            <ChipsLink id={id} />
          </>
        )}
        {durability && (
          <Typography className="text-[46px] font-bold uppercase text-neutral-300">
            {durability}
          </Typography>
        )}
        <Divider className="!block border-[1px] border-neutral-800" />
        <div>{children}</div>
      </div>
    </div>
  )
}

export default RightDetailsMarketplace
