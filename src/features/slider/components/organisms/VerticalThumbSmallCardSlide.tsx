import React from "react"
import { IVerticalThumbCardSlideProps } from "@feature/slider/interfaces/ISlides"
import { CardMedia } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { ImageCustom } from "@components/atoms/image/Image"

const VerticalThumbSmallCardSlide = ({
  item
}: IVerticalThumbCardSlideProps) => (
  <div className="verticalSmallThumb-slide__item relative my-[2px]">
    <div className="verticalSmallThumb-slide__item__image h-[70px] w-[70px] cursor-pointer transition-all hover:opacity-70">
      {item.type === "video" && (
        <div className="absolute flex h-full w-full items-center justify-center">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-neutral-900/60">
            <PlayArrowIcon className="text-base text-neutral-300" />
          </span>
        </div>
      )}
      {item.type === "video" ? (
        <CardMedia
          className="card-media block h-[70px] w-[70px] overflow-hidden rounded-sm border-2 border-neutral-700 object-cover object-center transition-all"
          component={item.type === "video" ? "video" : "img"}
          alt="Slide"
          src={item.src}
          autoPlay={false}
          controls={false}
        />
      ) : (
        <ImageCustom
          src={item.src}
          alt="Slide"
          width={200}
          height={200}
          className="h-full w-full overflow-hidden rounded-sm border-2 border-neutral-700 object-cover object-center transition-all"
        />
      )}
    </div>
  </div>
)

export default VerticalThumbSmallCardSlide
