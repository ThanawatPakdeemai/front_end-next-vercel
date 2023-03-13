import {
  IMarketplaceInfoData,
  MOCK_BUILDING,
  MOCK_LAND
} from "@constants/mockupMarketplace"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"
import { ICurrentNakaData } from "@feature/inventory/interfaces/IInventoryService"
import { getCurrentNaka } from "@feature/inventory/containers/services/inventory.service"

const CardItemMarketPlace = dynamic(
  () => import("@components/molecules/cards/CardItemMarketPlace"),
  {
    suspense: true
  }
)

const MarketplaceCardList = () => {
  const [gameItemData, setGameItemData] = useState<IMarketplaceInfoData[]>([])
  const [price, setPrice] = useState<ICurrentNakaData>()
  const [type, setType] = useState<"game" | "land" | "building" | "material">(
    "land"
  )
  const { pathname } = useRouter()

  const getPrice = async () => {
    const prices = await getCurrentNaka()
    if (prices) {
      setPrice(prices.data)
    }
  }

  useEffect(() => {
    getPrice()
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      if (pathname.includes("building")) {
        setType("building")
        setGameItemData(MOCK_BUILDING.data)
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
          key={uuidv4()}
          cardType={type}
          id={_data.land_data?.land_id}
          itemAmount={_data.item_amount}
          itemTotal={_data.item_total}
          itemImage={
            _data.building_data && {
              src: _data.building_data.image,
              alt: _data.building_data.name,
              width: 250,
              height: 250
            }
          }
          itemVideo={
            _data.land_data && {
              src: _data.land_data.NFT_video,
              poster: _data.land_data.NFT_image
            }
          }
          itemName={_data.land_data?.name || _data.building_data?.name}
          itemLevel={_data.building_data?.level}
          price={_data.price / (price?.last as number)}
        />
      ))}
    </div>
  )
}

export default MarketplaceCardList
