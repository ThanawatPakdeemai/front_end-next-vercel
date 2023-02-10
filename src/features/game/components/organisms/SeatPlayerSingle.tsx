/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useCallback, useEffect, useMemo, useState } from "react"
import { IGameCurrentPlayer } from "@feature/game/interfaces/IGameService"
import { Box, Typography } from "@mui/material"
import Ellipse from "@components/icons/Ellipse/Ellipse"
import useProfileStore from "@stores/profileStore"
import useGetGameRoomById from "@feature/game/containers/hooks/useGetGameRoomById"
import { useRouter } from "next/router"
import CONFIGS from "@configs/index"
import useGameStore from "@stores/game"
import Helper from "@utils/helper"
import { useToast } from "@feature/toast/containers"
import useGetBalanceOf from "@feature/inventory/containers/hooks/useGetBalanceOf"
import { MESSAGES } from "@constants/messages"
import { useWeb3Provider } from "@providers/Web3Provider"

import { IResGetIp } from "@interfaces/IGetIP"
import ButtonGame from "../atoms/ButtonPlayer"
import PlayerCard from "../molecules/PlayerCard"

interface IProps {
  players: IGameCurrentPlayer[] | undefined[]
  room_id: string
}
const baseUrlGame = CONFIGS.BASE_URL.GAME
const baseUrlApi = CONFIGS.BASE_URL.API
const baseUrlFront = CONFIGS.BASE_URL.FRONTEND

