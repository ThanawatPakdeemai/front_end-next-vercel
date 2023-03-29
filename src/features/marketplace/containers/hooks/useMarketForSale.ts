import { useGetMyForSaleBuilding } from "@feature/building/containers/hooks/useGetMyBuilding"
import { useGetForSaleArcGame } from "@feature/game/marketplace/containers/hooks/useGetMyArcGame"
import { useGetMyForSaleLand } from "@feature/land/containers/hooks/useGetMyLand"
import {
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

  const fetchMyForsale = async () => {
    setOwnerDataForsale([])
    setIsLoading(true)
    if (profile && profile.data) {
      const initPayload = {
        _limit: limit,
        _page: currentPage,
        _search: {
          player_id: profile.data.id,
          seller_type: "user" as TSellerType,
          type: marketType
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
