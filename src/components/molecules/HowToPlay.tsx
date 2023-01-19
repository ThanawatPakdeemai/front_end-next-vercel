import IconCustoms from "@components/atoms/IconCustom"
import FavouriteIcon from "@components/icons/HowToPlayIcon/FavouriteIcon"
import HowToPlayIcon from "@components/icons/HowToPlayIcon/HowToPlayIcon"
import ShareIcon from "@components/icons/HowToPlayIcon/ShareIcon"
import { IGame } from "@feature/game/interfaces/IGameService"
import { useEffect, useState } from "react"

interface IProp {
  data: IGame
}

export interface IGameDevice {
  key: string
  name: string
  supported: boolean
}

export interface IGameBrowser {
  key: string
  name: string
  supported: boolean
}

export interface IIconCustoms {
  icon_key: string
  name: string
  support: boolean
}

const Howto = ({ data }: IProp) => {
  // useState
  const [device, setDevice] = useState<IGameDevice[]>([])
  const [browser, setBrowser] = useState<IGameBrowser[]>([])

  useEffect(() => {
    // let cancel = false
    if (data) {
      setDevice(data.device_support)
      setBrowser(data.browser_support)
    }
    // return () => {
    //   cancel = true
    // }
  }, [data])

  //  <div
  //             onClick={() => {
  //               onPresent(HowToPlay(title, details))
  //             }}
  //             className="text-1 cursor-pointer"
  //           >
  return (
    <>
      <div className="mb-3 flex flex-col items-center justify-between rounded-2xl bg-neutral-800 p-5  xl:flex-row">
        <div className="mb-2 flex flex-col items-center gap-2 md:flex-row md:gap-0 xl:mb-0">
          <div className="xs:mb-[20px] flex items-center justify-center">
            <div className="text-sm uppercase">
              <span className=" text-neutral-600">Game: </span>
              <span className="text-neutral-400">{data && data.name}</span>
            </div>
            <div className="mx-2 h-3 border-[1px] border-solid border-neutral-600" />
            <div className="text-sm uppercase">
              <span className=" text-neutral-600">Assets: </span>
              <span className="text-neutral-400">
                {data && data.item && data.item.length > 0
                  ? data.item[0].name
                  : null}
              </span>
            </div>
            <div className="mx-2 h-3 border-[1px] border-solid border-neutral-600" />
          </div>
          <div className="xs:mb-[20px] flex items-center justify-center">
            <div className="text-sm">
              <span className="uppercase text-neutral-600">
                {device && device.length > 0 && "devices:"}
              </span>
            </div>
            {device.map((item: IGameDevice) => (
              <div
                key={item.key}
                className="ml-3 cursor-pointer"
              >
                <IconCustoms
                  icon_key={item.key}
                  name={item.name}
                  support={item.supported}
                />
              </div>
            ))}
            <div className="mx-2 h-3 border-[1px] border-solid border-neutral-600" />
            <div className="text-sm">
              <span className="uppercase text-neutral-600">
                {browser && browser.length > 0 && "browsers:"}
              </span>
            </div>
            {browser &&
              browser.length > 0 &&
              browser.map((item: IGameBrowser) => (
                <div
                  key={item.key}
                  className="ml-3 cursor-pointer"
                >
                  <IconCustoms
                    icon_key={item.key}
                    name={item.name}
                    support={item.supported}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="flex items-center justify-end ">
          <div className="flex items-center text-sm text-neutral-400">
            <HowToPlayIcon
              color="#FFFFFF"
              className="mr-2"
            />
            How to play
          </div>
          <div className="mx-5 h-3 border-[1px] border-solid border-neutral-600" />
          <div className="flex items-center text-sm text-neutral-400">
            <ShareIcon
              color="#FFFFFF"
              className="mr-2"
            />
            Share
          </div>
          <div className="mx-5 h-3 border-[1px] border-solid border-neutral-600" />
          <div className="flex items-center text-sm text-neutral-400">
            <FavouriteIcon
              color="#FFFFFF"
              className="mr-2"
            />
            Add to favourite
          </div>
        </div>
      </div>
    </>
  )
}
export default Howto
