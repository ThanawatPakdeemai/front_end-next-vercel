import useGetMarketOrder from "@feature/marketplace/hooks/getMarketOrder"
import {
  IMarketDetail,
  IMarketOrderServ,
  IMarketServForm,
  TNFTType,
  TType
} from "@feature/marketplace/interfaces/IMarketService"
import useGlobal from "@hooks/useGlobal"
import useMarketFilterStore, { TKey } from "@stores/marketFilter"
import { useRouter } from "next/router"
import Helper from "@utils/helper"
import { useCallback, useEffect, useState } from "react"

const useMarketInfo = () => {
  const [orderData, setOrderData] = useState<IMarketOrderServ | undefined>(
    undefined
  )
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [type, setType] = useState<TType>("land")
  const [totalCount, setTotalCount] = useState<number>(0)
  const [searchData, setSearchData] = useState<TKey>()

  const { convertNFTTypeToUrl, convertMarketTypeToTType } = Helper
  const router = useRouter()
  const { marketType } = useGlobal()
  const { getMarketOrderAsnyc, isLoading } = useGetMarketOrder()
  const limit = 15
  const {
    sort,
    search: searchText,
    filter: filterItem
  } = useMarketFilterStore()

  const sortData = sort.reduce((acc, curr) => Object.assign(acc, curr), {})

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchData(
        searchText.reduce((acc, curr) => Object.assign(acc, curr), {})
      )
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [searchText])

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
        src: _data.building_data.NFT_image,
        alt: _data.building_data.name,
        width: 500,
        height: 500
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

    const search: any = {
      type_marketplace: marketplace.type_marketplace,
      seller_type: marketplace.seller_type ?? sellerType,
      ...searchData
    }

    if (filterItem.length > 0) {
      switch (marketType) {
        case "nft_land":
          search.type_land = filterItem
          break
        case "nft_building":
          search.type_building = filterItem
          break
        case "game_item":
          search.item_id = filterItem
          break
        case "nft_material":
          search.type_material = filterItem
          break
        default:
          break
      }
    }

    return search
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, searchData, filterItem, marketType])

  const fetchOrderList = useCallback(async () => {
    const search = await handleSearch()
    getMarketOrderAsnyc({
      _urlNFT: convertNFTTypeToUrl(search.type_marketplace as TNFTType),
      _limit: limit,
      _page: currentPage,
      _search: search,
      _sort: sortData
    } as IMarketServForm).then((_res) => {
      setOrderData(_res)
      setTotalCount(_res.info.totalCount)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    getMarketOrderAsnyc,
    handleSearch,
    limit,
    sort,
    // searchText,
    searchData
  ])

  useEffect(() => {
    let load = false

    if (!load) fetchOrderList()

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchData, sort, filterItem])

  useEffect(() => {
    let load = false

    if (!load && marketType) {
      setType(convertMarketTypeToTType(marketType))
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketType])
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
