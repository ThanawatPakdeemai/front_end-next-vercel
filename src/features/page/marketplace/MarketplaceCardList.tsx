import {
  IMarketplaceInfoData,
  MOCK_BUILDING,
  MOCK_GAME_ITEM,
  MOCK_LAND
} from "@constants/mockupMarketplace"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"

const CardItemMarketPlace = dynamic(
  () => import("@components/molecules/cards/CardItemMarketPlace"),
  {
    suspense: true
  }
)

const MarketplaceCardList = () => {
  const [gameItemData, setGameItemData] = useState<IMarketplaceInfoData[]>([])
  const [type, setType] = useState<"game" | "land" | "building" | "material">(
    "land"
  )
  const { pathname } = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      if (pathname.includes("building")) {
        setType("building")
        setGameItemData(MOCK_BUILDING.data)
      } else if (pathname.includes("game")) {
        setType("game")
        setGameItemData(MOCK_GAME_ITEM.data)
      } else if (pathname.includes("material")) {
        setType("material")
      } else {
        setType("land")
        setGameItemData(MOCK_LAND.data)
      }
    }

    handleRouteChange()
  }, [pathname])

  return (
    <div className="grid w-full grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {gameItemData.map((_data, _index) => (
        <CardItemMarketPlace
          isP2p={pathname.includes("p2p")}
          key={uuidv4()}
          cardType={type}
          data={_data}
        />
      ))}
    </div>
  )
}

export default MarketplaceCardList
