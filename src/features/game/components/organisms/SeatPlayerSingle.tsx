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
import { useCreateWeb3Provider } from "@hooks/useWeb3Provider"
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
  const [account, setAccount] = useState<string | undefined>(undefined)
  const { handleConnectWithMetamask, accounts } = useCreateWeb3Provider()

  useEffect(() => {
    let load = true
    if (load) {
      handleConnectWithMetamask()
    }
    return () => {
      load = false
    }
  }, [handleConnectWithMetamask])

  useEffect(() => {
    if (accounts) setAccount(accounts[0])

    return () => {
      setAccount(undefined)
    }
  }, [accounts])

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

  const address = useMemo(() => profile?.address, [profile?.address])

  const { gameRoomById } = useGetGameRoomById(room_id)

  const { balanceofItem } = useGetBalanceOf({
    _address: address ?? "",
    _item_id: item_id_smartcontract ?? 0
  })

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

  const checkBalanceOfItem = () => {
    if (balanceofItem && balanceofItem.data > 0) {
      return true
    }
    if (balanceofItem === undefined) {
      errorToast(MESSAGES["you-don't-have-item"])
      return false
    }
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
    if (profile && profile.address === account) {
      return true
    }
    errorToast(MESSAGES["please-connect-wallet"])
    return false
  }
  const OnPlayGame = () => {
    if (gameRoomById && data && profile && room_id && item_id) {
      const frontendUrl = `${baseUrlFront}/${data.path}/summary/${room_id}`
      const gameURL = `${baseUrlGame}/${data.id}/?${Helper.makeID(8)}${btoa(
        `${room_id}:|:${profile.id}:|:${item_id}:|:${
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
      )}`

      if (
        checkBalanceOfItem() &&
        checkPlayerIsNotBanned() &&
        checkAccountProfile()
      ) {
        window.location.href = gameURL
      }
    } else if (!item_id) {
      errorToast(MESSAGES["please_item"])
    } else if (!room_id) {
      errorToast(MESSAGES["room-id-not-found"])
    } else {
      errorToast(MESSAGES["you-can't-play-game"])
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
              handleClick={OnPlayGame}
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
