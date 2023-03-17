// import { useTranslation } from "next-i18next"
import { ImageCustom } from "@components/atoms/image/Image"
import ILogoMaster from "@components/icons/LogoMaster"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { Box, Checkbox, Chip, Typography } from "@mui/material"
import { motion } from "framer-motion"
import { memo } from "react"
// import GiftIcon from "@components/icons/GiftIcon"
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined"
import LockIcon from "@components/icons/LockIcon"
// import useGameStore from "@stores/game"
// import useProfileStore from "@stores/profileStore"
// import useGetNakaPass from "../containers/hooks/useGetNakaPass"
const label = { inputProps: { "aria-label": "Checkbox Claim Item" } }

const NakaPassStoryMode = () => (
  // const { data: gameData } = useGameStore()
  // const profile = useProfileStore((state) => state.profile.data)
  // const { t } = useTranslation()

  // const { nakaPassData } = useGetNakaPass({
  //   game_id: gameData?.id ?? "",
  //   player_id: profile?.id ?? ""
  // })

  <>
    <div className="mb-3 mt-4 flex w-full flex-wrap items-center gap-[10px] rounded-2xl bg-neutral-780 p-2 md:mt-0 md:flex-row md:gap-0 lg:h-[148px] lg:max-w-full lg:flex-nowrap">
      <div className="flex h-[100px] flex-[1_1_100%] items-center rounded-2xl border border-neutral-700 bg-primary-main sm:h-[132px]  lg:basis-8/12">
        <Box className="bg-line-linear-gradient flex h-full w-full  items-center justify-center rounded-[13px] text-center uppercase">
          <Typography className="text-shadow-red font-neue-machina-semi text-[26px] text-error-main md:text-[56px]">
            NAKA PASS SS II
          </Typography>
        </Box>
      </div>

      <div className="h-[-webkit-fill-available] flex-[1_1_calc(50%-5px)] rounded-2xl border border-neutral-700 bg-primary-main p-[10px] sm:basis-3/12 md:mx-2 md:basis-2/12">
        <div className="mb-[10px] flex h-[50px] items-center justify-center rounded-sm  bg-secondary-main p-1 font-neue-machina-semi text-[80%] uppercase text-neutral-800 md:text-base">
          season II
        </div>
        <div className="flex h-[50px] flex-wrap items-center justify-evenly rounded-sm bg-neutral-780 p-1 text-center font-neue-machina-bold text-sm text-neutral-800 sm:flex-nowrap sm:text-left">
          <span className=" flex-1 text-secondary-main sm:flex-none">2W</span>
          <span className=" flex-1 text-secondary-main sm:flex-none">1D</span>
          <span className=" flex-[1_1_100%] text-neutral-400 sm:flex-none">
            24 : 00 :45
          </span>
        </div>
      </div>
      <div className="h-[-webkit-fill-available] flex-[1_1_calc(50%-5px)] rounded-2xl border border-neutral-700 bg-primary-main p-[10px] sm:basis-3/12 md:basis-2/12">
        <div className=" rounded-sm bg-neutral-780 px-3 ">
          <div className="mb-[10px]  flex h-[60px] items-center justify-between ">
            <div className=" flex h-[45px] w-[45px] items-center justify-center rounded border border-neutral-700 bg-neutral-700 ">
              <ImageCustom
                src="/assets/icons/present.svg"
                alt="present"
                width="25"
                className="text-shadow-red"
              />
            </div>
            <Typography className=" font-digital-7 text-3xl text-green-card">
              3
            </Typography>
          </div>
        </div>
        <ButtonToggleIcon
          handleClick={() => ""}
          startIcon=""
          endIcon={<div className="ml-4" />}
          text=" Collect Rewards"
          className="btn-green-rainbow z-[2] h-[40px] w-[-webkit-fill-available] bg-varidian-default  p-2 text-sm font-bold capitalize !text-primary-main"
          type="button"
        />
      </div>
    </div>

    <div className="flex w-full flex-row flex-wrap items-center rounded-2xl bg-neutral-780 p-2 md:h-[225px] md:flex-nowrap">
      <div className="w-full rounded-2xl border  border-neutral-700 bg-primary-main p-[10px] sm:w-[202px] md:h-[-webkit-fill-available]">
        <div className="bg-line-linear-gradient  mb-[10px] flex h-[136px] items-center justify-center rounded-sm border border-neutral-700 ">
          <ILogoMaster
            width="100"
            height="48"
            className="svg-shadow-red"
          />
        </div>
        <div className=" flex h-[40px] items-center justify-center rounded-sm border border-neutral-700  font-digital-7">
          <span className=" mr-2 text-2xl text-green-card">3 </span>
          <span className=" text-2xl text-error-main">: 25</span>
        </div>
      </div>

      {/* lg:w-[920px] */}
      <div className="ml-2 mt-2 h-[-webkit-fill-available] overflow-hidden sm:w-[calc(100%-210px)] md:flex-auto">
        <div className="custom-scroll-line-green flex items-center gap-2 overflow-x-scroll">
          {/* max-sm:w-[230px] */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ele, index) => (
            <motion.div
              className=" mb-2 h-[188px]  rounded-2xl border border-neutral-700 bg-neutral-900"
              key={Number(index)}
            >
              <div className="relative">
                <Chip
                  size="small"
                  label={
                    <Typography className="  font-neue-machina text-xs uppercase  text-neutral-400 ">
                      item name
                    </Typography>
                  }
                  className="!absolute left-2 top-2 !h-[20px] rounded-less
                  border border-solid border-neutral-700 bg-neutral-900 px-[2px] py-[12px] "
                />
                <div className="flex h-[128px] items-center justify-center p-6">
                  <ImageCustom
                    src="/assets/icons/present.svg"
                    alt="present object-fill object-center"
                    className="pt-5"
                    width="57"
                    height="61"
                  />
                </div>
              </div>

              <div className="m-2 flex justify-between gap-2">
                <div className="flex h-[40px] w-[70px] items-center justify-center rounded-[6px] border border-solid border-neutral-700 bg-neutral-800 text-sm text-neutral-400">
                  x1
                </div>
                <div
                  className={`${ele} ${
                    ele === 1 ? "border border-green-card " : ""
                  } flex h-[40px] w-[40px] items-center justify-center rounded-[6px] border border-solid border-neutral-700 bg-neutral-800 text-neutral-400`}
                >
                  {ele === 1 && (
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{
                        "svg": {
                          fill: "#5DBE74"
                        }
                      }}
                      className="border  fill-green-card"
                      color="success"
                    />
                  )}
                  {ele === 2 && <DoneAllOutlinedIcon />}
                  {ele > 2 && <LockIcon fill="#4E5057" />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </>
)

export default memo(NakaPassStoryMode)
