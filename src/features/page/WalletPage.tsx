import Image from "next/image"
import RightMenuWallet from "@components/molecules/rightMenu/RightMenuWallet"
import Gas from "@components/molecules/Gas"
import INaka from "@components/icons/Naka"
import IBusd from "@components/icons/Busd"
import React, { useState, useEffect } from "react"
import { styled } from "@mui/material"
import MetamaskWallet from "@components/molecules/balance/MetamaskWallet"
import useProfileStore from "@stores/profileStore"
// import { ethers } from "ethers"
// import getWeb3NoAccount from "@src/utils/web3"

const KeyFramesRotate = styled("div")({
  "@keyframes rotation": {
    from: {
      transform: "rotate(359deg)"
    },
    to: {
      transform: "rotate(0deg)"
    }
  },
  animation: "rotation 10s infinite linear"
})

export default function WalletPage() {
  const { profile } = useProfileStore()
  const [type, setType] = useState<string>("NAKA")
  const [isConnected, setIsConnected] = useState<boolean>(false)

  const [haveMetamask, sethaveMetamask] = useState(true)

  const [client, setclient] = useState<any>({
    isConnected: false
  })
  const checkConnection = async () => {
    const { ethereum }: any = window
    if (ethereum) {
      sethaveMetamask(haveMetamask)
      const accounts = await ethereum.request({ method: "eth_accounts" })
      if (accounts.length > 0) {
        setIsConnected(true)
        setclient({
          isConnected: true,
          address: accounts[0]
        })
      } else {
        setclient({
          isConnected: false
        })
      }
    } else {
      sethaveMetamask(false)
    }
  }

  useEffect(() => {
    checkConnection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client])

  const handleConnectWallet = () => {
    setIsConnected(true)
  }

  const handleOnDisconnectWallet = () => {
    setIsConnected(false)
  }

  return (
    <>
      <div className="mx-2 grid w-full grid-cols-12 gap-4">
        <div className="col-span-8 flex h-full w-full justify-between">
          <div className="items-center uppercase">
            <p className="text-lg text-neutral-400">MY Wallet</p>
            <p className="text-xs text-neutral-600">
              Wallet manager for nakamoto.games world
            </p>
          </div>
          <div className="flex rounded-sm bg-neutral-700 p-2">
            <button
              type="button"
              className={`flex h-[50px] w-[130px] items-center rounded-sm
              ${
                type === "NAKA"
                  ? "bg-black-100 text-white-default"
                  : "bg-neutral-800 text-black-default"
              } p-4`}
              onClick={() => setType("NAKA")}
            >
              <div className="pr-2">
                <INaka />
              </div>
              <p className="m-auto">NAKA</p>
            </button>
            <button
              type="button"
              className={`ml-2 flex h-[50px] w-[130px] items-center rounded-sm ${
                type === "BUSD"
                  ? "bg-black-100 text-white-default"
                  : "bg-neutral-800 text-neutral-500"
              } p-4`}
              onClick={() => setType("BUSD")}
            >
              <div className=" pr-2">
                <IBusd />
              </div>
              <p className="m-auto">BUSD</p>
            </button>
          </div>
        </div>
        <div className="col-span-6 h-full w-full items-center justify-center gap-1 rounded-default bg-neutral-800">
          <div className="relative mx-2 grid w-full grid-cols-7 gap-1">
            <div className="col-span-5 m-2">
              <div className="mb-2 flex w-full flex-row items-center  justify-between gap-1 rounded-default bg-black-100 py-4">
                <div className="ml-2 flex flex-row items-center text-red-card">
                  <Image
                    src="/images/Profile/Wallet/battery.svg"
                    alt=""
                    width={25}
                    height={25}
                  />
                  <p className="mx-2 text-sm uppercase">NAKA hardware wallet</p>
                </div>
                <div className="flex h-[10px] w-[140px] flex-row items-center text-neutral-700">
                  <p>signal</p>
                  <Image
                    src="/images/Profile/Wallet/signal-tube.svg"
                    alt=""
                    width={70}
                    height={10}
                  />
                </div>
              </div>
              <div className="relative mb-2 flex w-full flex-col gap-1 rounded-default bg-black-100 p-8">
                <p className="text-sm uppercase text-neutral-600">
                  Your NAKA in storage{" "}
                </p>
                <div className="mb-4 flex w-[250px] items-center">
                  <Image
                    src={
                      type === "NAKA"
                        ? "/images/Profile/Wallet/Subtract.svg"
                        : "/images/Profile/Wallet/BUSD.svg"
                    }
                    alt=""
                    width={type === "NAKA" ? 40 : 30}
                    height={type === "NAKA" ? 40 : 30}
                    className={type === "NAKA" ? "" : "mr-2"}
                  />
                  <p
                    className={`font-digital ml-2 text-2xl ${
                      type === "NAKA" ? " text-NAKA " : "text-BUSD"
                    }
                  `}
                  >
                    340,395.8 {type}
                  </p>
                </div>
                <Image
                  src="/images/Profile/Wallet/Vector.svg"
                  alt=""
                  width={325}
                  height={325}
                  className="mb-2"
                />
                <Image
                  src="/images/Profile/Wallet/GM-Designer-Game.svg"
                  alt=""
                  width={225}
                  height={225}
                />

                <div className="absolute top-2 right-2">
                  <KeyFramesRotate>
                    <Image
                      src="/images/Profile/Wallet/StickerSolid.svg"
                      alt=""
                      width={70}
                      height={70}
                    />
                  </KeyFramesRotate>
                </div>
              </div>
              <div className="mb-4 flex w-full justify-end">
                <RightMenuWallet title="withdraw" />
                <RightMenuWallet title="Deposit" />
              </div>
              <div className="mt-6 grid w-full grid-cols-12 gap-2">
                <div className="col-span-7 rounded-xl border-2 border-black-800 text-center ">
                  <p className="pt-1 uppercase text-black-800">
                    NAKA storage model:S
                  </p>
                </div>
                <div className="col-span-5 flex  h-[30px] content-center items-center justify-between rounded-[6px] bg-black-100 p-2">
                  <div className=" border-1 mr-1 rounded-[5px] bg-neutral-800 py-2 px-1">
                    <Image
                      src="/images/Profile/Wallet/LogoMaster.svg"
                      alt=""
                      width={35}
                      height={35}
                    />
                  </div>
                  <div className="">
                    {isConnected ? (
                      <div
                        className="wavy-line wavy-line-green"
                        data-text="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''"
                      />
                    ) : (
                      <div
                        className="wavy-line-DS wavy-line-DS"
                        data-text="''''''''''''''''''''''''''''''''''''''''''''"
                      />
                    )}
                  </div>
                  <div className="border-1 ml-1 rounded-[5px] bg-neutral-800 py-1 px-1">
                    {isConnected ? (
                      <Image
                        src="/images/Profile/Wallet/MetaMask.svg"
                        alt=""
                        width={35}
                        height={35}
                      />
                    ) : (
                      <Image
                        src="/images/Profile/Wallet/MetaMaskDS.svg"
                        alt=""
                        width={35}
                        height={35}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 m-2 flex">
              <Image
                src="/images/Profile/Wallet/Frame.png"
                alt=""
                width={120}
                height={80}
                className="mr-2"
              />
              {/* <Image
                src="/images/Profile/Wallet/WORM.png"
                alt=""
                width={20}
                height={20}
                className="mr-1"
              /> */}
              <div className="mr-2 flex h-[365px] justify-center rounded-sm border-4 border-black-900 bg-black-100 p-[2px]">
                <div className="loader">
                  <div className="loaderBar" />
                </div>
              </div>
            </div>
            <div className="absolute top-[75px] left-[-16px]">
              <Image
                src="/images/Profile/Wallet/Rectangle-red.svg"
                alt=""
                width={10}
                height={10}
                className="mb-2"
              />
              <Image
                src="/images/Profile/Wallet/Rectangle-black.svg"
                alt=""
                width={10}
                height={10}
                className=""
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 h-full w-full items-center justify-center gap-1 rounded-default bg-neutral-800">
          <Gas />
        </div>
        <div className="col-span-4 h-full w-full items-center justify-center gap-1">
          <MetamaskWallet
            isConnected={isConnected}
            handleConnectWallet={handleConnectWallet}
            handleOnDisconnectWallet={handleOnDisconnectWallet}
            profile={profile.data}
          />
        </div>
      </div>
    </>
  )
}
