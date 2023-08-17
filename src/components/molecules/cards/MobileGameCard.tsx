import React from "react"
import { Box, Grid } from "@mui/material"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import dynamic from "next/dynamic"

const Image = dynamic(
  () => import("@components/atoms/image/index").then((mod) => mod.Image),
  {
    suspense: true,
    ssr: true
  }
)

export interface ICategoryCard {
  img: string
  text: string
  icon?: string
  href: string
}

const MobileGameCard = ({
  img,
  text,
  // icon,
  href
}: ICategoryCard) => {
  const { t } = useTranslation()

  return (
    <Grid
      item
      xs={3}
      className="pr-[10px]"
    >
      <Link href={href}>
        <Box
          component="div"
          className="cursor-pointer"
        >
          <Image
            src={img}
            alt={text}
            width={264}
            height={324}
            className="mb-[10px] h-[83px] rounded-[8px] object-cover group-hover:h-[250px]"
          />
          <p className="flex items-start text-[8px] uppercase">{t(text)}</p>
        </Box>
      </Link>
    </Grid>
  )
}
export default MobileGameCard
