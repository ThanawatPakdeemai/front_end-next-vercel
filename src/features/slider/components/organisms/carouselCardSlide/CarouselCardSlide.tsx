import React from "react"

export interface CarouselCardSlideProps {
  slide: any
  index: number
  activeIndex: number
}
const CarouselCardSlide = ({
  slide,
  index,
  activeIndex
}: CarouselCardSlideProps) => {
  // Example of a component
  const isActive = index === activeIndex
  return (
    <div
      className={`carousel-slide__item ${
        isActive ? "carousel-slide__item--active" : ""
      }`}
    >
      <div className="carousel-slide__item__image">
        {/* <img
          src={slide.image}
          alt={slide.name}
        /> */}
      </div>
      <div className="carousel-slide__item__content">
        <div className="carousel-slide__item__content__title">
          <h3>{slide.name}</h3>
        </div>
        <div className="carousel-slide__item__content__description">
          <p>{slide.description}</p>
        </div>
        <div className="carousel-slide__item__content__bar">
          <div
            className="carousel-slide__item__content__bar__progress"
            style={{ width: `${(index + 1) * 10}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default CarouselCardSlide
