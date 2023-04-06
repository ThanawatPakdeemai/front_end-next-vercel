import ButtonIcon from "@components/atoms/button/ButtonIcon"
import { ImageCustom } from "@components/atoms/image/Image"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import { Chip, Typography } from "@mui/material"
import Helper from "@utils/helper"
import { ImageProps } from "next/image"
import Link from "next/link"
import CopyIcon from "@components/icons/CopyIcon"
import React from "react"

interface ITagSingular {
  title: string
  label: string | React.ReactNode
  link?: string
  icon?: string
  width?: ImageProps["width"]
  height?: ImageProps["height"]
  className?: string
  idNFT?: string
}

const TagSingular = ({
  label,
  link,
  title,
  className,
  icon,
  width,
  height,
  idNFT = "naka"
}: ITagSingular) => {
  // mb-3
  const { successToast } = useToast()

  const copyClipboard = () => {
    navigator.clipboard.writeText(idNFT)
    successToast(MESSAGES.copy)
  }

  return typeof label !== "string" ? (
    <div className={`flex gap-3 ${className}`}>
      <Typography className="mt-[2px] font-neue-machina-semi text-xs uppercase text-neutral-600">
        {title}
      </Typography>
      {label}
    </div>
  ) : (
    <div className={`flex items-center gap-3 ${className}`}>
      <Typography className="font-neue-machina-semi text-xs uppercase text-neutral-600">
        {title}
      </Typography>
      {link && typeof label === "string" ? (
        <Link href={link}>
          {icon && icon !== "-" && icon !== "" && (
            <ImageCustom
              src={icon}
              alt={title}
              width={width}
              height={height}
            />
          )}
          <Chip
            label={label}
            variant="outlined"
            size="small"
            className="cursor-pointer uppercase"
          />
        </Link>
      ) : (
        <>
          {icon && icon !== "-" && icon !== "" && (
            <ImageCustom
              src={icon}
              alt={title}
              width={width}
              height={height}
            />
          )}
          {label === "naka" && idNFT === "naka" ? (
            <Chip
              label={label}
              variant="outlined"
              size="small"
              className="cursor-pointer uppercase"
            />
          ) : (
            <div className="flex w-auto items-center rounded-less border border-solid border-neutral-700 bg-primary-main p-1 text-neutral-500">
              {Helper.textWithDots(idNFT, 7)}
              <ButtonIcon
                onClick={copyClipboard}
                className="relative ml-2 flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                icon={<CopyIcon />}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default TagSingular
