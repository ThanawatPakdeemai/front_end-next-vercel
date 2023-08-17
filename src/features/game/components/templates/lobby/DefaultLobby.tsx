import React from "react"
import dynamic from "next/dynamic"
import { IGame } from "@feature/game/interfaces/IGameService"

const CardBuyItem = dynamic(
  () => import("@feature/gameItem/components/molecules/CardBuyItem")
)
const ImageCustom = dynamic(() =>
  import("@components/atoms/image/Image").then((mod) => mod.ImageCustom)
)
const OverviewHowToPlay = dynamic(
  () => import("@components/organisms/OverviewHowToPlay")
)
const BuyItemBody = dynamic(
  () => import("@components/templates/game/BuyItemBody")
)

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
        gameType="play-to-earn"
        hight="h-[300px]"
        title="how_to_play"
      />
      <CardBuyItem gameObject={gameData} />
    </BuyItemBody>
  </div>
)

export default DefaultLobby
