import ShortDetailsCTA, {
  IShortDetailsCTA
} from "@components/molecules/ShortDetailsCTA"
import React from "react"
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined"
import { CardMedia } from "@mui/material"

export interface CarouselCardSlideProps extends IShortDetailsCTA {
  image: string
  name: string
  index: number
  activeIndex: number
}
const CarouselCardSlide = ({
  image,
  name,
  index,
  activeIndex,
  ...props
}: CarouselCardSlideProps) => {
  const isActive = index === activeIndex
  return (
    <div
      className={`carousel-slide__item relative overflow-hidden rounded-2xl ${
        isActive ? "carousel-slide__item--active" : ""
      }`}
    >
      <div className="carousel-slide__item__image">
        <CardMedia
          component="img"
          alt={name}
          height={468}
          image={image}
        />
      </div>
      <ShortDetailsCTA
        description={props.description}
        link={props.link}
        startIcon={
          <LanguageOutlinedIcon
            color="error"
            className="mr-3"
          />
        }
      />
    </div>
  )
}

export default CarouselCardSlide
