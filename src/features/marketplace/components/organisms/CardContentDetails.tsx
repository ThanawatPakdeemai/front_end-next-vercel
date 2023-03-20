import { Image } from "@components/atoms/image"
import Video from "@components/atoms/Video"
import NakaPunkStar from "@components/icons/marketplace/NakaPunkStar"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import { MetaData } from "@feature/marketplace/interfaces/INakaPung"
import { Button, Divider, Typography } from "@mui/material"
import React, { useState } from "react"
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"

interface IProp {
  detail?: string
  image?: string
  children: React.ReactNode
  video?: string
  alt?: string
  poster?: string
  meta_data?: MetaData[]
}

const CardContentDetails = ({ ...props }: IProp) => {
  const { children, detail = "-", image, alt, video, poster, meta_data } = props
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div className="h-fit w-[563px] rounded-[24px] border-[1px] border-neutral-800 bg-neutral-780">
      <div className="p-2">
        <div className="h-fit w-full content-center justify-center rounded-[24px] border-[1px] border-neutral-800 bg-neutral-900 p-2">
          {video && (
            <Video
              src={video as string}
              poster={poster as string}
              className="rounded-2xl"
            />
          )}
          {image && (
            <Image
              // src="/images/not_found.webp"
              src={image as string}
              alt={alt as string}
              width={563}
              height={563}
              className="rounded-2xl"
            />
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
          {/* {image ? (
            <Image
              // src="/images/not_found.webp"
              src={image as string}
              alt={alt as string}
              width={563}
              height={563}
              className="rounded-2xl"
            />
          ) : (
            <Video
              src={video as string}
              poster={poster as string}
              className="rounded-2xl"
            />
          )} */}
        </div>
      </div>
      {children}
      <Divider
        sx={{ width: "100%", marginBottom: "20px", marginTop: "20px" }}
      />
      <div className="px-8 py-6">
        <Typography className="text-sm uppercase text-black-default">
          details
        </Typography>
        <Typography className="text-sm uppercase text-neutral-600">
          {detail}
        </Typography>
      </div>
      <ModalCustom
        open={open}
        onClose={handleClose}
        className="gap-3 rounded-[34px] p-[10px]"
        width={600}
        title="You got 6 NAKA Punk"
      >
        <div className="grid grid-cols-5 gap-[10px]">
          {meta_data &&
            meta_data.map((item) => (
              <div
                key={item.item_id}
                className="group relative cursor-pointer"
              >
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
            ))}
        </div>
      </ModalCustom>
    </div>
  )
}

export default CardContentDetails
