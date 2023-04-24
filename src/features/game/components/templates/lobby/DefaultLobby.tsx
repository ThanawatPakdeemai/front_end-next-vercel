import { ImageCustom } from "@components/atoms/image/Image"
import OverviewHowToPlay from "@components/organisms/OverviewHowToPlay"
import BuyItemBody from "@components/templates/game/BuyItemBody"
import { IGame } from "@feature/game/interfaces/IGameService"
import CardBuyItem from "@feature/gameItem/components/molecules/CardBuyItem"
import React from "react"

interface IDefaultLobby {
  gameData: IGame
}
const DefaultLobby = ({ gameData }: IDefaultLobby) => (
  <div className="slide-item relative mx-auto h-full max-w-[980px] gap-4 align-middle text-white-default md:flex xl:max-w-[1370px]">
    <div className="slide-item--image flex w-full flex-auto flex-col items-center justify-center overflow-hidden rounded-2xl md:w-3/5 xl:w-3/4">
      {gameData && (
        <>
          <ImageCustom
            width={300}
            height={300}
            src={gameData.image_main}
            alt={gameData.name}
            className="absolute h-1/2 w-1/2 object-contain object-center"
          />
          <ImageCustom
            width={1023}
            height={740}
            src={gameData.image_background}
            alt={gameData.name}
            className="h-full w-full object-cover"
          />
        </>
      )}
    </div>
    <BuyItemBody>
      <OverviewHowToPlay
        gameId={gameData ? gameData.id : ""}
        gameType="play-to-earn-games"
        hight="h-[300px]"
        title="how_to_play"
      />
      <CardBuyItem gameObject={gameData} />
    </BuyItemBody>
  </div>
)

export default DefaultLobby
