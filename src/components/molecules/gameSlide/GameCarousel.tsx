import React, { memo, useRef, useState } from "react"
import Slider, { Settings } from "react-slick"
import GameCarouselHeader, {
  IHeaderSlide
} from "@components/molecules/gameSlide/GameCarouselHeader"
import GameCard from "@feature/game/components/molecules/GameCard"

export interface ISlide {
  id: string
  image: string
  desc: string
}

interface IProps {
  menu: IHeaderSlide
  list: ISlide[]
  showNo?: boolean
  checkTimer?: boolean
  curType: string
  setCurType: (_type: string) => void
}

export type TColor =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"

const GameCarousel = ({
  menu,
  list,
  showNo = false,
  checkTimer = false,
  curType,
  setCurType
}: IProps) => {
  const staminaRecovery = new Date("2023-01-07T22:24:00.000Z")
  const showSlide = list && list.length > 6 ? 6 : list.length
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: showSlide,
    slidesToScroll: showSlide,
    arrows: false,
    variableWidth: false
  }

  const sliderRef = useRef<Slider>(null)
  const [cooldown, setCooldown] = useState<boolean>(false)

  const onSlideNext = () => {
    sliderRef?.current?.slickNext()
  }
  const onSlidePrev = () => {
    sliderRef?.current?.slickPrev()
  }

  const onViewAll = () => {}

  const onHandleClick = () => {}

  return (
    <div className="mb-10">
      <GameCarouselHeader
        menu={menu}
        curType={curType}
        onView={onViewAll}
        onNext={onSlideNext}
        onPrev={onSlidePrev}
        setCurType={setCurType}
      />
      <Slider
        ref={sliderRef}
        {...settings}
      >
        {list &&
          list.map((item, index) => (
            <GameCard
              key={item.id}
              menu={menu}
              data={item}
              showNo={showNo}
              no={index}
              checkTimer={checkTimer}
              cooldown={cooldown}
              setCooldown={setCooldown}
              staminaRecovery={staminaRecovery}
              onHandleClick={onHandleClick}
            />
          ))}
      </Slider>
    </div>
  )
}

export default memo(GameCarousel)
