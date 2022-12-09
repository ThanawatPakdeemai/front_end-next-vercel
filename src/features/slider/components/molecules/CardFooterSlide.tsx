import React from "react"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import ButtonLink from "@components/atoms/button/ButtonLink"
import ButtonFavourite from "@components/atoms/button/ButtonFavourite"

interface IContentFooterBannerSlide {
  link: string
  text?: string
}

const CardFooterSlide = ({
  link,
  text = "Play Now"
}: IContentFooterBannerSlide) => (
  <footer className="slide-item--footer relative mt-4 flex items-center justify-between md:mt-auto">
    <div className="w-[calc(100%-80px)]">
      <ButtonLink
        text={text}
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
