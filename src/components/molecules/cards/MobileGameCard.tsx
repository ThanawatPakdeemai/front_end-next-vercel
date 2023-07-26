import React from "react"
import { Box, Grid } from "@mui/material"
import { Image } from "@components/atoms/image/index"
import { useTranslation } from "react-i18next"
import Link from "next/link"
// import ButtonToggleIcon from "../gameSlide/ButtonToggleIcon"

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
      {/* <ButtonToggleIcon
        startIcon={
          icon ? (
            <Image
              src={icon}
              width={18}
              height={18}
              alt={text}
            />
          ) : null
        }
        type="button"
        text={t(text)}
        textClassName="!text-[8px]"
        href={href}
        handleClick={onHandleClick}
        className="z-[2] h-[50px] w-full bg-primary-main capitalize "
      /> */}
    </Grid>
  )
}
export default MobileGameCard
