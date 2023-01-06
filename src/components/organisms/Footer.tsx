import { Divider, Typography } from "@mui/material"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"
import { SOCIAL } from "@configs/socialShare"
import Link from "next/link"
import { NAKA_GAME } from "@configs/nakaGame"
import { NAKA_SERVICES } from "@configs/nakaServices"
import { NAKA_ECOSYSTEMSS } from "@configs/nakaEcosystems"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import WineIcon from "@components/icons/WineIcon"
import DesktopIcon from "@components/icons/DesktopIcon"
import DollarPaperIcon from "@components/icons/DollarPaperIcon"
import IconArrowTop from "@components/icons/arrowTopIcon"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import NakaMask1 from "@components/icons/Footer/NaKaMask1"
import NakaMask2 from "@components/icons/Footer/NaKaMask2"
import NakaMask3 from "@components/icons/Footer/NaKaMask3"
import { useState } from "react"
import TextLink from "@components/atoms/TextLink"
import { ShakeIcon } from "@components/atoms/LigthShake"

const arrowMotion = {
  rest: { opacity: 0, ease: "easeOut", duration: 0.2, type: "spring" },
  hover: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      type: "spring",
      ease: "easeIn"
    }
  }
}

const textMotion = {
  visible: {
    scale: 0.8,
    transition: { delay: 0.4 }
  },
  rest: {
    color: "#98A0B5",
    x: 0,
    transition: {
      duration: 2,
      type: "spring",
      stiffness: 300
    }
  },
  hover: {
    color: "#fff",
    x: 30,
    transition: {
      duration: 0.4,
      stiffness: 300,
      type: "spring"
    }
  }
}

export const iconmotion = {
  hover: {
    scale: 1.2,
    rotate: 17,
    ease: "easeIn",
    transition: {
      duration: 0.4,
      stiffness: 500,
      type: "spring"
    }
  }
}
const iconArrow = {
  hover: {
    scaleY: 1.2,
    ease: "easeIn"
  }
}

const Footer = () => {
  const onHandleClick = () => {}
  const [isHover, setIsHover] = useState<boolean>(false)
  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  return (
    <>
      {/* <CardRank /> */}
      <div className="flex items-center" />
      <Divider sx={{ marginTop: 10, marginBottom: 10 }} />
      <div className="justify-between text-[12px] lg:flex">
        <div className="flex justify-center">
          <div className="w-48">
            <div className="mb-4 uppercase text-white-primary">game</div>
            {NAKA_GAME?.map((item) => (
              <div key={`game_${item.label}`}>
                <Typography
                  key={`${item.label}`}
                  className="pb-[10px] text-[10px] uppercase text-black-default"
                >
                  {item.label}
                </Typography>
                {item.game.map((game) => (
                  <div
                    key={`game-${item.label}-${game.name}`}
                    className="flex"
                  >
                    <TextLink
                      key={item.label}
                      name={game.name}
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      variantsArrow={arrowMotion}
                      variantsText={textMotion}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="w-48">
            <div className="mb-4 uppercase text-white-primary">services</div>
            {NAKA_SERVICES?.map((item) => (
              <TextLink
                key={item.label}
                name={item.label}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variantsArrow={arrowMotion}
                variantsText={textMotion}
              />
            ))}
          </div>
          <div className="w-48">
            <div className="mb-4 uppercase text-white-primary">
              NAKA ecosystemss
            </div>
            {NAKA_ECOSYSTEMSS?.map((item) => (
              <TextLink
                key={item.label}
                name={item.label}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variantsArrow={arrowMotion}
                variantsText={textMotion}
                icon={
                  item.icon ? (
                    <ArrowOutwardOutlinedIcon sx={{ height: 14 }} />
                  ) : null
                }
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center pt-[20px] lg:justify-center lg:p-0">
          <div className="flex flex-col items-center justify-self-end lg:w-3/4 lg:items-start">
            <div className="mb-4 uppercase text-white-primary">
              BE A PART OF THE PLAY TO EARN REVOLUTION!
            </div>
            Join the industry&apos;s first comprehensive Play to Earn ecosystem
            and explore the many benefits it has to offer.
            <div className="my-8">
              <ButtonToggleIcon
                handleClick={onHandleClick}
                startIcon={<WineIcon />}
                text="join The Revolutions"
                className="btn-rainbow-theme b h-[50px] w-[220px] bg-secondary-main font-bold capitalize text-white-default"
              />
            </div>
            <div className="flex flex-wrap">
              {SOCIAL?.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                >
                  <ButtonIcon
                    variants={iconmotion}
                    whileHover="hover"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 4
                    }}
                    icon={item.icon}
                    className="m-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[80px] text-[12px] lg:flex">
        <div className="w-full rounded-[20px] bg-neutral-800 p-6 lg:w-[90%]">
          <div className="md:flex">
            <div className="flex items-center text-white-primary md:w-2/4 md:pr-[20px]">
              <ButtonToggleIcon
                handleClick={onHandleClick}
                startIcon={<DesktopIcon />}
                text="Become a Naka Devs"
                className="z-[2] h-[50px] w-[220px] border-[1px] border-solid border-neutral-700 bg-transparent font-bold capitalize text-white-default"
              />
              <h3 className="pl-[30px] text-grey-neutral04 md:w-[280px]">
                Join the industry&apos;s first comprehensive Play to Earn
                ecosystem.
              </h3>
            </div>
            <div className="mt-[20px] flex items-center md:mt-0 md:w-3/4">
              <ButtonToggleIcon
                handleClick={onHandleClick}
                startIcon={<DollarPaperIcon />}
                text="Become a Partner"
                className="z-[2] h-[50px] w-[220px] border-[1px] border-solid border-neutral-700 bg-transparent font-bold capitalize text-white-default"
              />
              <h3 className="pl-[30px] text-grey-neutral04 md:w-[300px]">
                Earn some serious cash promoting Nakamoto.Games
              </h3>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-2 lg:pt-0">
          <div className="flex h-[82px] w-[90px] items-center justify-center self-center rounded-[20px] bg-neutral-800 lg:ml-[10px] lg:h-full">
            <ButtonIcon
              variants={iconArrow}
              whileHover="hover"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 5
              }}
              icon={<IconArrowTop className="text-white-default" />}
              className="h-fit cursor-pointer self-center rounded-[15px] border border-neutral-700 p-4"
            />
          </div>
        </div>
      </div>
      <div className="m-4 flex items-center justify-between py-[20px] text-[10px] uppercase text-neutral-600">
        <h4>Copyright 2022 © Nakamoto Games</h4>
        <div
          className="h-[80px] cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHover ? (
            <ShakeIcon
              iconArray={[
                <NakaMask2 key="NaKaMask" />,
                <NakaMask3 key="NaKaMask" />
              ]}
              second={100}
            />
          ) : (
            <NakaMask1 />
          )}
        </div>
        <h4>Scure by : polygon network</h4>
      </div>
    </>
  )
}

export default Footer
