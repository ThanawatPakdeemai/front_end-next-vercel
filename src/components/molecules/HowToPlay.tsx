/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState } from "react"
import ButtonLink from "@components/atoms/button/ButtonLink"
import FavouriteColorIcon from "@components/icons/HowToPlayIcon/FavouriteColorIcon"
import FavouriteIcon from "@components/icons/HowToPlayIcon/FavouriteIcon"
import useFavoriteGameContoller from "@feature/favourite/containers/hooks/useFavoriteGameContoller"
import {
  IGame,
  IGameBrowser,
  IGameDevice
} from "@feature/game/interfaces/IGameService"
import { useToast } from "@feature/toast/containers"
import { Box, Button, Stack } from "@mui/material"
import useGlobal from "@hooks/useGlobal"
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import usetournament from "@feature/tournament/containers/hooks/usetournament"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import Helper from "@utils/helper"
import Image from "next/image"
import TooltipsCustom from "@components/atoms/TooltipsCustom"
import { useRouter } from "next/router"
import { MESSAGES } from "@constants/messages"
import useShareToEarn from "@feature/game/containers/hooks/useShareToEarn"
import { iconmotion } from "@components/organisms/Footer"
import { useTranslation } from "react-i18next"
import ShareIcon from "@components/icons/HowToPlayIcon/ShareIcon"
import LinkIcon from "@mui/icons-material/Link"
import { ELocalKey } from "@interfaces/ILocal"

interface IProp {
  data: IGame
}

const Howto = ({ data }: IProp) => {
  const router = useRouter()
  const { successToast, errorToast } = useToast()
  const { stateProfile } = useGlobal()
  const { handleOpen, handleClose, openForm } = usetournament()
  const { mutateShareToEarn } = useShareToEarn()
  const { t } = useTranslation()

  const uniqueId = Math.random().toString(36).substring(2, 9)
  const uniqueIdLocal = Helper.getLocalStorage(ELocalKey.shareToEarnCode)

  const linkUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${router.asPath}?af${uniqueIdLocal}`

  const { onClickFavouriteButton, favouriteStatus } = useFavoriteGameContoller({
    playerId: stateProfile?.id ?? "",
    gameId: data?.id ?? ""
  })

  const [showCopy, setShowCopy] = useState(false)

  // const getData = async () => {
  //   if (stateProfile && data) {
  //     await getFavoriteGameByUser(
  //       10000,
  //       1,
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       false,
  //       ""
  //     ).then((res) => {
  //       const { status } = res
  //       if (status) {
  //         setActive(status)
  //       }
  //     })
  //   }
  // }
  const handleShareToEarnLink = (
    _playerId: string,
    _gameId: string,
    _codeId: string
  ) => {
    mutateShareToEarn({
      player_id: _playerId,
      game_id: _gameId,
      code: _codeId
    })
      .then((_res) => {
        if (_res) {
          Helper.setLocalStorage({
            key: ELocalKey.shareToEarnCode,
            value: _codeId
          })
          successToast(MESSAGES.share_success)
          setShowCopy(true)
        }
      })
      .catch(() => {
        errorToast(MESSAGES.share_not_success)
      })
  }

  // const onFavouriteGame = (id: string) => {
  //   if (stateProfile && id) {
  //     saveFavoriteGame(stateProfile.id, id)
  //       .then((res) => {
  //         const { status } = res
  //         if (status) {
  //           // if (getFavoriteGame) saveFavoriteGame()
  //           setActive(!active)
  //           successToast(MESSAGES.success)
  //         }
  //       })
  //       .catch((error: { message: string }) => {
  //         errorToast(error.message)
  //       })
  //   } else {
  //     errorToast(MESSAGES.please_login)
  //   }
  // }

  return (
    <>
      <div className="mb-3 flex flex-col items-center justify-between rounded-2xl bg-neutral-800 p-2 md:p-5 xl:flex-row">
        <div className="mb-2 flex flex-col items-center gap-2 md:flex-row md:gap-0 xl:mb-0">
          <div className="xs:mb-[20px] flex items-center justify-center p-2 md:p-0">
            <div className="text-sm uppercase">
              <span className=" text-neutral-600">{t("game")}: </span>
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
          <Button
            className="md flex !min-w-[6.25rem] flex-[1_1_150px] items-center justify-center text-sm text-neutral-400 md:flex-none"
            onClick={() => handleOpen()}
          >
            <ShareIcon
              color="#FFFFFF"
              className="mr-2"
            />
            {t("share")}
          </Button>
          <div className="mx-5 hidden h-3 border-[1px] border-solid border-neutral-600 md:block" />
          <ButtonLink
            onClick={() => onClickFavouriteButton()}
            text={
              favouriteStatus ? t("delete_favourite") : t("add_to_favourite")
            }
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
      <ModalCustom
        open={openForm}
        onClose={handleClose}
        className="m-auto gap-3 rounded-[34px] p-[10px] max-[420px]:w-[370px]"
        width={515}
      >
        <Stack
          spacing={3}
          className="md:p-5"
        >
          <div className="rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-2 uppercase">
            <ModalHeader
              handleClose={handleClose}
              title={t("share")}
            />
          </div>
          <Box
            className={`hide-scroll flex  w-full flex-col overflow-y-scroll ${
              showCopy ? "h-[220px]" : "h-[115px]"
            }`}
          >
            <div className="mx-auto my-0 text-center">
              {stateProfile && (
                <ButtonIcon
                  variants={iconmotion}
                  whileHover="hover"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 4
                  }}
                  icon={<LinkIcon className="rotate-[140deg]" />}
                  className="m-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                  onClick={() =>
                    handleShareToEarnLink(stateProfile.id, data.id, uniqueId)
                  }
                />
              )}
            </div>
            <p className="mt-5 text-sm">{t("share_desc")}</p>
            <div className="my-4 flex flex-col items-center justify-center text-center">
              {showCopy && (
                <div className="my-4 flex w-full items-center justify-center border-t-2 border-[#252525] pt-2 text-center ">
                  <p className="text-sm">{Helper.textWithDots(linkUrl, 25)}</p>
                  <ButtonIcon
                    onClick={() => {
                      Helper.copyClipboard(linkUrl)
                      successToast("Copy success!")
                    }}
                    className=" m-1 flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                    icon={<ContentCopyOutlinedIcon />}
                  />
                </div>
              )}
            </div>
          </Box>
        </Stack>
      </ModalCustom>
    </>
  )
}
export default Howto
