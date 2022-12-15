import { Divider, Typography } from "@mui/material"
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined"
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined"
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined"
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

const Footer = () => (
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
                <motion.h1
                  whileHover={{ scale: 1.1, originX: -1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={`game-${item.label}-${game.name}`}
                  className="pb-[14px]"
                >
                  {game.name}
                </motion.h1>
              ))}
            </div>
          ))}
        </div>
        <div className="w-48">
          <div className="mb-4 uppercase text-white-primary">services</div>
          {NAKA_SERVICES?.map((item) => (
            <motion.h4
              whileHover={{ scale: 1.1, originX: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
              key={item.label}
              className="pb-[14px]"
            >
              {item.label}
            </motion.h4>
          ))}
        </div>
        <div className="w-48">
          <div className="mb-4 uppercase text-white-primary">
            NAKA ecosystemss
          </div>
          {NAKA_ECOSYSTEMSS?.map((item) =>
            item.newpage === false ? (
              <motion.h4
                whileHover={{ scale: 1.1, originX: -1 }}
                transition={{ type: "spring", stiffness: 300 }}
                key={item.label}
                className="pb-[14px]"
              >
                Blog
              </motion.h4>
            ) : (
              <motion.div
                whileHover={{
                  scale: 1.1,
                  originX: -1
                }}
                transition={{ type: "spring", stiffness: 300 }}
                key={item.label}
                className="flex pb-[14px]"
              >
                {/* <SlashContainer variants={slashMotion}>
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 27 50"
                  >
                    <path
                      fill="#154FFF"
                      d="M21.177 0L0 50h5.818L26.995 0z"
                      fillRule="evenodd"
                    />
                  </svg>
                </SlashContainer> */}
                <h4>{item.label}</h4>
                <ArrowOutwardOutlinedIcon sx={{ height: 14 }} />
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
                <div className="m-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-grey-900 bg-grey-A100">
                  <Image
                    className="transition duration-300 hover:translate-x-1 hover:rotate-[17deg]"
                    src={item.img}
                    alt={item.label}
                    width={item.width}
                    height={item.height}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="pt-[80px] text-[12px] sm:flex">
      <div className="rounded-[20px] bg-grey-A100 p-8">
        <div className="md:flex">
          <div
            className="flex md:w-2/4"
            text-white-primary
          >
            <ButtonLink
              href="/"
              text="Become a Naka Devs"
              icon={<DvrOutlinedIcon />}
              size="medium"
              color="primary"
              variant="outlined"
              className="w-[230px]"
            />
            <h3 className="w-2/4 pl-[30px] text-grey-neutral04">
              Join the industry&apos;s first comprehensive Play to Earn
              ecosystem.
            </h3>
          </div>
          <div className="mt-[20px] flex md:mt-0 md:w-3/4">
            <ButtonLink
              href="/"
              text="Become a Partner"
              icon={<LocalAtmOutlinedIcon />}
              size="medium"
              color="primary"
              variant="outlined"
              className="w-[230px]"
            />
            <h3 className="w-2/4 pl-[30px] text-grey-neutral04">
              Earn some serious cash promoting Nakamoto.Games
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-[10px] flex grid content-center justify-center rounded-[20px] bg-grey-A100 p-8  sm:mt-0 sm:ml-[12px] sm:w-auto">
        <NorthOutlinedIcon />
      </div>
    </div>
    <div className="flex justify-between py-[50px] text-[10px] uppercase text-[#4E5057]">
      <h4>Copyright 2022 © Nakamoto Games</h4>
      <Image
        src="/assets/icons/logo_master.png"
        alt="naka-logo"
        className="object-contain object-left"
        width={50}
        height={50}
      />
      <h4>Scure by : polygon network</h4>
    </div>
  </>
)

export default Footer
