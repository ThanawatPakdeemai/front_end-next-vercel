import ButtonIcon from "@components/atoms/button/ButtonIcon"
import CrumbCustom from "@components/atoms/CrumbCustom"
import IconArrowRight from "@components/icons/arrowRightIcon"
import GiftIcon from "@components/icons/GiftIcon"
import ShapeIcon from "@components/icons/ShapeIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import Tagline from "@components/molecules/tagline/Tagline"
import { iconmotion } from "@components/organisms/Footer"
import { Box, Typography } from "@mui/material"
import React from "react"
import { motion } from "framer-motion"

const NakaPassPage = () => {
  const text = 3
  return (
    <>
      <div className="grid h-[148px] w-full grid-cols-6 gap-2 rounded-2xl border border-neutral-700 bg-neutral-800 p-1">
        <div className="col-span-4 rounded-2xl border border-neutral-700 bg-neutral-900">
          <Box
            className="flex h-full w-full items-center rounded-[13px] text-center text-[26px] uppercase"
            sx={{
              backgroundColor: "#e1e2e20a",
              backgroundImage:
                "repeating-linear-gradient(hsla(54,0%,88%,0.05) 0px, hsla(54,0%,88%,0.05) 2px,#01010133 2px, #01010133 4px)",
              backdropFilter: "blur(2.5px)"
            }}
          >
            <Typography className="text-shadow-red ml-6 font-neue-machina-semi text-[56px] text-error-main">
              NAKA PASS SS II
            </Typography>
          </Box>
        </div>
        <div className="col-span-1 grid content-between rounded-2xl border border-neutral-700 bg-neutral-900 p-[10px]">
          <div className="flex h-[53px] items-center justify-center rounded-[6px] bg-secondary-main text-default uppercase text-black-100">
            Season II
          </div>
          <div className="flex h-[53px] items-center justify-center rounded-[6px] border border-neutral-700 bg-neutral-800 text-xs uppercase text-black-100">
            <Typography className="text-xs text-secondary-main">2w</Typography>
            <Typography className="m-3 text-xs text-secondary-main">
              1d
            </Typography>
            <Typography className="text-xs text-neutral-400">
              24 : 00 : 45
            </Typography>
          </div>
        </div>
        <div className="col-span-1 grid content-between rounded-2xl border border-neutral-780 bg-neutral-900 p-[10px]">
          <div className="flex h-[64px] items-center justify-between rounded-[6px] border border-neutral-700 bg-neutral-800 pr-4 pl-2 text-default uppercase text-black-100">
            <ButtonIcon
              variants={iconmotion}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 400, damping: 4 }}
              icon={<GiftIcon />}
              className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-[4px] border border-neutral-700 bg-neutral-800"
            />
            <Typography className="font-digital-7 text-[26px] text-varidian-default">
              {text}
            </Typography>
          </div>
          <ButtonToggleIcon
            endIcon={<IconArrowRight stroke="#000000" />}
            handleClick={() => {}}
            type="submit"
            startIcon={null}
            text="Collect Rewards"
            className="h-[40px] w-full bg-varidian-default font-bold capitalize text-black-100 "
          />
        </div>
      </div>
      <motion.div className="h-[188px] w-[140px] rounded-2xl border border-neutral-700 bg-neutral-900">
        <div className="relative">
          <CrumbCustom
            text=" item name"
            background="absolute bg-neutral-900 m-2 text-neutral-400 border border-solid border-neutral-700 p-[20px] mr-4"
          />
          <div className="flex h-[128px] items-center justify-center p-6">
            <GiftIcon />
          </div>
        </div>

        <div className="m-2 flex justify-between">
          <div className="flex h-[40px] w-[70px] items-center justify-center rounded-[6px] border border-solid border-neutral-700 bg-neutral-800 text-neutral-400">
            x1
          </div>
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[6px] border border-solid border-neutral-700 bg-neutral-800 text-neutral-400">
            <ShapeIcon fill="#4E5057" />
          </div>
        </div>
      </motion.div>
      <Tagline
        className="my-0 mt-4 mb-4"
        text="Continue playing story mode to earn rewards."
        bgColor="bg-neutral-800"
        icon={<ShapeIcon fill="#4E5057" />}
        textColor="font-bold text-sm text-neutral-600"
      />
    </>
  )
}

export default NakaPassPage
