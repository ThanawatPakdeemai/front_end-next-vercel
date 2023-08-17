import { Chip, Typography } from "@mui/material"
import { ImageProps } from "next/image"
import Link from "next/link"
import React from "react"

import dynamic from "next/dynamic"
import Helper from "@utils/helper"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"

const ButtonIcon = dynamic(
  () => import("@components/atoms/button/ButtonIcon"),
  {
    suspense: true,
    ssr: false
  }
)

const ImageCustom = dynamic(
  () => import("@components/atoms/image/Image").then((mod) => mod.ImageCustom),
  {
    suspense: true,
    ssr: false
  }
)

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface ITagSingular {
  title: string
  label: string | React.ReactNode
  link?: string
  icon?: string
  width?: ImageProps["width"]
  height?: ImageProps["height"]
  className?: string
  idNFT?: string
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"
  variant?: "outlined" | "filled"
}

const TagSingular = ({
  label,
  link,
  title,
  className,
  icon,
  width,
  height,
  idNFT = "naka",
  color,
  variant = "outlined"
}: ITagSingular) => {
  // mb-3
  const { successToast } = useToast()

  const copyClipboard = () => {
    navigator.clipboard.writeText(idNFT)
    successToast(MESSAGES.copy)
  }

  const renderContent = () => {
    if (link && typeof label === "string") {
      return (
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
      )
    }
    if (link === undefined) {
      return (
        <Chip
          label={label}
          variant={variant}
          size="small"
          className="cursor-default uppercase"
          color={color}
        />
      )
    }
    return (
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
              icon={<Icomoon className="icon-Copy" />}
            />
          </div>
        )}
      </>
    )
  }

  return typeof label !== "string" ? (
    <div className={`gap-3 ${className}`}>
      <Typography className="mb-4 mt-[2px] font-neue-machina-semi text-lg uppercase text-neutral-600">
        {title}
      </Typography>
      {label}
    </div>
  ) : (
    <div className={`flex items-center gap-3 ${className}`}>
      <Typography className="font-neue-machina-semi text-xs uppercase text-neutral-600">
        {title}
      </Typography>
      {renderContent()}
    </div>
  )
}

export default TagSingular
