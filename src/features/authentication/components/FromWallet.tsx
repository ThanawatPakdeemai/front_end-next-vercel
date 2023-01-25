import React, { memo, useState } from "react"
import ButtonLink from "@components/atoms/button/ButtonLink"
import DropdownList from "@components/atoms/DropdownList"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import KeyboardTabOutlinedIcon from "@mui/icons-material/KeyboardTabOutlined"
import useGameStore from "@stores/game"
import { CURENCY } from "@configs/dropdown"
import Image from "next/image"

interface IProp {
  title: string
}

const FromWallet = ({ title }: IProp) => {
  const game = useGameStore((state) => state.data)

  return (
    <>
      {game && (
        <form>
          <p className="mb-2 text-sm uppercase text-[#70727B]">
            I want to {title}
          </p>
          <div className="my-2 flex w-full justify-between rounded-xl border border-[#232329] p-4">
            <div className="flex items-baseline">
              <Image
                src="/images/Profile/Wallet/LogoMaster-sv.svg"
                alt=""
                width="30"
                height="30"
              />
              <p className="ml-2 text-[#70727B]">Enter amount </p>
            </div>
            <p className="pr-2 text-[#ffffff]">ALL</p>
          </div>
          <p className="mb-4 text-xs uppercase text-[#70727B]">
            your naka storage :
            <span className="uppercase text-[#7B5BE6]"> 340,398.654 NAKA</span>
          </p>

          <div className="my-2 w-full text-end">
            <button
              className={`flex  w-full justify-center rounded-3xl p-3 ${
                title === "withdraw"
                  ? "bg-[#F42728] text-[#efefef]"
                  : "bg-[#3DCD95] text-[#000000]"
              }`}
              type="submit"
            >
              <div
                className={`${
                  title === "withdraw" ? "rotate-[-90deg]" : "rotate-90"
                }`}
              >
                <KeyboardTabOutlinedIcon />
              </div>
              <p className="ml-4 mr-2 font-bold ">{title}</p>
            </button>
          </div>
        </form>
      )}
    </>
  )
}
export default memo(FromWallet)
