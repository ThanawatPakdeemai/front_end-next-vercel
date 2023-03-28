import useGetMarketOrder from "@feature/marketplace/hooks/getMarketOrder"
import {
  IMarketDetail,
  IMarketOrderServ,
  IMarketServForm,
  TType
} from "@feature/marketplace/interfaces/IMarketService"
import useGlobal from "@hooks/useGlobal"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"

const useMarketInfo = () => {
  const [orderData, setOrderData] = useState<IMarketOrderServ | undefined>(
    undefined
  )
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [type, setType] = useState<TType>("land")
  const [totalCount, setTotalCount] = useState<number>(0)

  const router = useRouter()
  const { marketType } = useGlobal()
  const { getMarketOrderAsnyc, isLoading } = useGetMarketOrder()
  const limit = 15

  // all fetch info lsit
  const handleSearch = useCallback(async () => {
    const marketplaceMap = {
      "building": {
        type_marketplace: "nft_building"
      },
      "game-item": {
        type_marketplace: "game_item"
      },
      "material": {
        type_marketplace: "nft_material"
      },
      "naka-punk": {
        type_marketplace: "nft_naka_punk",
        seller_type: "user"
      },
      "arcade-game": {
        type_marketplace: "nft_game",
        seller_type: "user"
      },
      "land": {
        type_marketplace: "nft_land"
      }
    }

    const _type = Object.keys(marketplaceMap).find((key) =>
      router.pathname.includes(key)
    )!
    const marketplace = marketplaceMap[_type] ?? marketplaceMap.land
    const sellerType = router.pathname.includes("p2p") ? "user" : "system"

    return {
      type: _type ?? "land",
      search: {
        type_marketplace: marketplace.type_marketplace,
        seller_type: marketplace.seller_type ?? sellerType
      }
    }
  }, [router.pathname])

  const handleImage = (_data: IMarketDetail) => {
    if (marketType === "game_item" && _data.item_data) {
      return {
        src: _data.item_data.image,
        alt: _data.item_data.name,
        width: _data.item_data.name.includes("Bullet") ? 40 : 100
      }
    }
    if (marketType === "nft_building" && _data.building_data) {
      return {
        src: _data.building_data.image,
        alt: _data.building_data.name,
        width: 200,
        height: 200
      }
    }
    if (marketType === "nft_material" && _data.material_data) {
      return {
        src: _data.material_data.image,
        alt: _data.material_data.name,
        width: 200,
        height: 200
      }
    }
    if (marketType === "nft_naka_punk" && _data.nakapunk_data) {
      return {
        src: _data.nakapunk_data.image,
        alt: _data.nakapunk_data.name,
        width: 200,
        height: 200
      }
    }
    if (marketType === "nft_game" && _data.game_data) {
      return {
        src: _data.game_data.image_nft_arcade_game,
        alt: _data.game_data.name,
        width: 200,
        height: 200
      }
    }
  }

  const fetchOrderList = useCallback(async () => {
    const search = await handleSearch()
    setType(search.type as TType)
    getMarketOrderAsnyc({
      _limit: limit,
      _page: currentPage,
      _search: search.search
    } as IMarketServForm).then((_res) => {
      setOrderData(_res)
      setTotalCount(_res.info.totalCount)
    })
  }, [currentPage, getMarketOrderAsnyc, handleSearch, limit])

  useEffect(() => {
    fetchOrderList()
  }, [currentPage, fetchOrderList])
  // end fetch info list

  return {
    orderData,
    isLoading,
    totalCount,
    currentPage,
    type,
    limit,
    handleImage,
    setCurrentPage
  }
}

export default useMarketInfo
