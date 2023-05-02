/* eslint-disable max-len */
import ButtonClose from "@components/atoms/button/ButtonClose"
import LockIcon from "@components/icons/LockIcon"
import ModalInvite from "@components/molecules/ModalInvite"
import RoomListBox from "@components/molecules/roomList/RoomListBox"
import { Chip } from "@mui/material"
import useGameStore from "@stores/game"
import { useRouter } from "next/dist/client/router"
import React from "react"
import { useTranslation } from "react-i18next"
import { BrowserView, MobileView } from "react-device-detect"
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import CONFIGS from "@configs/index"

export interface IHeaderWaitingRoomProp {
  roomTag: string | number
  roomName?: string | number
  rankName?: string
  timer?: {
    time: Date
    onExpire?: () => void
  }
  player?: {
    currentPlayer: number
    maxPlayer?: number
  }
  onOutRoom?: () => void
  className?: string
  isSummaryPage?: boolean
  onClick?: () => void
}

const HeaderWaitingRoom = ({
  roomTag,
  roomName,
  timer,
  player,
  onOutRoom,
  className,
  isSummaryPage,
  rankName,
  onClick
}: IHeaderWaitingRoomProp) => {
  const router = useRouter()
  const game = useGameStore((state) => state.data)
  const { t } = useTranslation()
  return (
    <>
      <BrowserView>
        <div
          className={`flex flex-wrap items-center gap-5 border-b border-neutral-800 p-2 lg:h-[72px] ${className}`}
        >
          <div className="flex flex-auto items-center gap-2 md:flex-none md:gap-5 xl:ml-4">
            <div className="summary-page__button flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800">
              {isSummaryPage ? (
                <ButtonClose
                  onClick={() => {
                    if (onOutRoom) {
                      onOutRoom()
                    } else {
                      router.push("/")
                    }
                  }}
                />
              ) : (
                <ButtonClose
                  onClick={() => {
                    onOutRoom ? onOutRoom() : router.back()
                  }}
                />
              )}
            </div>

            {roomTag ? (
              <span
                className="summary-page__roomNo text-xs text-neutral-500 "
                aria-label="room-tag"
              >
                #{roomTag}
              </span>
            ) : null}

            <LockIcon />
            {roomName && (
              <span
                className="summary-page__roomName text-default uppercase text-neutral-300"
                aria-label="room-nam"
              >
                {t("room")} : {roomName}
              </span>
            )}
            {rankName && (
              <span
                className="summary-page__rankName text-default uppercase text-neutral-300"
                aria-label="room-nam"
              >
                Rank : {rankName}
              </span>
            )}

            {isSummaryPage && (
              <Chip
                label="FINISHED GAME"
                variant="filled"
                color="success"
                size="small"
                className="!bg-green-lemon"
              />
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <RoomListBox
              type="timer"
              timer={timer}
              color="green"
              shade="lemon"
            />
            {game && game?.game_type === "multiplayer" && (
              <RoomListBox
                type="player"
                player={player}
                // for invite button
                icon={
                  !isSummaryPage ? (
                    <>
                      <ModalInvite />
                    </>
                  ) : null
                }
                onClick={onClick}
                //
                color="neutral"
                shade="500"
              />
            )}
          </div>
          {/* <ButtonIcon
        type="square"
        icon={<SettingIcon />}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 xl:mr-4"
      /> */}
        </div>
      </BrowserView>
      {CONFIGS.DISPLAY_MOBILE_MODE === "true" && (
        <MobileView>
          <div
            className={`flex flex-wrap items-center gap-3 border-b border-neutral-800 p-2 ${className}`}
          >
            <div className="flex flex-auto items-center justify-between gap-2">
              <div className="summary-page__button flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800">
                {isSummaryPage ? (
                  <ButtonClose
                    onClick={() => {
                      if (onOutRoom) {
                        onOutRoom()
                      } else {
                        router.push("/")
                      }
                    }}
                  />
                ) : (
                  <ButtonClose
                    onClick={() => {
                      onOutRoom ? onOutRoom() : router.back()
                    }}
                  />
                )}
              </div>

              {roomTag ? (
                <span
                  className="summary-page__roomNo text-xs text-neutral-500 "
                  aria-label="room-tag"
                >
                  #{roomTag}
                </span>
              ) : null}

              <LockIcon />
              {roomName && (
                <span
                  className="summary-page__roomName text-default uppercase text-neutral-300"
                  aria-label="room-nam"
                >
                  {t("room")} : {roomName}
                </span>
              )}
              {rankName && (
                <span
                  className="summary-page__rankName text-default uppercase text-neutral-300"
                  aria-label="room-nam"
                >
                  Rank : {rankName}
                </span>
              )}

              {isSummaryPage && (
                <Chip
                  label="FINISHED GAME"
                  variant="filled"
                  color="success"
                  size="small"
                  className="!bg-green-lemon"
                />
              )}
            </div>
            <div className="flex flex-auto items-center justify-between gap-2">
              <RoomListBox
                type="timer"
                timer={timer}
                color="green"
                shade="lemon"
              />
              {player && (
                <div className="flex rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-[6px] text-black-default">
                  <PeopleAltOutlinedIcon />
                  <p className="border-r border-black-default px-4">
                    {player.currentPlayer}
                  </p>
                  <p className="pl-4 text-white-default">{player.maxPlayer}</p>
                </div>
              )}
              <div className="flex rounded-lg border border-neutral-700 bg-neutral-900 p-[6px] px-2 text-white-default">
                <SettingsOutlinedIcon />
              </div>
              {game && game?.game_type === "multiplayer" && (
                <RoomListBox
                  type="player"
                  player={player}
                  // for invite button
                  icon={
                    !isSummaryPage ? (
                      <>
                        <ModalInvite />
                      </>
                    ) : null
                  }
                  onClick={onClick}
                  //
                  color="neutral"
                  shade="500"
                />
              )}
            </div>
          </div>
        </MobileView>
      )}
    </>
  )
}

export default HeaderWaitingRoom
