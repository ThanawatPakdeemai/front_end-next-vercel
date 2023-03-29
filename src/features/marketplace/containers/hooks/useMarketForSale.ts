import { useGetMyForSaleBuilding } from "@feature/building/containers/hooks/useGetMyBuilding"
import { useGetForSaleArcGame } from "@feature/game/marketplace/containers/hooks/useGetMyArcGame"
import { useGetMyForSaleLand } from "@feature/land/containers/hooks/useGetMyLand"
import useGetMarketOrder from "@feature/marketplace/hooks/getMarketOrder"
import {
  IMarketServForm,
  IOwnerData,
  TSellerType
} from "@feature/marketplace/interfaces/IMarketService"
import { useGetMyForSaleNakaPunk } from "@feature/nakapunk/containers/hooks/useGetMyNakapunk"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import { useEffect, useState } from "react"

const useMarketForSale = () => {
  // state
  const [isLoading, setIsLoading] = useState<boolean>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [ownerDataForsale, setOwnerDataForsale] = useState<IOwnerData[]>([])
  const limit = 15

  // hook
  const { marketType } = useGlobal()
  const { profile } = useProfileStore()
  const { mutateGetMyForSaleLand } = useGetMyForSaleLand()
  const { mutateGetMyForSaleBuilding } = useGetMyForSaleBuilding()
  const { mutateGetMyForsaleNakaPunk } = useGetMyForSaleNakaPunk()
  const { mutateGetForsaleArcGame } = useGetForSaleArcGame()
  const { getMarketOrderAsnyc } = useGetMarketOrder()

  const fetchMyForsale = async () => {
    setOwnerDataForsale([])
    setIsLoading(true)
    if (profile && profile.data) {
      const initPayload: IMarketServForm = {
        _limit: limit,
        _page: currentPage,
        _search: {
          player_id: profile.data.id,
          seller_type: "user" as TSellerType,
          type: marketType
        }
      }
      const infoPayload: IMarketServForm = {
        _limit: limit,
        _page: currentPage,
        _sort: {},
        _search: {
          seller_id: profile.data.address,
          seller_type: "user",
          type: marketType,
          type_marketplace: marketType
        }
      }
      switch (marketType) {
        case "nft_land":
          mutateGetMyForSaleLand(initPayload)
            .then((_res) => {
              const dumpData: IOwnerData[] = _res.data.map((_data) => ({
                type: "land",
                id: _data._id,
                tokenId: _data.NFT_token,
                image: _data.NFT_image,
                video: _data.NFT_video,
                name: _data.name,
                selling_type: _data.marketplaces_data
                  ? _data.marketplaces_data[0].selling_type
                  : undefined,
                price: _data.marketplaces_data
                  ? _data.marketplaces_data[0].price
                  : undefined
              }))
              setOwnerDataForsale(dumpData)
              setTotalCount(_res.info.totalCount)
            })
            .finally(() => setIsLoading(false))
          break
        case "nft_building":
          mutateGetMyForSaleBuilding(initPayload)
            .then((_res) => {
              const dumpData: IOwnerData[] = _res.data.map((_data) => ({
                type: "building",
                id: _data._id,
                tokenId: _data.NFT_token,
                image: _data.NFT_image,
                name: _data.name,
                level: _data.level,
                durability:
                  _data.deteriorate_building?.rate_deteriorate.percentage,
                selling_type: _data.marketplaces_data
                  ? _data.marketplaces_data[0].selling_type
                  : undefined,
                price: _data.marketplaces_data
                  ? _data.marketplaces_data[0].price
                  : undefined
              }))
              setOwnerDataForsale(dumpData)
              setTotalCount(_res.info.totalCount)
            })
            .finally(() => setIsLoading(false))
          break
        case "nft_naka_punk":
          mutateGetMyForsaleNakaPunk({
            _active: true,
            ...initPayload
          })
            .then((_res) => {
              const dumpData: IOwnerData[] = _res.data.map((_data) => ({
                type: "land",
                id: _data._id,
                tokenId: _data.NFT_token,
                image: _data.image,
                name: _data.name,
                price: _data.marketplaces_data
                  ? _data.marketplaces_data[0].price
                  : undefined
              }))
              setOwnerDataForsale(dumpData)
              setTotalCount(_res.info.totalCount)
            })
            .finally(() => setIsLoading(false))
          break
        case "nft_game":
          mutateGetForsaleArcGame({
            _limit: limit,
            _search: {},
            _page: currentPage,
            _sort: {
              _id: -1
            }
          })
            .then((_res) => {
              const dumpData: IOwnerData[] = _res.data.map((_data) => ({
                type: "arcade-game",
                id: _data._id,
                tokenId: _data.NFT_info.NFT_token,
                image: _data.image_nft_arcade_game,
                name: _data.name,
                price: _data.marketplaces_data
                  ? _data.marketplaces_data[0].price
                  : undefined
              }))
              setOwnerDataForsale(dumpData)
              setTotalCount(_res.info.totalCount)
            })
            .finally(() => setIsLoading(false))
          break
        default:
          if (marketType === "game_item" || marketType === "nft_material") {
            getMarketOrderAsnyc(infoPayload)
              .then((_res) => {
                const dumpData: IOwnerData[] = _res.data.map((_data) => {
                  if (marketType === "game_item" && _data.item_data) {
                    return {
                      type: "game-item",
                      id: _data.item_id,
                      image: _data.item_data.image,
                      size: _data.item_data?.item_size,
                      amount: _data.item_amount,
                      name: _data.item_data.name,
                      price: _data.price
                    }
                  }
                  return {
                    type: "material",
                    id: _data.item_id,
                    image: String(_data.material_data?.image),
                    amount: _data.item_amount,
                    name: String(_data.material_data?.name),
                    price: _data.price
                  }
                })
                setOwnerDataForsale(dumpData)
                setTotalCount(_res.info.totalCount)
              })
              .finally(() => setIsLoading(false))
          }
          break
      }
    }
  }

  useEffect(() => {
    let load = false

    if (!load) fetchMyForsale()

    return () => {
      load = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketType, currentPage])

  useEffect(() => {
    let load = false

    if (!load) {
      if (currentPage > 1) {
        setCurrentPage(1)
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketType])

  return {
    ownerDataForsale,
    isLoading,
    totalCount,
    currentPage,
    limit,
    setCurrentPage
  }
}

export default useMarketForSale
