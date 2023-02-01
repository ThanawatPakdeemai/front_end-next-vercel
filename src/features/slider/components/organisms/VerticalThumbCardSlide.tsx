import { IVerticalThumbCardSlideProps } from "@feature/slider/interfaces/ISlides"
import { CardMedia } from "@mui/material"

const VerticalThumbCardSlide = ({
  item,
  index,
  activeIndex
}: IVerticalThumbCardSlideProps) => {
  const isActive = index === activeIndex
  return (
    <div
      className={`verticalThumb-slide__item relative ${
        isActive ? "verticalThumb-slide__item--active" : ""
      }`}
    >
      <div className="verticalThumb-slide__item__image">
        <CardMedia
          className="h-[408px] overflow-hidden rounded-2xl object-cover object-center"
          component={item.type === "video" ? "video" : "img"}
          alt="Slide"
          src={item.src}
          autoPlay={false}
          controls
        />
      </div>
    </div>
  )
}

export default VerticalThumbCardSlide
