import { CardMedia } from "@mui/material"
import dynamic from "next/dynamic"
import { IVerticalThumbCardSlideProps } from "@feature/slider/interfaces/ISlides"

const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

const VerticalThumbCardSlide = ({ item }: IVerticalThumbCardSlideProps) => (
  <div className="verticalThumb-slide__item relative">
    <div className="verticalThumb-slide__item__image">
      {item.type === "video" ? (
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
      ) : (
        <ImageCustom
          width={1023}
          height={740}
          src={item.src}
          alt="Slide"
          className="h-full w-full object-cover object-center"
        />
      )}
    </div>
  </div>
)

export default VerticalThumbCardSlide
