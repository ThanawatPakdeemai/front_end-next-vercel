import OverviewHowToPlay from "@components/organisms/OverviewHowToPlay"
import BuyItemBody from "@components/templates/game/BuyItemBody"
import { IGame } from "@feature/game/interfaces/IGameService"
import CardButItem from "@feature/gameItem/components/molecules/CardBuyItem"
import { CardMedia } from "@mui/material"
import React from "react"

interface IDefaultLobby {
  gameData: IGame
}
const DefaultLobby = ({ gameData }: IDefaultLobby) => (
  <div className="slide-item relative mx-auto h-full max-w-[980px] gap-4 align-middle text-white-default md:flex xl:max-w-[1370px]">
    <div className="slide-item--image flex w-full flex-auto flex-col items-center justify-center overflow-hidden rounded-2xl md:w-3/5 xl:w-3/4">
      {gameData && (
        <>
          <CardMedia
            component="img"
            width={300}
            height={300}
            image={gameData.image_main}
            alt={gameData.name}
            className="absolute h-1/2 w-1/2 object-contain"
          />
          <CardMedia
            component="img"
            height={1080}
            image={gameData.image_background}
            alt={gameData.name}
            className="h-full w-full object-cover"
          />
        </>
      )}
    </div>
    <BuyItemBody>
      <OverviewHowToPlay
        gameId={gameData ? gameData.id : ""}
        gameType="play-to-earn"
        hight="h-[300px]"
        title="how_to_play"
      />
      <CardButItem />
    </BuyItemBody>
  </div>
)

export default DefaultLobby
