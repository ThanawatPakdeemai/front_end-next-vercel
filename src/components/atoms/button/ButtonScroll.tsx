import React from "react"
import { Player } from "@lottiefiles/react-lottie-player"
import { scroller } from "react-scroll"

interface IButtonScrollProps {
  anchorLink: string
}

const ButtonScroll = ({ anchorLink }: IButtonScrollProps) => {
  const onScroll = () => {
    scroller.scrollTo(anchorLink, {
      duration: 1000,
      delay: 10,
      smooth: "easeInOutQuint"
    })
  }

  return (
    <div className="button-scroll__wrapper">
      <button
        type="button"
        onClick={onScroll}
        className="button-scroll__wrapper__button"
      >
        <div className="button-scroll__wrapper__button__icon">
          <Player
            src="/assets/json/button_circle.json"
            className="player"
            autoplay
            loop
            speed={1}
          />
        </div>
      </button>
    </div>
  )
}

export default ButtonScroll
