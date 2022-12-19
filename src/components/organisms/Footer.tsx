import { Divider, Typography } from "@mui/material"
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined"
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined"
import WineBarOutlinedIcon from "@mui/icons-material/WineBarOutlined"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"
import ButtonLink from "@components/atoms/button/ButtonLink"
import Image from "next/image"
import { SOCIAL } from "@configs/socialShare"
import Link from "next/link"
import { NAKA_GAME } from "@configs/nakaGame"
import { NAKA_SERVICES } from "@configs/nakaServices"
import { NAKA_ECOSYSTEMSS } from "@configs/nakaEcosystems"
import { motion } from "framer-motion"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import IconArrowLeft from "@components/icons/arrowLeftIcon"
import LogoIcon from "@components/icons/LogoIcon"

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

const iconmotion = {
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
  const onHandleClick = () => {}
  return (
    <>
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
                    <motion.div
                      key={item.label}
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      className="relative max-w-[200px] cursor-pointer"
                    >
                      <motion.div
                        className="opacity-1 absolute left-0 translate-y-[-30%]"
                        variants={arrowMotion}
                      >
                        <ArrowForwardIcon sx={{ height: 14 }} />
                      </motion.div>
                      <motion.h1
                        className="pb-[14px]"
                        variants={textMotion}
                      >
                        {game.name}
                      </motion.h1>
                    </motion.div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="w-48">
            <div className="mb-4 uppercase text-white-primary">services</div>
            {NAKA_SERVICES?.map((item) => (
              <motion.div
                key={item.label}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="relative max-w-[200px] cursor-pointer"
              >
                <motion.div
                  className="opacity-1 absolute left-0 translate-y-[-30%]"
                  variants={arrowMotion}
                >
                  <ArrowForwardIcon sx={{ height: 14 }} />
                </motion.div>
                <motion.h1
                  className="pb-[14px]"
                  variants={textMotion}
                >
                  {item.label}
                </motion.h1>
              </motion.div>
            ))}
          </div>
          <div className="w-48">
            <div className="mb-4 uppercase text-white-primary">
              NAKA ecosystemss
            </div>
            {NAKA_ECOSYSTEMSS?.map((item) =>
              item.newpage === false ? (
                <motion.div
                  key={item.label}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="relative max-w-[200px] cursor-pointer"
                >
                  <motion.div
                    className="opacity-1 absolute left-0 translate-y-[-30%]"
                    variants={arrowMotion}
                  >
                    <ArrowForwardIcon sx={{ height: 14 }} />
                  </motion.div>
                  <motion.h1
                    className="pb-[14px]"
                    variants={textMotion}
                  >
                    {item.label}
                  </motion.h1>
                </motion.div>
              ) : (
                <motion.div
                  key={item.label}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="relative max-w-[200px] cursor-pointer"
                >
                  <motion.div
                    className="opacity-1 absolute left-0 translate-y-[-30%]"
                    variants={arrowMotion}
                  >
                    <ArrowForwardIcon sx={{ height: 14 }} />
                  </motion.div>
                  <div className="flex">
                    <motion.div
                      className="pb-[14px]"
                      variants={textMotion}
                    >
                      {item.label}
                      <ArrowOutwardOutlinedIcon sx={{ height: 14 }} />
                    </motion.div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
        <div className="flex justify-center pt-[20px] lg:justify-center lg:p-0">
          <div className="flex flex-col items-center justify-self-end lg:w-3/4 lg:items-start">
            <div className="mb-4 uppercase text-white-primary">
              BE A PART OF THE PLAY TO EARN REVOLUTION!
            </div>
            Join the industry&apos;s first comprehensive Play to Earn ecosystem
            and explore the many benefits it has to offer.
            <div className="my-8 w-[280px]">
              <ButtonLink
                href="/"
                text="join The Revolutions"
                icon={<WineBarOutlinedIcon />}
                size="medium"
                color="secondary"
                variant="contained"
              />
            </div>
            <div className="flex flex-wrap">
              {SOCIAL?.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                >
                  <motion.div
                    whileHover="hover"
                    className="m-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                  >
                    <motion.div
                      variants={iconmotion}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 4
                      }}
                    >
                      <Image
                        src={item.img}
                        alt={item.label}
                        width={item.width}
                        height={item.height}
                      />
                    </motion.div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[80px] text-[12px] sm:flex">
        <div className="rounded-[20px] bg-neutral-800 p-8">
          <div className="md:flex">
            <div
              className="flex md:w-2/4"
              text-white-primary
            >
              <ButtonToggleIcon
                handleClick={onHandleClick}
                startIcon={
                  <Image
                    src="/assets/icons/logo_master.png"
                    width={18}
                    height={18}
                    alt="logo_master"
                  />
                }
                text="Become a Naka Devs"
                className="z-[2] h-[48px] w-[200px] border-[1px] border-solid border-neutral-700 bg-transparent font-bold capitalize text-white-default"
              />
              <h3 className="pl-[30px] text-grey-neutral04 md:w-[300px]">
                Join the industry&apos;s first comprehensive Play to Earn
                ecosystem.
              </h3>
            </div>
            <div className="mt-[20px] flex md:mt-0 md:w-3/4">
              <ButtonToggleIcon
                handleClick={onHandleClick}
                startIcon={
                  <Image
                    src="/assets/icons/logo_master.png"
                    width={18}
                    height={18}
                    alt="logo_master"
                  />
                }
                text="Become a Partner"
                className="z-[2] h-[48px] w-[200px] border-[1px] border-solid border-neutral-700 bg-transparent font-bold capitalize text-white-default"
              />
              <h3 className="w-2/4 pl-[30px] text-grey-neutral04">
                Earn some serious cash promoting Nakamoto.Games
              </h3>
            </div>
          </div>
        </div>
        <div className="arrow-slick-container mt-[10px] flex grid rotate-90  content-center justify-center rounded-[20px] bg-neutral-800 p-8  sm:mt-0 sm:ml-[12px] sm:w-auto">
          <button
            type="button"
            className="flex h-full w-full items-center justify-center"
            onClick={() => {}}
          >
            <IconArrowLeft />
          </button>
        </div>
      </div>
      <div className="flex justify-between py-[50px] text-[10px] uppercase text-neutral-600">
        <h4>Copyright 2022 © Nakamoto Games</h4>
        {/* <Image
          src="/assets/icons/logo_master.png"
          alt="naka-logo"
          className="object-contain object-left"
          width={50}
          height={50}
        /> */}
        <LogoIcon
          width={50}
          height={50}
        />
        <h4>Scure by : polygon network</h4>
      </div>
    </>
  )
}

export default Footer
