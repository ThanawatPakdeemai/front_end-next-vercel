/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-shadow */
/* eslint-disable prefer-template */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
import ButtonLink from "@components/atoms/button/ButtonLink"
import IconCustoms from "@components/atoms/IconCustom"
import FavouriteColorIcon from "@components/icons/HowToPlayIcon/FavouriteColorIcon"
import FavouriteIcon from "@components/icons/HowToPlayIcon/FavouriteIcon"
import ShareIcon from "@components/icons/HowToPlayIcon/ShareIcon"
import useFavoriteGameContoller from "@feature/favourite/containers/hooks/useFavoriteGameContoller"
import { IGame } from "@feature/game/interfaces/IGameService"
import { useToast } from "@feature/toast/containers"
import { Button, Box, Stack } from "@mui/material"
// import useProfileStore from "@stores/profileStore"
import useGlobal from "@hooks/useGlobal"
import { useEffect, useState } from "react"

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import usetournament from "@feature/tournament/containers/hooks/usetournament"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import Helper from "@utils/helper"
import CONFIGS from "@configs/index"
import { TwitterShareButton } from "react-share"
import axios from "axios"
import Image from "next/image"

export type Handler = () => void

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

const Howto = ({ data }: IProp) => {
  // State
  const [device, setDevice] = useState<IGameDevice[]>([])
  const [browser, setBrowser] = useState<IGameBrowser[]>([])
  const uniqueId = Math.random().toString(36).substring(2, 9)
  const linkUrl = CONFIGS.APP_NAME + "/" + data?.path + "?af" + uniqueId
  const { handleClose, handleOpen, openForm } = usetournament()
  const { stateProfile } = useGlobal()
  const { successToast } = useToast()
  const { onClickFavouriteButton, favouriteStatus } = useFavoriteGameContoller({
    playerId: stateProfile?.id ?? "",
    gameId: data?.id ?? ""
  })
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

  const handleShareLink = (playerId, gameId, codeId) => {
    const data = {
      player_id: playerId,
      game_id: gameId,
      code: codeId
    }
    axios
      .post<any>(`/share_to_earn/share-action/`, { ...data })
      .then(() => {
        successToast("Share success!")
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error: Error) => ({
        data: [],
        message: "Not success share to earn",
        status: false
      }))
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
          <div className="xs:mb-[20px] flex items-center justify-center p-2 md:p-0">
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
          <div className="xs:mb-[20px] grid grid-cols-3 items-center justify-center gap-2 md:flex">
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
            <div className="mx-2 hidden h-3 border-[1px] border-solid border-neutral-600 md:block" />
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
          <Button
            className="md flex flex-[1_1_150px] items-center justify-center text-sm text-neutral-400 md:flex-none"
            onClick={() => handleOpen()}
          >
            <ShareIcon
              color="#FFFFFF"
              className="mr-2"
            />
            Share
          </Button>
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
      <ModalCustom
        open={openForm}
        onClose={handleClose}
        className="m-auto h-[200px] min-w-[515px] gap-3 rounded-[34px] p-[10px]"
        width={400}
      >
        <Stack
          spacing={3}
          className="md:p-5"
        >
          <div className="rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-2">
            <ModalHeader
              handleClose={handleClose}
              title="SHARE"
            />
          </div>
          <Box className="hide-scroll flex h-[220px] w-full flex-col overflow-y-scroll ">
            <div className="relative my-4 flex flex-col items-center  justify-center overflow-hidden rounded-2xl bg-primary-main p-2 sm:m-0 ">
              <TwitterShareButton
                // eslint-disable-next-line react/jsx-curly-brace-presence
                title={"NAKAMOTO"}
                url={linkUrl}
                hashtags={["NAKAMOTO"]}
                onShareWindowClose={() =>
                  handleShareLink(stateProfile?.id, data.id, uniqueId)
                }
              >
                <Image
                  alt="Share Twitter"
                  src="/images/icons/twitter.svg"
                  height={30}
                  width={30}
                />
              </TwitterShareButton>
              <p className="my-2 text-sm">
                You can share on any social media to invite friends to buy items
                and get the commission!
              </p>
            </div>
            <div className="my-4 flex flex-col items-center justify-center text-center">
              <div className="my-4 flex w-full items-center justify-center border-t-2 border-[#252525] pt-2 text-center ">
                <p className="text-sm">{linkUrl}</p>
                {/* <ContentCopyOutlinedIcon /> */}
                <ButtonIcon
                  onClick={() => {
                    Helper.copyClipboard(linkUrl)
                    successToast("Copy success!")
                  }}
                  className=" m-1 flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                  icon={<ContentCopyOutlinedIcon />}
                />
              </div>
            </div>
          </Box>
        </Stack>
      </ModalCustom>
    </>
  )
}
export default Howto
