import {
  IMarketplaceInfoData,
  MOCK_P2P_BUILDING,
  MOCK_P2P_GAME_ITEM,
  MOCK_P2P_LAND,
  MOCK_P2P_MATERIAL,
  MOCK_P2P_NAKA_PUNK
} from "@constants/mockupMarketplace"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"
import { getCurrentNaka } from "@feature/inventory/containers/services/inventory.service"

const CardItemMarketPlace = dynamic(
  () => import("@components/molecules/cards/CardItemMarketPlace"),
  {
    suspense: true
  }
)

type ItemType = "game" | "land" | "building" | "material" | "naka-punk"

const MarketplaceP2PCardList = () => {
  const [gameItemData, setGameItemData] = useState<IMarketplaceInfoData[]>([])
  const [nakaUsdPrice, setNakaUsdPrice] = useState<number>(0)
  const [type, setType] = useState<ItemType>("land")
  const { pathname } = useRouter()

  const getPrice = async () => {
    const prices = await getCurrentNaka()
    if (prices) {
      setNakaUsdPrice(parseFloat(prices.data.last))
    }
  }

  useEffect(() => {
    getPrice()
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      if (pathname.includes("game")) {
        setType("game")
        setGameItemData(MOCK_P2P_GAME_ITEM.data)
      } else if (pathname.includes("building")) {
        setType("building")
        setGameItemData(MOCK_P2P_BUILDING.data)
      } else if (pathname.includes("material")) {
        setType("material")
        setGameItemData(MOCK_P2P_MATERIAL.data)
      } else if (pathname.includes("naka-punk")) {
        setType("naka-punk")
        setGameItemData(MOCK_P2P_NAKA_PUNK.data)
      } else {
        setType("land")
        setGameItemData(MOCK_P2P_LAND.data)
      }
    }

    handleRouteChange()
  }, [pathname])

  return (
    <div className="grid w-full grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {gameItemData.map((_data, _index) => {
        const handleImage = () => {
          if (type === "game" && _data.item_data) {
            return {
              src: _data.item_data.image,
              alt: _data.item_data.name,
              width: _data.item_data.name.includes("Bullet") ? 40 : 100
            }
          }
          if (type === "building" && _data.building_data) {
            return {
              src: _data.building_data.image,
              alt: _data.building_data.name,
              width: 200,
              height: 200
            }
          }
          if (type === "material" && _data.material_data) {
            return {
              src: _data.material_data.image,
              alt: _data.material_data.name,
              width: 200,
              height: 200
            }
          }
          if (type === "naka-punk" && _data.nakapunk_data) {
            return {
              src: _data.nakapunk_data.image,
              alt: _data.nakapunk_data.name,
              width: 200,
              height: 200
            }
          }
        }
        return (
          <CardItemMarketPlace
            key={uuidv4()}
            cardType={type}
            id={_data.land_data?.land_id}
            itemAmount={type === "game" ? _data.item_amount : undefined}
            itemTotal={_data.item_total}
            itemImage={handleImage()}
            itemVideo={
              _data.land_data && {
                src: _data.land_data.NFT_video,
                poster: _data.land_data.NFT_image
              }
            }
            itemName={
              _data.land_data?.name ||
              _data.building_data?.name ||
              _data.item_data?.name ||
              _data.material_data?.name ||
              _data.nakapunk_data?.name
            }
            itemLevel={_data.building_data?.level}
            price={_data.price}
            itemSize={_data.item_data?.item_size}
            sellingType={_data.selling_type}
            nakaPrice={(_data.price * nakaUsdPrice) as number}
          />
        )
      })}
    </div>
  )
}

export default MarketplaceP2PCardList
