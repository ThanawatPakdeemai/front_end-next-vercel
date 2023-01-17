import ButtonClose from "@components/atoms/button/ButtonClose"
import Dropdown from "@components/atoms/DropdownCustom"
import SwitchCustom from "@components/atoms/SwitchCustom"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import FlagIcon from "@components/icons/FlagIcon"
import LockIcon from "@components/icons/LockIcon"
import PlayersIcon from "@components/icons/PlayersIcon"
import SearchIcon from "@components/icons/SearchIcon"
import CountItem from "@components/molecules/CountItem"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import { IGame } from "@feature/game/interfaces/IGameService"
import MapOutlined from "@mui/icons-material/MapOutlined"
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  Typography
} from "@mui/material"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

export interface IHeaderRoomList {
  lobby: string
}

const HeaderRoomList = ({ lobby }: IHeaderRoomList) => {
  const router = useRouter()
  const { data } = useGameStore()
  const [gameData, setGameData] = useState<IGame>()
  const [open, setOpen] = useState<boolean>(false)
  const [mapValue, setMapValue] = useState<string>()
  const [isPublicRoom, setIsPublicRoom] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSetIsCurrent = (status: boolean) => {
    setIsPublicRoom(status)
  }

  useEffect(() => {
    if (data) {
      setGameData(data)
    }
  }, [data])

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800">
            <ButtonClose onClick={() => router.back()} />
          </div>
          <h1 className="text-white-defzault self-center uppercase">
            Lobby :{lobby}
            <span className="text-secondary-main">Skull XL</span>
          </h1>
        </div>
        <div className="flex">
          <Dropdown
            title="All Categories"
            className="w-[174px] rounded-lg"
          />
          <TextField
            className="px-2"
            placeholder="Search Room"
            InputProps={{
              style: {
                fontSize: "14px",
                fontFamily: "neueMachina",
                width: "174px"
              },
              startAdornment: <SearchIcon className="mr-4" />
            }}
          />
          {gameData && gameData.game_type === "multiplayer" ? (
            <>
              <ButtonToggleIcon
                handleClick={handleOpen}
                startIcon={<PlusIcon />}
                text="Create Room"
                className="btn-rainbow-theme z-[2] h-[50px] w-[156px] bg-secondary-main font-bold capitalize text-white-primary"
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
                  <TextField
                    label="select map"
                    select
                    placeholder="select map..."
                    value={mapValue}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MapOutlined />
                        </InputAdornment>
                      )
                    }}
                  >
                    {gameData &&
                      gameData.map &&
                      gameData.map.map((option) => (
                        <MenuItem
                          sx={{
                            borderRadius: 4
                          }}
                          key={option._id}
                          value={option.map_name}
                          onClick={() => setMapValue(option.map_name)}
                        >
                          {option.map_name}
                        </MenuItem>
                      ))}
                  </TextField>
                  <div className="flex text-sm text-neutral-500">
                    <span>Room status :</span>
                    <button
                      className="ml-2 mr-[10px]"
                      type="button"
                      onClick={() => handleSetIsCurrent(true)}
                    >
                      <span
                        className={!isPublicRoom ? "!text-neutral-300" : ""}
                      >
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
                </div>
              </ModalCustom>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default HeaderRoomList
