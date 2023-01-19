import ButtonClose from "@components/atoms/button/ButtonClose"
import Dropdown from "@components/atoms/DropdownCustom"
import SearchIcon from "@components/icons/SearchIcon"
import { IGame } from "@feature/game/interfaces/IGameService"
import ModalCreateRoom from "@feature/rooms/components/molecules/ModalCreateRoom"
import { TextField } from "@mui/material"
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
            <ModalCreateRoom gameData={gameData} />
          ) : null}
        </div>
      </div>
    </>
  )
}

export default HeaderRoomList
