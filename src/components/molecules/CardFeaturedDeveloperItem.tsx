import React from "react"
import { ImageCustom } from "@components/atoms/image/Image"
import { IList } from "@feature/become-developer/interfaces/IWebBecome"
import { IMAGES } from "@constants/images"
import { IFeatureProps } from "@constants/features"

const CardFeaturedDeveloperItem = ({
  key,
  image,
  subtitle,
  title,
  description
}: IFeatureProps) => (
  <div className="card-featured-developer flex w-1/4 min-w-[300px] max-w-[380px] flex-1 flex-col items-center gap-10 rounded-2xl border-[1px] border-neutral-700 bg-neutral-780 p-[40px_15px_15px] text-[14px]">
    <div className="card-featured-developer__image h-36 w-36">
      <ImageCustom
        src={image || "IMAGES.featureImgVersion.src"}
        alt={key || "feature-img"}
        width={200}
        height={200}
        className="object-contain object-center"
      />
    </div>
    <div className="card-featured-developer__content border-[1px] border-neutral-700 p-5">
      <div className="card-featured-developer__content__subtitle mb-2 uppercase text-green-lemon line-clamp-1">
        {subtitle || "subtitle"}
      </div>
      <h3 className="card-featured-developer__content__title mb-2 text-[22px] uppercase text-neutral-300 line-clamp-1">
        {title || "title"}
      </h3>
      <p className="card-featured-developer__content__description text-neutral-500 line-clamp-5">
        {description || "description"}
      </p>
    </div>
  </div>
)

export default CardFeaturedDeveloperItem
