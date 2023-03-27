import ButtonLink from "@components/atoms/button/ButtonLink"
import IconCustoms from "@components/atoms/IconCustom"
import FavouriteColorIcon from "@components/icons/HowToPlayIcon/FavouriteColorIcon"
import FavouriteIcon from "@components/icons/HowToPlayIcon/FavouriteIcon"
import ShareIcon from "@components/icons/HowToPlayIcon/ShareIcon"
import useFavoriteGameContoller from "@feature/favourite/containers/hooks/useFavoriteGameContoller"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGlobal from "@hooks/useGlobal"
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
  // State
  const [device, setDevice] = useState<IGameDevice[]>([])
  const [browser, setBrowser] = useState<IGameBrowser[]>([])
  const { stateProfile } = useGlobal()
  const { onClickFavouriteButton, favouriteStatus } = useFavoriteGameContoller({
    playerId: stateProfile?.id ?? "",
    gameId: data?.id ?? ""
  })

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let cancel = false
    if (data) {
      setDevice(data.device_support)
      setBrowser(data.browser_support)
    }
    return () => {
      cancel = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <div className="mb-3 flex flex-col items-center justify-between rounded-2xl bg-neutral-800 p-2 md:p-5 xl:flex-row">
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
                    support={item.supported}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end lg:flex-nowrap">
          <div className="md flex flex-[1_1_150px] items-center justify-center text-sm text-neutral-400 md:flex-none">
            <ShareIcon
              color="#FFFFFF"
              className="mr-2"
            />
            Share
          </div>
          <div className="mx-5 hidden h-3 border-[1px] border-solid border-neutral-600 md:block" />
          <ButtonLink
            onClick={() => onClickFavouriteButton()}
            text={favouriteStatus ? "Delete Favourite" : "Add to Favourite"}
            icon={
              favouriteStatus ? (
                <FavouriteColorIcon className="mr-2" />
              ) : (
                <FavouriteIcon
                  color="#0b0b0b"
                  className="mr-2"
                />
              )
            }
            size="medium"
            color="secondary"
            variant="contained"
            className="md h-[34px] flex-[1_1_100%] items-center justify-center !bg-transparent text-sm text-neutral-400 md:justify-end"
            sxCustomStyled={{
              "&:hover": {
                background: "transparent!important",
                boxShadow: "none!important"
              }
            }}
          />
        </div>
      </div>
    </>
  )
}
export default Howto
