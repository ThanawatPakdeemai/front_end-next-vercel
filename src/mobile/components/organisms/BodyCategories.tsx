/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import { v4 as uuid } from "uuid"
import React, { useRef } from "react"
import Slider, { Settings } from "react-slick"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { Image } from "@components/atoms/image"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"

const BodyCategories = ({ games }: any) => {
  const limitPage = 16

  const sliderRef = useRef<Slider>(null)
  const { onSetGameStore, gameLink } = useGamePageListController()

  const settings: Settings = {
    slidesToShow: 2,
    slidesToScroll: 2,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }
  const onGame = (game) => {
    onSetGameStore(game)
    gameLink(game)
  }

  return (
    <div className="my-2 w-[calc(100%)] md:my-10">
      <Slider
        ref={sliderRef}
        {...settings}
      >
        {games
          ? games.slice(0, 6).map((item, index) => (
              <div
                key={item._id}
                className="relative p-2"
                onClick={() => onGame(item)}
              >
                <Image
                  src={item.image_category_list}
                  alt={item.name}
                  width={908}
                  height={204}
                  className=" h-full w-full rounded-md"
                />
                <div
                  className={`absolute right-6 top-6 flex h-8 w-8  items-center justify-center rounded-[6px] text-xl text-primary-main
                  ${
                    index === 0
                      ? " bg-error-main "
                      : index === 1
                      ? "bg-purple-primary"
                      : index === 2
                      ? "bg-success-main"
                      : "bg-[#757575]"
                  }
                `}
                >
                  <p>{index + 1}</p>
                </div>
                <p className="mt-2 text-black-default">{item.name}</p>
              </div>
            ))
          : [...Array(limitPage)].map(() => <SkeletonCard key={uuid()} />)}
      </Slider>
    </div>
  )
}
export default BodyCategories
