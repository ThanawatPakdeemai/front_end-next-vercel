import { CardContent, Typography } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"

const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

export interface IShortDetailsCTA {
  description: string
  link: string
  linkIcon?: React.ReactNode
  startIcon?: React.ReactNode
  className?: string
}

const ShortDetailsCTA = ({
  description,
  link,
  linkIcon,
  startIcon,
  className
}: IShortDetailsCTA) => {
  const { t } = useTranslation()

  return (
    <CardContent
      className={`carousel-slide__item__content absolute bottom-2 left-0 z-[1] w-full px-3 ${className}`}
    >
      <div className="flex w-full flex-col  items-center justify-between gap-4 rounded-xl bg-neutral-800 px-3 py-4 md:flex-row">
        <div className="flex  items-center">
          {startIcon && (startIcon as React.ReactElement)}
          <Typography
            className="mb-0 line-clamp-2 text-white-primary md:line-clamp-1"
            variant="body1"
            dangerouslySetInnerHTML={{
              __html: description
            }}
          />
        </div>
        <ButtonLink
          href={link}
          text={t("download")}
          className="carousel-slide__item__content__link max-h-[24.5px] !min-w-0 p-0 font-neue-machina"
          icon={linkIcon || <Icomoon className="icon-Download" />}
        />
      </div>
    </CardContent>
  )
}

export default ShortDetailsCTA
