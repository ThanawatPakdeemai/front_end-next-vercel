import React, { useRef } from "react"
import { Image } from "@components/atoms/image/index"
import Slider, { Settings } from "react-slick"

const CardTournamentSlider = () => {
  // const { slideGames, isLoading } = useGetGames()
  const sliderRef = useRef<Slider>(null)
  // const gotoNext = () => {
  //   sliderRef?.current?.slickNext()
  // }

  const settings: Settings = {
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 500,
    draggable: true,
    fade: true,
    pauseOnHover: false,
    dots: true
  }
  return (
    <div className="mt-10 h-full w-full">
      <div className="w-1/2">
        <Slider
          ref={sliderRef}
          {...settings}
        >
          <Image
            className="h-44 rounded-[20px]"
            src="/images/banner/tournament.webp"
            width={680}
            height={176}
            alt="alt"
          />
          <Image
            className="h-44 rounded-[20px]"
            src="/images/banner/staking.webp"
            width={700}
            height={176}
            alt="alt"
          />
          <Image
            className="h-44 rounded-[20px]"
            src="/images/banner/nakamoto.webp"
            width={700}
            height={176}
            alt="alt"
          />
          <Image
            className="h-44 rounded-[20px]"
            src="/images/banner/nakaMarket.webp"
            width={700}
            height={176}
            alt="alt"
          />
          <Image
            className="h-44 rounded-[20px]"
            src="/images/banner/blog.webp"
            width={700}
            height={176}
            alt="alt"
          />
        </Slider>
      </div>
      {/* <section className="relative w-full overflow-hidden">
        {isLoading ? (
          <SkeletonBanner />
        ) : (
          <Slider
            ref={sliderRef}
            {...settings}
          >
            {slideGames &&
              slideGames.slice(0, 5).map((slide, index) => (
                <div key={slide.id}>
                  {slide[index] !== undefined ? (
                    <BannerCardSlide
                      slide={slide}
                      slideNext={
                        index === 4 ? slideGames[0] : slideGames[index + 1]
                      }
                      gotoNext={gotoNext}
                    />
                  ) : (
                    <BannerCardSlide
                      slide={slide}
                      slideNext={slideGames[index + 1]}
                      gotoNext={gotoNext}
                    />
                  )}
                </div>
              ))}
          </Slider>
        )}
      </section> */}
    </div>
  )
}

export default CardTournamentSlider