const SeatPlayers = ({ players, room_id }: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { data, itemSelected } = useGameStore()
  const { errorToast } = useToast()
  const router = useRouter()
  const { address } = useWeb3Provider()
  const [gameUrl, setGameUrl] = useState<string>("")
  const [ip, setIp] = useState("")

  useEffect(() => {
    if (data && data.type_code === "survival_01")
      Helper.getIP().then((res) => {
        setIp((res as IResGetIp).ip)
      })
    return () => {
      setIp("")
    }
  }, [data])

  const item_id = useMemo(() => {
    if (data) {
      if (data.play_to_earn || data.tournament) {
        return data?.item[0]._id
      }
      if (itemSelected) {
        return itemSelected._id
      }
      return undefined
    }
    return undefined
  }, [data, itemSelected])

  const item_id_smartcontract = useMemo(() => {
    if (data) {
      if (data.play_to_earn || data.tournament) {
        return Number(data?.item[0].item_id_smartcontract)
      }
      if (itemSelected) {
        return Number(itemSelected.item_id_smartcontract)
      }
    }
    return 0
  }, [data, itemSelected])

  const { gameRoomById } = useGetGameRoomById(room_id)

  const { balanceofItem } = useGetBalanceOf({
    _address: address ?? "",
    _item_id: item_id_smartcontract ?? 0
  })

  const playerMe = useMemo(() => {
    if (players && players.length > 0) {
      const play = [...players].filter((ele) => ele)
      if (play) {
        return play.find(
          (player) => (player as IGameCurrentPlayer)?.player_id === profile?.id
        )
      }
    }
  }, [players, profile])

  const checkRoomTimeout = useCallback(() => {
    if (!gameRoomById) return false

    const endTime = new Date(gameRoomById.end_time)
    const currentTime = new Date()

    return currentTime >= endTime
  }, [gameRoomById])

  useEffect(() => {
    const statueTimout = checkRoomTimeout()
    if (statueTimout) {
      router.push(`/${data?.path}/roomlist`)
      errorToast(MESSAGES["room-timeout"])
    }
    return () => {}
  }, [checkRoomTimeout, errorToast, data?.path, gameRoomById, router])

  const checkReadyPlayer = () => {
    if (playerMe) {
      if (
        playerMe.status === "inroom" ||
        playerMe.status === "ready" ||
        playerMe.status === "playing"
      ) {
        return true
      }
      errorToast(MESSAGES["you-played"])
      return false
    }
    return false
  }

  const checkBalanceOfItem = () => {
    if (balanceofItem && balanceofItem.data > 0) {
      return true
    }
    errorToast(MESSAGES["you-don't-have-item"])
    return false
  }

  const checkPlayerIsNotBanned = () => {
    if (
      !profile ||
      (profile && profile.role === "BACKLIST") ||
      (profile && profile.role === "BANNED")
    ) {
      errorToast(MESSAGES["you-are-banned"])
      return false
    }
    return true
  }

  const checkAccountProfile = () => {
    if (profile && address === profile.address) {
      return true
    }
    errorToast(MESSAGES["please-connect-wallet"])
    return false
  }

  useEffect(() => {
    if (
      gameRoomById &&
      profile &&
      room_id &&
      item_id &&
      data &&
      data.game_type === "singleplayer"
    ) {
      const frontendUrl = `${baseUrlFront}/${data.path}/summary/${room_id}`

      if (data.type_code === "survival_01") {
        if (ip) {
          const data_game = `${room_id}:|:${profile.id}:|:${
            itemSelected?._id
          }:|:${profile.email}:|:${Helper.getLocalStorage(
            "token"
          )}:|:${frontendUrl}:|:${CONFIGS.BASE_URL.API}:|:${
            gameRoomById.rank_name
          }:|:${gameRoomById.room_number}:|:${new Date(
            gameRoomById.start_time
          ).getTime()}:|:${profile.username}:|:${gameRoomById.max_players}:|:${
            gameRoomById.stage_id
          }:|:${ip}:|:${data.play_to_earn === true ? "free" : "not_free"}:|:${
            profile.country
          }`
          const gameURL = `${CONFIGS.BASE_URL.GAME}/${
            data.id
          }/?query=${Helper.makeID(8)}${btoa(data_game)}`
          setGameUrl(gameURL)
          // console.log(`${CONFIGS.BASE_URL.GAME}/${data.id}/?query=${data_game}`)
        }
      } else {
        const url_data = `${room_id}:|:${profile.id}:|:${item_id}:|:${
          profile.email
        }:|:${Helper.getLocalStorage(
          "token"
        )}:|:${frontendUrl}:|:${baseUrlApi}:|:${gameRoomById.rank_name}:|:${
          gameRoomById.room_number
        }:|:${new Date(gameRoomById.start_time).getTime()}${
          gameRoomById.stage_id !== undefined
            ? `:|:${gameRoomById.stage_id}`
            : ":|:0"
        }:|:${profile.username}:|:${
          data.play_to_earn === true ? "free" : "not_free"
        }`
        // console.log(`${baseUrlGame}/${data.id}/?${Helper.makeID(8)}/${url_data}}`)
        const gameURL = `${baseUrlGame}/${data.id}/?${Helper.makeID(8)}${btoa(
          url_data
        )}`
        setGameUrl(gameURL)
      }
    }
    return () => {
      setGameUrl("")
    }
  }, [data, gameRoomById, ip, itemSelected?._id, item_id, profile, room_id])

  const onPlayGame = () => {
    if (
      checkPlayerIsNotBanned() &&
      checkAccountProfile() &&
      checkBalanceOfItem() &&
      checkReadyPlayer()
    ) {
      window.location.href = gameUrl
    } else if (!item_id) {
      errorToast(MESSAGES["please_item"])
    } else if (!room_id) {
      errorToast(MESSAGES["room-id-not-found"])
    }
  }

  return (
    <>
      <Box>
        <PlayerCard players={players} />
        <Box className="mb-10  flex justify-center">
          <Box className="w-fit items-center justify-center gap-3 rounded-[50px] border border-neutral-800 bg-primary-main p-3 md:flex">
            <Typography className=" mx-4 w-[200px] font-neue-machina text-sm ">
              {" It's time to play! Press the Start"}
            </Typography>
            <ButtonGame
              startIcon={<Ellipse fill="#AOED61" />}
              handleClick={onPlayGame}
              text={
                <Typography className="w-full font-neue-machina text-2xl text-neutral-600">
                  START
                </Typography>
              }
              className={`h-[60px] w-[194px] rounded-[50px] ${"bg-green-lemon "}${"btn-green-rainbow  "} font-bold capitalize text-neutral-900`}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default memo(SeatPlayers)
