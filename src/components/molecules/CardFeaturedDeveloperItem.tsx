import React from "react"
import dynamic from "next/dynamic"
import { IFeatureProps } from "@constants/features"

const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: false
})

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
      <div className="card-featured-developer__content__subtitle mb-2 line-clamp-1 uppercase text-green-lemon">
        {subtitle || "subtitle"}
      </div>
      <h3 className="card-featured-developer__content__title mb-2 line-clamp-1 text-[22px] uppercase text-neutral-300">
        {title || "title"}
      </h3>
      <p className="card-featured-developer__content__description line-clamp-5 text-neutral-500">
        {description || "description"}
      </p>
    </div>
  </div>
)

export default CardFeaturedDeveloperItem
