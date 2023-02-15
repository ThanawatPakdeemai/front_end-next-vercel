import React, { memo } from "react"
import KeyboardTabOutlinedIcon from "@mui/icons-material/KeyboardTabOutlined"
import useGameStore from "@stores/game"
import { Image } from "@components/atoms/image"

interface IProp {
  title: string
}

const FromWallet = ({ title }: IProp) => {
  const game = useGameStore((state) => state.data)

  return (
    <>
      {game && (
        <form>
          <p className="mb-2 text-sm uppercase text-neutral-500">
            I want to {title}
          </p>
          <div className="my-2 flex w-full justify-between rounded-xl border border-neutral-700 bg-neutral-800 p-4">
            <div className="flex items-baseline">
              <Image
                src="/images/Profile/Wallet/LogoMaster-sv.svg"
                alt=""
                width="30"
                height="30"
              />
              <p className="ml-2 text-neutral-500">Enter amount </p>
            </div>
            <p className="pr-2 text-white-default">ALL</p>
          </div>
          <p className="mb-4 text-xs uppercase text-neutral-500">
            your naka storage :
            <span className="uppercase text-purple-primary">
              {" "}
              340,398.654 NAKA
            </span>
          </p>

          <div className="my-2 w-full text-end">
            <button
              className={`flex  w-full justify-center rounded-3xl p-3 ${
                title === "withdraw"
                  ? "bg-red-card text-neutral-100"
                  : "bg-varidian-default text-black-100"
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
