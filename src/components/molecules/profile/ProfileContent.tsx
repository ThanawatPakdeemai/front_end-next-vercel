import React from "react"
import CrumbCustom from "@components/atoms/CrumbCustom"
import SettingIcon from "@components/icons/SettingIcon"
import ShapeIcon from "@components/icons/ShapeIcon"
import TableIcon from "@components/icons/TableIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import Tagline from "@components/molecules/tagline/Tagline"
import { Divider, Typography } from "@mui/material"
import IconArrowLeft from "@components/icons/arrowLeftIcon"
import IconArrowRight from "@components/icons/arrowRightIcon"
import useProfileStore from "@stores/profileStore"

const ProfileContent = () => {
  const profile = useProfileStore((state) => state.profile.data)
  // console.log(profile)

  return (
    <div>
      <div className="relative">
        <div className="h-[180px] rounded-lg bg-neutral-700">img</div>
        <div className="absolute top-0 right-0 m-4">
          <ButtonToggleIcon
            handleClick={() => {}}
            startIcon={<SettingIcon />}
            text="Edit Profile"
            className="z-[2] h-[50px] w-[148px] bg-neutral-900 font-bold capitalize text-white-default"
          />
        </div>
      </div>
      <div className="relative">
        <Tagline
          className="my-0 mt-4 mb-4"
          text="Nakamoto.Games - Secue. fun. simple. earn $naka AND enjoy"
          bgColor="bg-error-main"
          icon={<ShapeIcon />}
          textColor="text-neutral-900"
        />
        <div className="flex w-full justify-center">
          <div className="absolute bottom-[-50px] z-10 h-[150px] w-[150px] rounded-3xl border-8 border-neutral-900 bg-neutral-700">
            img profile
          </div>
        </div>
      </div>
      <div className="flex h-full justify-center">
        <TableIcon className="absolute" />
      </div>
      <div className="mt-[50px] flex w-full justify-center">
        <Typography className="text-[46px] text-error-main shadow-error-main  drop-shadow-lg drop-shadow-xl">
          Desingner Game
        </Typography>
      </div>
      <div className="flex w-full justify-center">
        <Typography className="text-xs uppercase text-error-main">
          Joined : Sep 2021
        </Typography>
      </div>
      <div className="flex justify-center">
        <div className="mt-[50px] grid w-[50%] grid-cols-3 gap-4">
          <div className="h-[110px] w-[190px] rounded-lg	border border-solid border-neutral-700 p-[20px]">
            <Typography className="font-digital-7 text-[26px] text-error-main ">
              356
            </Typography>
            <Typography className="mt-[10px] text-xs uppercase">
              total Matches
            </Typography>
          </div>
          <div className=" h-auto w-[180px] rounded-lg	border p-[20px]">
            <Typography className="text-[26px]">356</Typography>
            <div className="flex">
              <Typography className="mt-[10px] text-xs uppercase">
                total Matches
              </Typography>
            </div>
          </div>
          <div className="h-auto w-[180px] rounded-lg	border p-[20px]">
            <Typography className="text-[26px]">356</Typography>
            <div className="flex">
              <Typography className="mt-[10px] text-xs uppercase">
                total Matches
              </Typography>
            </div>
          </div>
          <div className="h-[110px] w-[190px] rounded-lg border border-solid border-neutral-700 p-[20px]">
            <div className="grid grid-cols-2">
              <div>
                <Typography className="font-digital-7 text-[26px] text-secondary-main">
                  2
                </Typography>
                <Typography className="mt-[10px] text-xs uppercase">
                  Platinum
                </Typography>
              </div>
              <div className="grid content-center	justify-center	">
                <SettingIcon />
              </div>
            </div>
          </div>
          <div className="h-[110px] w-[190px] rounded-lg border border-solid border-neutral-700 p-[20px]">
            <div className="grid grid-cols-2">
              <div>
                <Typography className="font-digital-7 text-[26px] text-secondary-main">
                  2
                </Typography>
                <Typography className="mt-[10px] text-xs uppercase">
                  Silver
                </Typography>
              </div>
              <div className="grid content-center	justify-center	">
                <SettingIcon />
              </div>
            </div>
          </div>
          <div className="">06</div>
        </div>
      </div>
      <div className="mt-[90px] flex items-center justify-between">
        <div className="flex">
          <CrumbCustom
            text="My emblems are more than just symbols"
            background="text-neutral-400 border border-solid border-neutral-700 p-[20px] mr-4"
          />
          <CrumbCustom
            text="3 Badges"
            background=" bg-error-main"
          />
        </div>
        {/* <div className="mx-4 border-t border-neutral-700 border-opacity-80" /> */}
        <Divider className="w-[40%]" />
        <div className="flex">
          <div className="mr-4 self-center text-xs uppercase">
            Hide my emblems
          </div>
          <CrumbCustom
            text="View Emblems info"
            background="bg-purple-primary"
          />
        </div>
      </div>
      <div className="mt-[30px] h-[216px] rounded-lg bg-neutral-700">test</div>
      <div className="arrow-slick-container bg-black mt-8 grid h-10 w-[100px] grid-cols-2 divide-x divide-neutral-700 rounded-md border border-neutral-700 text-white-primary">
        <button
          type="button"
          className="flex h-full w-full items-center justify-center"
          // onClick={() => onClickedPrev()}
        >
          <IconArrowLeft />
        </button>
        <button
          type="button"
          className="flex h-full w-full items-center justify-center"
          // onClick={() => onClickedNext()}
        >
          <IconArrowRight />
        </button>
      </div>
      <div />
    </div>
  )
}

export default ProfileContent
