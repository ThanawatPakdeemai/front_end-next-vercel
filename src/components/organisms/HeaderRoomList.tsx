import ButtonClose from "@components/atoms/button/ButtonClose"
import SearchIcon from "@components/icons/SearchIcon"
import { TextField, Typography } from "@mui/material"
import { IGame } from "@feature/game/interfaces/IGameService"

import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import ModalCreateRoom from "@feature/rooms/components/molecules/ModalCreateRoom"
import { useSocketProviderRoom } from "@providers/SocketProviderRoom"
import { useTranslation } from "react-i18next"

export interface IHeaderRoomList {
  lobby: string
}

const HeaderRoomList = ({ lobby }: IHeaderRoomList) => {
  const router = useRouter()
  const { data, itemSelected } = useGameStore()
  const { searchRoom } = useSocketProviderRoom()
  const [gameData, setGameData] = useState<IGame>()
  const { t } = useTranslation()

  useEffect(() => {
    let load = false

    if (!load) {
      if (data) {
        setGameData(data)
      }
    }

    return () => {
      load = true
    }
  }, [data, itemSelected])

  return (
    <>
      <div className="flex flex-wrap justify-between p-4">
        <div className="flex flex-[1_1_100%] flex-wrap gap-4 md:flex-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800">
            <ButtonClose
              onClick={() =>
                router.push(`/${router?.query?.typeGame}/${gameData?.path}`)
              }
            />
          </div>
          <h1 className="text-white-defzault self-center uppercase">
            {t("lobby")} :{lobby}
            {gameData?.play_to_earn || gameData?.tournament ? (
              ""
            ) : (
              <Typography className="uppercase text-secondary-main">
                {`${itemSelected?.name ?? ""} ${itemSelected?.item_size ?? ""}`}
              </Typography>
            )}
          </h1>
        </div>
        <div className="flex flex-[1_1_100%] flex-wrap items-center gap-2 md:flex-none ">
          {/* <Dropdown
            title="All Categories"
            className="w-[174px] rounded-lg"
          /> */}
          {gameData && gameData.game_type === "multiplayer" && (
            <div className="flex flex-col sm:flex-row">
              <TextField
                className="w-full md:px-2"
                placeholder={String(t("search_room"))}
                InputProps={{
                  style: {
                    fontSize: "14px",
                    fontFamily: "neueMachina"
                  },
                  startAdornment: <SearchIcon className="mr-4" />
                }}
                onChange={(_event) => {
                  const search = _event?.target?.value
                  searchRoom(search)
                }}
              />
              <ModalCreateRoom gameData={gameData} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HeaderRoomList
