import RedBanner from "../organisms/RedBanner"

const FixedAPR = () => (
  <section className="relative w-full overflow-hidden">
    <RedBanner message="Fixed staking earn up to 12,916.02% APR" />
    {/* {isLoading ? (
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
                  <GameCardSlide
                    slide={slide}
                    slideNext={
                      index === 4 ? slideGames[0] : slideGames[index + 1]
                    }
                    gotoNext={gotoNext}
                    gotoPrev={gotoPrev}
                  />
                ) : (
                  <GameCardSlide
                    slide={slide}
                    slideNext={slideGames[index + 1]}
                    gotoNext={gotoNext}
                    gotoPrev={gotoPrev}
                  />
                )}
              </div>
            ))}
        </Slider>
      )} */}
  </section>
)

export default FixedAPR
