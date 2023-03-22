import useGetMarketOrder from "@feature/marketplace/hooks/getMarketOrder"
import useGetMarketOrderById from "@feature/marketplace/hooks/getMarketOrderById"
import {
  IMarketDetail,
  IMarketOrderServ,
  IMarketServForm,
  TNFTType,
  TType
} from "@feature/marketplace/interfaces/IMarketService"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"

const useMarketplace = () => {
  const router = useRouter()
  const [nameNFT, setNameNFT] = useState<string | undefined>(undefined)
  const [tokenNFT, setTokenNFT] = useState<string | undefined>(undefined)
  const [orderData, setOrderData] = useState<IMarketOrderServ | undefined>(
    undefined
  )
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [type, setType] = useState<TType>("land")
  const [totalCount, setTotalCount] = useState<number>(0)
  const { getMarketOrderAsnyc, isLoading } = useGetMarketOrder()
  const limit = 15

  const handleSelectToken = (
    _type: TNFTType | undefined,
    _data: IMarketDetail
  ) => {
    let _tokenId: string = "000000"
    let _nameNFT: string = "NFT-Namce"
    switch (_type) {
      case "game_item":
        if (_data.item_data) {
          _tokenId = _data.item_data.item_id_smartcontract.toString()
          _nameNFT = _data.item_data.name
        }
        break
      case "nft_material":
        if (_data.material_data) {
          _tokenId = _data.material_data.material_id_smartcontract.toString()
          _nameNFT = _data.material_data.name
        }
        break
      case "nft_land":
        if (_data.land_data) {
          _tokenId = _data.land_data.land_id
          _nameNFT = _data.land_data.name
        }
        break
      case "nft_building":
        if (_data.building_data && _data.building_data.NFT_token) {
          _tokenId = _data.building_data.NFT_token
          _nameNFT = _data.building_data.name
        }
        break
      case "nft_naka_punk":
        if (_data.nakapunk_data) {
          _tokenId = _data.nakapunk_data.NFT_token
          _nameNFT = _data.nakapunk_data.name
        }
        break
      case "nft_game":
        if (_data.game_data) {
          _tokenId = _data.game_data.NFT_info.NFT_token
          _nameNFT = _data.game_data.name
        }
        break
      default:
        break
    }
    setTokenNFT(_tokenId)
    setNameNFT(_nameNFT)
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

    return {
      type: _type ?? "land",
      search: {
        type_marketplace: marketplace.type_marketplace,
        seller_type: marketplace.seller_type ?? sellerType
      }
    }
  }, [router.pathname])

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

  // fetch detail
  const [detailData, setDetailData] = useState<IMarketDetail>()
  const getPathnameType = router.pathname.split("/")[2]
  const id = router.query.id as string

  const handleType = () => {
    let _type: TNFTType | undefined
    switch (getPathnameType) {
      case "land":
        _type = "nft_land"
        break
      case "building":
        _type = "nft_building"
        break
      case "naka-punk":
        _type = "nft_naka_punk"
        break
      case "material":
        _type = "nft_material"
        break
      case "game":
        _type = "game_item"
        break
      default:
        break
    }
    return _type
  }

  const handleImage = (_data: IMarketDetail) => {
    if (type === "game-item" && _data.item_data) {
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
    if (type === "arcade-game" && _data.game_data) {
      return {
        src: _data.game_data.image_nft_arcade_game,
        alt: _data.game_data.name,
        width: 200,
        height: 200
      }
    }
  }

  const { orderData: detailOrder } = useGetMarketOrderById({
    _id: id,
    _type: handleType(),
    _isActive: true
  })

  useEffect(() => {
    if (detailOrder) {
      const result = detailOrder.data[0]
      setDetailData(result)
      handleSelectToken(handleType(), result)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailOrder])
  // end fetch detail

  return {
    nameNFT,
    tokenNFT,
    orderData,
    isLoading,
    totalCount,
    currentPage,
    type,
    limit,
    detailData,
    id,
    handleImage,
    setCurrentPage
  }
}

export default useMarketplace
