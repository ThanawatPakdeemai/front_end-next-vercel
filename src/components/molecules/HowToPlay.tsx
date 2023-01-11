import IconCustoms from "@components/atoms/IconCustom"
import FavouriteIcon from "@components/icons/HowToPlayIcon/FavouriteIcon"
import HowToPlayIcon from "@components/icons/HowToPlayIcon/HowToPlayIcon"
import ShareIcon from "@components/icons/HowToPlayIcon/ShareIcon"
import useGetGames from "@feature/home/containers/hook/useGetGames"
import { Divider, Typography } from "@mui/material"
import { useEffect, useState } from "react"

interface IProps {
  title: string
  details: string
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

const Howto = ({ title, details }: IProps) => {
  // useState
  const [device, setDevice] = useState<IGameDevice[]>([])
  const [browser, setBrowser] = useState<IGameBrowser[]>([])
  const [data, setData] = useState<any>()

  const { slideGames, isLoading } = useGetGames()

  useEffect(() => {
    let cancel = false
    if (slideGames) {
      setData(slideGames[0])
      setDevice(slideGames[0].device_support)
      setBrowser(slideGames[0].browser_support)
      return () => {
        cancel = true
      }
    }
  }, [slideGames])

  return (
    <>
      <div className="mb-3 flex flex-col items-center justify-between rounded-2xl bg-[#1d2029] p-5  xl:flex-row">
        <div className="mb-2 flex flex-col items-center gap-2 md:flex-row md:gap-0 xl:mb-0">
          <div className="xs:mb-[20px] flex items-center justify-center">
            <Typography className="text-sm uppercase">
              <span className=" text-neutral-600">Game: </span>
              <span className="text-neutral-400">{data && data.name}</span>
            </Typography>
            <div className="mx-2 h-3 border-[1px] border-solid border-neutral-600" />
            <Typography className="text-sm uppercase">
              <span className=" text-neutral-600">Assets: </span>
              <span className="text-neutral-400">
                {data ? data.item[0].name : null}
              </span>
            </Typography>
            <div className="mx-2 h-3 border-[1px] border-solid border-neutral-600" />
          </div>
          <div className="xs:mb-[20px] flex items-center justify-center">
            <Typography className="text-sm">
              <span className="uppercase text-neutral-600">
                {device && device.length > 0 && "devices:"}
              </span>
            </Typography>
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
            ))}{" "}
            <div className="mx-2 h-3 border-[1px] border-solid border-neutral-600" />
            <Typography className="text-sm">
              <span className="uppercase text-neutral-600">
                {browser && browser.length > 0 && "browsers:"}
              </span>
            </Typography>
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
          {/* <div
              onClick={() => {
                onPresent(HowToPlay(title, details))
              }}
              className="text-1 cursor-pointer"
            > */}
          <Typography className="flex text-sm text-neutral-400">
            <HowToPlayIcon
              color="#FFFFFF"
              className="mr-2"
            />
            How to play
          </Typography>
          <div className="mx-5 h-3 border-[1px] border-solid border-neutral-600" />
          <Typography className="flex text-sm text-neutral-400">
            <ShareIcon
              color="#FFFFFF"
              className="mr-2"
            />
            Share
          </Typography>
          <div className="mx-5 h-3 border-[1px] border-solid border-neutral-600" />
          <Typography className="flex text-sm text-neutral-400">
            <FavouriteIcon
              color="#FFFFFF"
              className="mr-2"
            />
            Add to favourite
          </Typography>
        </div>
      </div>
    </>
  )
}
export default Howto
