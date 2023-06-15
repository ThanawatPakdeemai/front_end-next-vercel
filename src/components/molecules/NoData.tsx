import { ImageCustom } from "@components/atoms/image/Image"
import { IMAGES } from "@constants/images"
import { Typography } from "@mui/material"
import React from "react"
import { Trans } from "react-i18next"

export interface INoData {
  className?: string
  icon?: React.ReactNode
  text?: string
}

const NoData = ({ className, icon, text }: INoData) => (
  <div className={`${className} no-data flex flex-col gap-7`}>
    {icon || (
      <div className="mx-auto flex h-[125px] w-[125px] items-center justify-center">
        <ImageCustom
          src={IMAGES.noDataImage.src}
          alt={IMAGES.noDataImage.alt}
          width={IMAGES.noDataImage.width}
          height={IMAGES.noDataImage.height}
          className="object-contain"
        />
      </div>
    )}
    <Typography className="no-data__text mx-auto max-w-[257px] rounded-[14px] border border-neutral-800 p-4 text-[14px] text-neutral-300">
      {text || <Trans i18nKey="no_data_available" />}
    </Typography>
  </div>
)

export default NoData
