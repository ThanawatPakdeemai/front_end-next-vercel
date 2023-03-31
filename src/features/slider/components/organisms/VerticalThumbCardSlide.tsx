import { IVerticalThumbCardSlideProps } from "@feature/slider/interfaces/ISlides"
import { CardMedia } from "@mui/material"

const VerticalThumbCardSlide = ({ item }: IVerticalThumbCardSlideProps) => (
  <div className="verticalThumb-slide__item relative">
    <div className="verticalThumb-slide__item__image">
      <CardMedia
        className={`overflow-hidden rounded-2xl object-cover object-center ${
          item.type === "video" ? "h-full" : "h-[408px]"
        }`}
        component={item.type === "video" ? "video" : "img"}
        alt="Slide"
        src={item.src}
        autoPlay={false}
        controls
      />
    </div>
  </div>
)

export default VerticalThumbCardSlide
