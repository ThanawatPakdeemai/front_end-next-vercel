/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React from "react"
import ButtonLink from "@components/atoms/button/ButtonLink"
import FavouriteColorIcon from "@components/icons/HowToPlayIcon/FavouriteColorIcon"
import FavouriteIcon from "@components/icons/HowToPlayIcon/FavouriteIcon"
import useFavoriteGameContoller from "@feature/favourite/containers/hooks/useFavoriteGameContoller"
import {
  IGame,
  IGameBrowser,
  IGameDevice
} from "@feature/game/interfaces/IGameService"
import useGlobal from "@hooks/useGlobal"
import { Image } from "@components/atoms/image/index"
import TooltipsCustom from "@components/atoms/TooltipsCustom"
import { useTranslation } from "react-i18next"
import ShareToEarn from "@components/atoms/ShareToEarn"

interface IProp {
  data: IGame
}

const Howto = ({ data }: IProp) => {
  const { stateProfile } = useGlobal()

  const { t } = useTranslation()

  const { onClickFavouriteButton, favouriteStatus } = useFavoriteGameContoller({
    playerId: stateProfile?.id ?? "",
    gameId: data?.id ?? ""
  })

  return (
    <div className="game-mini__navbar mb-3 flex max-h-[52px] flex-col items-center  justify-between rounded-2xl border-[1px] border-neutral-800 bg-neutral-780 p-2 md:p-5 xl:flex-row">
      <div className="mb-2 flex flex-col items-center gap-2 md:flex-row md:gap-0 xl:mb-0">
        <div className="xs:mb-[20px] flex items-center justify-center p-2  md:p-0">
          <div className="text-sm uppercase">
            <span className="text-neutral-600">{t("game")}: </span>
            <span className="text-neutral-400">{data && data.name}</span>
          </div>
          <div className="mx-2 h-3 border-[1px] border-solid border-neutral-600" />
          <div className="text-sm uppercase">
            <span className=" text-neutral-600">{t("assets")}: </span>
            <span className="text-neutral-400">
              {data && data.item && data.item.length > 0
                ? t(data.item[0].name)
                : null}
            </span>
          </div>
          <div className="mx-2 hidden h-3 border-[1px] border-solid border-neutral-600 sm:block" />
        </div>
        <div className="xs:mb-[20px] flex flex-col items-center justify-center gap-2 sm:flex-row">
          <div className="text-sm">
            <span className="uppercase text-neutral-600">
              {`${
                data.device_support &&
                data.device_support.length > 0 &&
                t("devices")
              }:`}
            </span>
          </div>
          <div
            className="flex"
            style={{ direction: "rtl" }}
          >
            {data.device_support &&
              data.device_support.length > 0 &&
              data.device_support.map((item: IGameDevice) => (
                <>
                  {item.key === "mobile" && item.supported ? (
                    <TooltipsCustom
                      id={item.key}
                      title={item.name}
                      color="primary"
                      placement="top"
                    >
                      <Image
                        src="/assets/icons/social_icon/phoneNotchSuccess.svg"
                        width={12}
                        height={20}
                        alt="mobile"
                        className="ml-3 cursor-pointer"
                      />
                    </TooltipsCustom>
                  ) : item.key === "desktop" && item.supported ? (
                    <TooltipsCustom
                      id={item.key}
                      title={item.name}
                      color="primary"
                      placement="top"
                    >
                      <Image
                        src="/assets/icons/social_icon/desktopSuccess.svg"
                        width={20}
                        height={17}
                        alt="desktop"
                        className="ml-3 cursor-pointer"
                      />
                    </TooltipsCustom>
                  ) : (
                    <></>
                  )}
                </>
              ))}
          </div>
          <div className="mx-2 hidden h-3 border-[1px] border-solid border-neutral-600 sm:block" />
          <div className="text-sm">
            <span className="uppercase text-neutral-600">
              {`${
                data.browser_support &&
                data.browser_support.length > 0 &&
                t("browsers")
              }:`}
            </span>
          </div>
          <div className="flex">
            {data.browser_support &&
              data.browser_support.length > 0 &&
              data.browser_support.map((item: IGameBrowser) => (
                <>
                  <TooltipsCustom
                    id={item.key}
                    title={item.name}
                    color="primary"
                    placement="top"
                  >
                    {item.key === "safari" && item.supported ? (
                      <Image
                        src="/assets/icons/social_icon/safariSuccess.svg"
                        width={18}
                        height={34}
                        alt="safari"
                        className="ml-3 cursor-pointer"
                      />
                    ) : item.key === "chrome" && item.supported ? (
                      <Image
                        src="/assets/icons/social_icon/chromeSuccess.svg"
                        width={18}
                        height={34}
                        alt="chrome"
                        className="ml-3 cursor-pointer"
                      />
                    ) : item.key === "edge" && item.supported ? (
                      <Image
                        src="/assets/icons/social_icon/edgeSuccess.svg"
                        width={18}
                        height={34}
                        alt="edge"
                        className="ml-3 cursor-pointer"
                      />
                    ) : item.key === "firefox" && item.supported ? (
                      <Image
                        src="/assets/icons/social_icon/firefoxSuccess.svg"
                        width={18}
                        height={34}
                        alt="firefox"
                        className="ml-3 cursor-pointer"
                      />
                    ) : item.key === "opera" && item.supported ? (
                      <Image
                        src="/assets/icons/social_icon/operaSuccess.svg"
                        width={18}
                        height={34}
                        alt="opera"
                        className="ml-3 cursor-pointer"
                      />
                    ) : (
                      <></>
                    )}
                  </TooltipsCustom>
                </>
              ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end ">
        <ShareToEarn id={data.id} />
        <div className="mx-5 hidden h-3 border-[1px] border-solid border-neutral-600 md:block" />
        <ButtonLink
          onClick={() => onClickFavouriteButton()}
          text={favouriteStatus ? t("delete_favourite") : t("add_to_favourite")}
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
  )
}
export default Howto
