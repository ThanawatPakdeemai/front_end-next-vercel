import React from "react"
import { Grid } from "@mui/material"
import { Image } from "@components/atoms/image/index"
import { useTranslation } from "react-i18next"
// import ButtonToggleIcon from "../gameSlide/ButtonToggleIcon"

export interface ICategoryCard {
  img: string
  text: string
  icon?: string
  href?: string
  onHandleClick?: (_link?: string) => void
}

const MobileGameCard = ({
  img,
  text,
  // icon,
  href,
  onHandleClick
}: ICategoryCard) => {
  const { t } = useTranslation()

  return (
    <Grid
      item
      xs={3}
      className="pr-[10px]"
    >
      <button
        type="button"
        onClick={onHandleClick}
        href={href}
      >
        <Image
          src={img}
          alt="home-slide"
          width={264}
          height={324}
          className="mb-[10px] h-[83px] rounded-[8px] object-cover group-hover:h-[250px]"
        />
        <p className="flex items-start text-[8px] uppercase">{t(text)}</p>
      </button>
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
