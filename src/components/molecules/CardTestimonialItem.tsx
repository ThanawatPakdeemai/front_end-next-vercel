import React from "react"
import { Chip } from "@mui/material"
import dynamic from "next/dynamic"
import { ITestimonialProps } from "@constants/testimonial"

const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface ICardTestimonialItemProps extends ITestimonialProps {
  className?: string
}

const CardTestimonialItem = ({
  className,
  ...props
}: ICardTestimonialItemProps) => (
  <div
    className={`testimonial-item mx-2 flex flex-1 flex-col gap-4 ${className}`}
  >
    <div className="testimonial__content__author flex h-16 w-full items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-780 p-1">
      <div className="testimonial__content__author_image h-14 w-14 overflow-hidden rounded-lg">
        <ImageCustom
          src={props.image || "/images/gamePage/ThumbnailSqaure.png"}
          alt={props.name || "John Doe"}
          width={100}
          height={100}
          className="object-cover object-center"
        />
      </div>
      <h3 className="testimonial__content__author__name ml-2 font-neue-machina-semi text-sm uppercase text-neutral-300">
        {props.name || "John Doe"}
      </h3>
      <div className="testimonial__content__author__title uppercase text-neutral-400">
        <Chip
          size="small"
          variant="outlined"
          label={props.position || "CEO, Company"}
        />
      </div>
    </div>
    <div className="testimonial__content rounded-2xl border-[1px]  border-neutral-700 bg-neutral-780 p-4">
      <p className="testimonial__content__text border-[1px] border-neutral-700 p-2 text-lg uppercase text-neutral-400">
        “
        {props.text ||
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies, nisl nec tincidunt luctus, nunc elit ultricies nunc, ut aliquet massa nisl eget nunc. Sed ultricies, nisl nec tincidunt luctus, nunc elit ultricies nunc, ut aliquet massa nisl eget nunc.`}
        ”
      </p>
    </div>
  </div>
)

export default CardTestimonialItem
