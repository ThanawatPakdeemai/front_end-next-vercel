import ButtonClose from "@components/atoms/button/ButtonClose"
import SwitchCustom from "@components/atoms/SwitchCustom"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import FlagIcon from "@components/icons/FlagIcon"
import LockIcon from "@components/icons/LockIcon"
import PlayersIcon from "@components/icons/PlayersIcon"
import CountItem from "@components/molecules/CountItem"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import useGetAllGameRooms from "@feature/game/containers/hooks/useGetAllGameRooms"
import { IGame, IGameMap } from "@feature/game/interfaces/IGameService"
import { IProfile } from "@feature/profile/interfaces/IProfileService"
import useCreateRoom from "@feature/rooms/hooks/useCreateRoom"
import { MapOutlined } from "@mui/icons-material"
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  Typography
} from "@mui/material"
import useCountStore from "@stores/countComponant"
import useProfileStore from "@stores/profileStore"
import React, { useEffect, useState } from "react"
import { unstable_batchedUpdates } from "react-dom"

interface IProp {
  gameData: IGame
}

const ModalCreateRoom = ({ gameData }: IProp) => {
  const [maps, setMaps] = useState<IGameMap[]>([])
  const [map, setMap] = useState<number>(1)
  const [itemUse, setItemUse] = useState<number>(1)
  const [isPublicRoom, setIsPublicRoom] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [profile, setProfile] = useState<IProfile>()

  const profileStore = useProfileStore((state) => state.profile)
  const count = useCountStore((state) => state.count)
  const setCount = useCountStore((state) => state.setCount)
  const setMin = useCountStore((state) => state.setMin)
  const setMax = useCountStore((state) => state.setMax)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { mutateCreateRoom, isSuccess } = useCreateRoom()
  const { refetchAllGameRooms } = useGetAllGameRooms({
    _gameId: gameData.id,
    _email: profile ? profile.email : "",
    // mock for waiting price of items
    _itemId: "63072b0dd0be6934c17b5438"
  })

  const handleSetIsCurrent = (status: boolean) => {
    setIsPublicRoom(status)
  }

  const handleSubmit = () => {
    if (gameData && gameData.play_to_earn === true) {
      setItemUse(0)
    }

    if (profile) {
      setOpen(false)
      mutateCreateRoom({
        _gameId: gameData.id,
        _playerId: profile.id,
        _walletAddress: profile.address,
        // mock for waiting price of items
        _itemId: "63072b0dd0be6934c17b5438",
        _maxPlayer: count,
        _numberItem: itemUse,
        _mapId: map,
        _publicRoom: isPublicRoom
      })
      if (isSuccess) {
        refetchAllGameRooms()
        setCount(gameData.min_player || 2)
      }
    }
  }

  useEffect(() => {
    if (profileStore && profileStore.data) {
      setProfile(profileStore.data)
    }
  }, [profileStore])

  useEffect(() => {
    if (gameData) {
      if (gameData.map && gameData.type_code === "multi_02") {
        setMaps(gameData.map)
      }
      unstable_batchedUpdates(() => {
        setCount(gameData.min_player || 2)
        setMin(gameData.min_player || 2)
        setMax(gameData.max_players || 8)
      })
    }
  }, [gameData, setCount, setMax, setMin])

  return (
    <>
      <ButtonToggleIcon
        handleClick={handleOpen}
        startIcon={<PlusIcon />}
        text="Create Room"
        className="btn-rainbow-theme z-[2] h-[50px] w-[156px] bg-secondary-main font-bold capitalize text-white-primary"
        type="button"
      />
      <ModalCustom
        open={open}
        width={353}
      >
        <div className="flex w-full flex-col gap-y-[22px]">
          <Box
            className="flex items-center rounded-lg bg-neutral-800 pr-[7px]"
            sx={{ height: "54px" }}
          >
            <div className="flex flex-1 flex-row items-center">
              <Typography className="pl-[22px] uppercase text-neutral-300">
                Create Room
              </Typography>
            </div>
            <ButtonClose onClick={handleClose} />
          </Box>
          <TextField
            label="Room Name"
            placeholder="Room Name..."
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FlagIcon />
                </InputAdornment>
              )
            }}
          />
          <CountItem
            endIcon={<PlayersIcon />}
            label="number of players"
          />
          {gameData && gameData.type_code === "multi_02" && (
            <TextField
              label="select map"
              select
              placeholder="select map..."
              value={map}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapOutlined />
                  </InputAdornment>
                )
              }}
            >
              {maps &&
                maps.map((option) => (
                  <MenuItem
                    sx={{
                      borderRadius: 4
                    }}
                    key={option.map_id}
                    value={option.map_id}
                    onClick={() => setMap(option.map_id)}
                  >
                    {option.map_name}
                  </MenuItem>
                ))}
            </TextField>
          )}
          <div className="flex text-sm text-neutral-500">
            <span>Room status :</span>
            <button
              className="ml-2 mr-[10px]"
              type="button"
              onClick={() => handleSetIsCurrent(true)}
            >
              <span className={!isPublicRoom ? "!text-neutral-300" : ""}>
                Public
              </span>
            </button>
            <SwitchCustom
              checked={isPublicRoom}
              onChange={(e) => {
                if (e.target.checked) {
                  setIsPublicRoom(true)
                } else {
                  setIsPublicRoom(false)
                }
              }}
            />
            <button
              className="mr-2 ml-[10px]"
              type="button"
              onClick={() => handleSetIsCurrent(false)}
            >
              <span className={isPublicRoom ? "!text-neutral-300" : ""}>
                Private
              </span>
            </button>
          </div>
          <TextField
            placeholder="Password..."
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon stroke="#70727B" />
                </InputAdornment>
              )
            }}
          />
          <ButtonToggleIcon
            className="bg-secondary-main text-white-default"
            startIcon={null}
            text="Create"
            handleClick={handleSubmit}
            type="button"
          />
        </div>
      </ModalCustom>
    </>
  )
}

export default ModalCreateRoom
