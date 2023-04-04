import { Divider, Link, Typography } from "@mui/material"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"
import { SOCIAL } from "@configs/socialShare"
import { NAKA_GAME } from "@configs/nakaGame"
import { NAKA_SERVICES } from "@configs/nakaServices"
import { NAKA_ECOSYSTEMSS } from "@configs/nakaEcosystems"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import WineIcon from "@components/icons/WineIcon"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import NakaMask1 from "@components/icons/Footer/NaKaMask1"
import NakaMask2 from "@components/icons/Footer/NaKaMask2"
import NakaMask3 from "@components/icons/Footer/NaKaMask3"
import { useState } from "react"
import TextLink from "@components/atoms/TextLink"
import { ShakeIcon } from "@components/atoms/LigthShake"
import useGlobal from "@hooks/useGlobal"

export const arrowMotion = {
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

export const textMotion = {
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

const Footer = () => {
  const { openInNewTab } = useGlobal()

  const [isHover, setIsHover] = useState<boolean>(false)
  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  return (
    <>
      <div className="mx-2 flex items-center sm:flex" />
      <Divider
        className="my-8 md:my-16"
        sx={{ marginTop: 10, marginBottom: 10 }}
      />
      <div className="mx-4 w-full justify-between overflow-hidden text-[12px] lg:flex">
        <div className="grid grid-cols-2 justify-center gap-3 whitespace-nowrap p-5 md:flex md:gap-0">
          <div className="flex-auto sm:flex-none md:w-48">
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
                    <Link
                      key={game.name}
                      href={game.path}
                    >
                      <TextLink
                        name={game.name}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        variantsArrow={arrowMotion}
                        variantsText={textMotion}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex-auto sm:flex-none md:w-48">
            <div className="mb-4 uppercase text-white-primary">services</div>
            {NAKA_SERVICES?.map((item) => (
              <Link
                key={item.label}
                href={item.path}
              >
                <TextLink
                  name={item.label}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variantsArrow={arrowMotion}
                  variantsText={textMotion}
                />
              </Link>
            ))}
          </div>
          <div className="col-span-2 flex-auto sm:flex-none md:col-span-1 md:w-48">
            <div className="mb-4 whitespace-normal uppercase text-white-primary">
              NAKA Ecosystem
            </div>
            {NAKA_ECOSYSTEMSS?.map((item) => (
              <Link
                href={item.path}
                key={item.label}
              >
                <TextLink
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
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center pt-[20px] text-center md:text-left lg:justify-center lg:p-0">
          <div className="flex flex-col items-center justify-self-end lg:w-3/4 lg:items-start">
            <div className="mb-4 uppercase text-white-primary">
              JOIN THE PLAY TO EARN REVOLUTION!
            </div>
            Join the industry&apos;s first comprehensive Play to Earn ecosystem
            and explore the many benefits it has to offer.
            <div className="my-8">
              <ButtonToggleIcon
                handleClick={() => openInNewTab("https://t.me/NakamotoGames")}
                startIcon={<WineIcon />}
                text="join The Revolutions"
                className="btn-rainbow-theme b h-[50px] !w-[260px] bg-secondary-main font-bold capitalize text-white-default"
                type="button"
              />
            </div>
            <div className="flex flex-wrap justify-center">
              {SOCIAL?.map((item, index) => (
                <Link
                  key={Number(index)}
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
      {/* // TODO: Open after launch V2 */}
      {/* <GameDeveloperFooter /> */}
      <div className="flex flex-col items-center justify-center text-[10px] uppercase text-neutral-600 md:flex-row md:justify-between lg:m-4 lg:py-[20px]">
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
