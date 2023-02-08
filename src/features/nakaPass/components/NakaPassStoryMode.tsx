// import { useTranslation } from "next-i18next"
import { ImageCustom } from "@components/atoms/image/Image"
import ILogoMaster from "@components/icons/LogoMaster"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { Typography } from "@mui/material"
import { memo } from "react"

const NakaPassStoryMode = () => (
  // const { t } = useTranslation()
  <>
    <div className="mb-3 flex h-[148px] w-full flex-row items-center rounded-2xl bg-neutral-780 p-2">
      <div className="flex h-[-webkit-fill-available] basis-8/12 items-center  rounded-2xl bg-primary-main">
        <Typography className="text-shadow-red ml-6 font-neue-machina-semi text-[56px] text-error-main">
          NAKA PASS SS II
        </Typography>
      </div>

      <div className="mx-2 h-[-webkit-fill-available] basis-2/12 rounded-2xl bg-primary-main ">
        <div className="text-md m-2 flex h-[54px] items-center justify-center  rounded-sm bg-secondary-main p-1 font-neue-machina-semi uppercase text-neutral-800">
          season II
        </div>
        <div className="m-2 flex  h-[54px] items-center justify-evenly rounded-sm bg-neutral-780 p-1 font-neue-machina-bold text-sm text-neutral-800">
          <span className=" text-secondary-main">2W</span>
          <span className=" text-secondary-main">1D</span>
          <span className=" text-neutral-400">24 : 00 :45</span>
        </div>
      </div>
      <div className="h-[-webkit-fill-available] basis-2/12 rounded-2xl bg-primary-main ">
        <div className="m-2 flex h-[96px] items-center justify-between rounded-sm bg-neutral-780 px-3 ">
          <div className="flex  h-[50px] w-[50px] items-center justify-center rounded border border-neutral-700 bg-neutral-700 ">
            <ImageCustom
              src="/assets/icons/present.svg"
              alt="present"
              width="25"
            />
          </div>
          <Typography className=" font-digital-7 text-3xl text-green-card">
            3
          </Typography>
        </div>
        <ButtonToggleIcon
          handleClick={() => ""}
          startIcon=""
          endIcon={<div className="ml-4" />}
          text=" Collect Rewards"
          className="btn-green-rainbow z-[2] mx-2 h-[40px] w-[-webkit-fill-available] bg-varidian-default  p-2 text-sm font-bold capitalize !text-primary-main"
          type="button"
        />
      </div>
    </div>

    <div className="flex h-[225px] w-full flex-row items-center rounded-2xl bg-neutral-780 p-2">
      <div className=" h-[-webkit-fill-available] basis-3/12 rounded-2xl bg-primary-main">
        <div className=" m-3 flex h-[130px] items-center justify-center rounded-sm border border-neutral-700 ">
          <ILogoMaster
            width="100"
            height="48"
          />
        </div>
        <div className="m-3 flex h-[40px]   items-center justify-center rounded-sm border border-neutral-700  font-digital-7">
          <span className=" mr-2 text-2xl text-green-card">3 </span>
          <span className=" text-2xl text-error-main">: 25</span>
        </div>
      </div>

      <div className=" ml-2 h-[-webkit-fill-available] basis-9/12 rounded-2xl bg-primary-main">
        <div className=" h-[188px] w-[140px] rounded-md bg-primary-main">
          dd
        </div>
      </div>
    </div>
  </>
)

export default memo(NakaPassStoryMode)
