import React, { memo } from "react"
import { Image } from "@components/atoms/image"
import { Button, Chip } from "@mui/material"
import { v4 as uuid } from "uuid"
import { IGamesToPlay } from "../interface/IEventsService"

interface IGamesLobbyProps {
  _gameData: IGamesToPlay[] | undefined
}

const GamesLobby = ({ _gameData }: IGamesLobbyProps) => (
  <div className="flex h-full items-center justify-center gap-4 lg:gap-16">
    <div className="mx-auto md:w-[578px]">
      {_gameData?.map((game) => (
        <div
          key={uuid()}
          className="mb-4 flex flex-wrap gap-4 sm:flex-nowrap"
        >
          <div className="h-[230px] w-full justify-center overflow-hidden rounded-3xl border-[1px] border-neutral-700 border-opacity-80 sm:w-[230px] md:justify-start">
            <Image
              src={
                game
                  ? game.image_category_list
                  : "/images/gameDetails/nakamoto-wars.webp"
              }
              alt={game ? game.name : "nakamoto-wars"}
              width={230}
              height={230}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="w-full rounded-3xl border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 sm:w-[calc(100%-230px)]">
            <Chip
              label={game.game_type}
              size="small"
              color="info"
              className="mb-4 font-bold uppercase"
            />
            <h1 className="font-neue-machina text-lg font-bold uppercase text-white-default">
              {game.name}
            </h1>
            {game && (
              <div className="flex justify-center">
                <Button
                  className="bg-green-card"
                  variant="contained"
                  href={game.game_url}
                >
                  Play
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default memo(GamesLobby)
