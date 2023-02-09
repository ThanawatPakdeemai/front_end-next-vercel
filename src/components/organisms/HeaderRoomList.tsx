import ButtonClose from "@components/atoms/button/ButtonClose"
import Dropdown from "@components/atoms/DropdownCustom"
import SearchIcon from "@components/icons/SearchIcon"
import { TextField, Typography } from "@mui/material"
import { IGame } from "@feature/game/interfaces/IGameService"

import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import ModalCreateRoom from "@feature/rooms/components/molecules/ModalCreateRoom"

export interface IHeaderRoomList {
  lobby: string
}

const HeaderRoomList = ({ lobby }: IHeaderRoomList) => {
  const router = useRouter()
  const { data, itemSelected } = useGameStore()
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
            <ButtonClose onClick={() => router.push(`/${gameData?.path}`)} />
          </div>
          <h1 className="text-white-defzault self-center uppercase">
            Lobby :{lobby}
            {gameData?.play_to_earn || gameData?.tournament ? (
              ""
            ) : (
              <Typography className="uppercase text-secondary-main">
                {`${itemSelected && itemSelected.name} ${
                  itemSelected && itemSelected.item_size
                }`}
              </Typography>
            )}
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
          {gameData && gameData.game_type === "multiplayer" && (
            <ModalCreateRoom gameData={gameData} />
          )}
        </div>
      </div>
    </>
  )
}

export default HeaderRoomList
