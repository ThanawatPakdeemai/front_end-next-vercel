import { ButtonLink } from "@components/atoms/buttonLink"
import React from "react"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import { ButtonFavourite } from "@components/atoms/buttonFavourite"

interface IContentFooterBannerSlide {
  link: string
}

const CardFooterSlide = ({ link }: IContentFooterBannerSlide) => (
  <footer className="slide-item--footer relative mt-4 flex items-center justify-between">
    <div className="w-[calc(100%-80px)]">
      <ButtonLink
        text="Play Now"
        href={link}
        icon={<SportsEsportsOutlinedIcon />}
        size="large"
        color="secondary"
        variant="contained"
        className="w-full"
      />
    </div>
    <ButtonFavourite className="absolute right-0 top-0" />
  </footer>
)

export default CardFooterSlide
