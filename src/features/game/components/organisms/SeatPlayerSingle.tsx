import React, { memo, useCallback, useEffect, useMemo } from "react"
import {
  CurrentPlayer,
  IGameCurrentPlayer
} from "@feature/game/interfaces/IGameService"
import { Box, Typography } from "@mui/material"
import Ellipse from "@components/icons/Ellipse/Ellipse"
import useProfileStore from "@stores/profileStore"
import useGetGameRoomById from "@feature/game/containers/hooks/useGetGameRoomById"
import { useRouter } from "next/router"
import useIpAddressStore from "@stores/ipAddress"
import CONFIGS from "@configs/index"
import useGameStore from "@stores/game"
import Helper from "@utils/helper"
import { useToast } from "@feature/toast/containers"
import useGetBalanceOf from "@feature/inventory/containers/hooks/useGetBalanceOf"
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
  const gameData = useGameStore((state) => state.data)
  const ip = useIpAddressStore((state) => state.ipAddress)
  const { errorToast } = useToast()
  const router = useRouter()
  const addrsss = "0x1BFa565383EBb149E6889F99013d1C88da190915" // "0xd8fBF6b391a7EbA72772763716537FB43769E845" // TODO YUI Change ACCOUNT

  const item_id = useMemo(
    () => gameData?.item[0].item_id_smartcontract,
    [gameData]
  ) // TODO YUI ITEM

  const address = useMemo(() => profile?.address, [profile?.address])

  const { gameRoomById } = useGetGameRoomById(room_id)

  const { balanceofItem, isLoading } = useGetBalanceOf({
    _address: address ?? "",
    _item_id: item_id ?? 0
  })

  const checkRoomTimeout = useCallback(() => {
    if (gameRoomById && gameRoomById.end_time) {
      const endTime: Date = new Date(gameRoomById.end_time)
      const currentTime: Date = new Date()
      if (currentTime >= endTime) {
        return true
      }
    }
    return false
  }, [gameRoomById])

  useEffect(() => {
    const statueTimout = checkRoomTimeout()
    if (statueTimout) {
      router.push(`/${gameData?.path}/roomlist`)
      errorToast("Room timeout")
    }
    return () => {}
  }, [checkRoomTimeout, errorToast, gameData?.path, gameRoomById, router])

  const checkBalanceOfItem = () => {
    if (balanceofItem && balanceofItem.data > 0) {
      return true
    }
    errorToast("You don't have item for this game. Please buy Item")
    if (balanceofItem === undefined) return false
    return false
  }

  const checkPlayerIsNotBanned = () => {
    if (
      !profile ||
      (profile && profile.role === "BACKLIST") ||
      (profile && profile.role === "BANNED")
    ) {
      errorToast("You are banned. Please contact admin")
      return false
    }
    return true
  }

  const checkAccountProfile = () => {
    if (profile && profile.address === addrsss) {
      return true
    }
    errorToast("Please connect wallet again!")
    return false
  }
  const OnPlayGame = () => {
    if (gameRoomById && gameData && profile && room_id) {
      const frontendUrl = `${baseUrlFront}/${gameData.path}/summary/${room_id}`

      const gameURL = `${baseUrlGame}/${gameData.id}/?${Helper.makeID(8)}${btoa(
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
          gameData.play_to_earn === true ? "free" : "not_free"
        }`
      )}`

      const gameURLShow = `${baseUrlGame}/${gameData.id}/?${Helper.makeID(
        8
      )}${`${room_id}:|:${profile.id}:|:${item_id}:|:${
        profile.email
      }:|:${Helper.getLocalStorage(
        "token"
      )}:|:${baseUrlFront}:|:${baseUrlApi}:|:${gameRoomById.rank_name}:|:${
        gameRoomById.room_number
      }:|:${new Date(gameRoomById.start_time).getTime()}${
        gameRoomById.stage_id !== undefined
          ? `:|:${gameRoomById.stage_id}`
          : ":|:0"
      }:|:${profile.username}:|:${
        gameData.play_to_earn === true ? "free" : "not_free"
      }`}`

      if (
        checkBalanceOfItem() &&
        checkPlayerIsNotBanned() &&
        checkAccountProfile()
      ) {
        // window.location.href = gameURL
      }
    } else {
      errorToast("You can't play game.")
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
