import { Image } from "@components/atoms/image"
import Video from "@components/atoms/Video"
import NakaPunkStar from "@components/icons/marketplace/NakaPunkStar"
import CONFIGS from "@configs/index"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import { MetaData } from "@feature/marketplace/interfaces/INakaPung"
import { Button, Divider, Typography } from "@mui/material"
import { TSellerType } from "@feature/marketplace/interfaces/IMarketService"
import { v4 as uuidv4 } from "uuid"
import React, { useState } from "react"
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"
import useGlobal from "@hooks/useGlobal"
import dynamic from "next/dynamic"

const Gltf3dModel = dynamic(
  () => import("@feature/building/components/atoms/Gltf3dModel"),
  {
    suspense: true,
    ssr: false
  }
)

interface IProp {
  detail?: string
  image?: string
  model?: string
  children: React.ReactNode
  video?: string
  alt?: string
  poster?: string
  txHash?: string
  meta_data?: MetaData[]
  nameItem?: string
  showDetails?: boolean
  seller_type?: TSellerType
}

const CardContentDetails = ({ ...props }: IProp) => {
  const {
    children,
    detail = "-",
    image,
    model,
    alt,
    video,
    poster,
    txHash,
    meta_data,
    nameItem,
    showDetails = false,
    seller_type
  } = props
  const [open, setOpen] = useState<boolean>(false)
  const { marketType } = useGlobal()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div
      className={`h-full w-full min-w-[300px] rounded-[24px] border-[1px] border-neutral-800 bg-neutral-780 ${
        marketType &&
        (marketType === "game_item" ||
          marketType === "nft_naka_punk" ||
          marketType === "nft_avatar")
          ? "max-w-[563px]"
          : null
      } sm:h-fit`}
    >
      <div className="p-2">
        <div
          // className={`flex ${
          //   marketType === "game_item" ? `h-fit w-auto` : `h-fit w-full`
          // eslint-disable-next-line max-len
          // } content-center justify-center rounded-[24px] border-[1px] border-neutral-800 bg-neutral-900 p-2`}
          className="flex h-fit w-full content-center justify-center rounded-[24px] border-[1px] border-neutral-800 bg-neutral-900 p-2"
        >
          {marketType === "nft_land" && video && (
            <Video
              src={video as string}
              poster={poster as string}
              className="rounded-2xl"
              autoPlay
              controls
            />
          )}
          {marketType !== "nft_land" &&
            marketType !== "nft_building" &&
            image && (
              <Image
                // src="/images/not_found.webp"
                src={image as string}
                alt={alt as string}
                width={marketType === "game_item" ? 120 : 563}
                height={marketType === "game_item" ? 120 : 563}
                className={
                  (marketType === "game_item"
                    ? "m-4  rounded-2xl"
                    : "rounded-2xl") +
                  (nameItem === "Bullet" && "!h-[300px] !w-[110px]")
                }
              />
            )}
          {marketType === "nft_building" && poster && model && (
            <div className="h-[250px] w-full sm:!h-[500px] sm:!w-[500px]">
              <Gltf3dModel
                poster={poster}
                model={model}
              />
            </div>
          )}
          {meta_data && meta_data.length > 4 ? (
            <div className="grid grid-cols-2 gap-[10px]">
              {meta_data &&
                meta_data.slice(0, 3).map((item) => (
                  <div key={item.item_id}>
                    <Image
                      // src="/images/not_found.webp"
                      src={item.image as string}
                      alt={item.item_id as string}
                      width={563}
                      height={563}
                      className="rounded"
                    />
                  </div>
                ))}
              <div className="grid h-full w-full content-center items-center	justify-center rounded border-[1px] border-neutral-700 bg-neutral-780">
                <NakaPunkStar />
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                  className="h-[50px] hover:h-[58px]"
                >
                  <Typography className="text-sm text-green-lemon">
                    +{meta_data.length - 3} Nfts{" "}
                    <span className="text-neutral-200">View All</span>
                  </Typography>
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={` ${
                meta_data && meta_data.length <= 1
                  ? ""
                  : "grid grid-cols-2 gap-[10px]"
              }`}
            >
              {meta_data &&
                meta_data.map((item) => (
                  <div key={item.item_id}>
                    <Image
                      // src="/images/not_found.webp"
                      src={item.image as string}
                      alt={item.item_id as string}
                      width={563}
                      height={563}
                      className="rounded"
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      {children}
      {(seller_type === "system" && marketType !== "nft_naka_punk") ||
      showDetails ? (
        <>
          <Divider
            sx={{ width: "100%", marginBottom: "20px", marginTop: "20px" }}
            className={`${
              marketType !== "nft_naka_punk" && `hidden sm:block`
            } `}
          />
          <div className="px-8 py-6">
            <Typography className="text-sm uppercase text-black-default">
              details
            </Typography>
            <Typography className="text-sm uppercase text-neutral-600 ">
              {detail}
            </Typography>
          </div>
        </>
      ) : null}
      <ModalCustom
        open={open}
        onClose={handleClose}
        className="gap-3 rounded-[34px] p-[10px]"
        width={600}
        title={`You got ${meta_data?.length} NAKA Punks`}
      >
        <div className="grid grid-cols-5 gap-[10px]">
          {meta_data &&
            txHash &&
            meta_data.map((item) => (
              <a
                key={uuidv4()}
                href={`${CONFIGS.CHAIN.POLYGON_SCAN}/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
              >
                <div className="group relative cursor-pointer">
                  <Image
                    src={item.image as string}
                    alt={item.item_id as string}
                    width={563}
                    height={563}
                    className="rounded"
                  />
                  <div className="invisible absolute top-0 grid h-full w-full content-center justify-items-center rounded text-xs uppercase opacity-50 group-hover:visible group-hover:bg-neutral-900">
                    <RemoveRedEyeOutlinedIcon />
                    transactions
                  </div>
                </div>
              </a>
            ))}
        </div>
      </ModalCustom>
    </div>
  )
}

export default CardContentDetails
