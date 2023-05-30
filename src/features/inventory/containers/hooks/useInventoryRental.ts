import { useGetMyRentalBuilding } from "@feature/building/containers/hooks/useGetMyBuilding"
import { IInventoryItemList } from "@feature/inventory/interfaces/IInventoryItem"
import { useGetMyRentalLand } from "@feature/land/containers/hooks/useGetMyLand"
import useGlobal from "@hooks/useGlobal"
import useMarketFilterStore from "@stores/marketFilter"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { useCallback, useEffect, useMemo, useState } from "react"

const useInventoryRental = () => {
  const { profile } = useProfileStore()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [limit, setLimit] = useState<number>(16)
  const { mutateGetMyRentalLand } = useGetMyRentalLand()
  const { mutateGetMyRentalBuilding } = useGetMyRentalBuilding()
  const { marketType } = useGlobal()
  const _marketType = marketType || "nft_land"

  const [inventoryItemRental, setInventoryItemRental] = useState<
    Array<IInventoryItemList>
  >([])

  const { sort, filterType, search } = useMarketFilterStore()
  const { getValueFromTKey } = Helper

  const fetchInventoryRental = useCallback(async () => {
    let _data: IInventoryItemList[] = []
    let _total: number = 0
    setIsLoading(true)
    if (profile.data && _marketType && filterType && search && sort) {
      switch (_marketType) {
        case "nft_land":
          await mutateGetMyRentalLand({
            _limit: limit,
            _page: currentPage,
            _search: {
              type_land:
                filterType.nft_land.length > 0
                  ? filterType.nft_land
                  : undefined,
              land_id:
                search.length > 0
                  ? (getValueFromTKey(search, "land_id") as string) // should be same as same nft_token
                  : undefined
            }
          })
            .then((_res) => {
              if (_res.data && _res.data.length > 0) {
                _data = _res.data.map((l) => ({
                  id: l._id,
                  tokenId: l.land_id,
                  cardType: "land",
                  name: l.name,
                  img: l.NFT_image,
                  vdo: l.NFT_video,
                  keyType: l.key_type,
                  rental: {
                    totalPeriod: l.rentals_data
                      ? l.rentals_data.period_total
                      : 0,
                    totalBalancePeriod: l.rentals_data
                      ? l.rentals_data.period_balance
                      : 0,
                    totalPrice: l.rentals_data ? l.rentals_data.total_price : 0,
                    exp: l.rentals_data ? l.rentals_data.rent_end : new Date(),
                    owner: l.rentals_data
                      ? l.rentals_data.seller_address
                      : undefined,
                    buyer: l.rentals_data
                      ? l.rentals_data.buyer_address
                      : undefined
                  }
                }))
                _total = _res.info.totalCount
              }
            })
            .catch(() => {})
          break
        case "nft_building":
          await mutateGetMyRentalBuilding({
            _limit: limit,
            _page: currentPage,
            _search: {
              type_building:
                filterType.nft_building.length > 0
                  ? filterType.nft_building
                  : undefined,
              nft_token:
                search.length > 0
                  ? (getValueFromTKey(search, "nft_token") as string) // should be same as same nft_token
                  : undefined
            }
          })
            .then((_res) => {
              if (_res.data && _res.data.length > 0) {
                _data = _res.data.map((b) => ({
                  id: b._id,
                  tokenId: b.NFT_token || "",
                  cardType: "building",
                  name: b.name,
                  img: b.NFT_image,
                  vdo: b.NFT_video,
                  keyType: b.key_type,
                  level: b.level,
                  percentage:
                    b.deteriorate_building?.rate_deteriorate.percentage || 0,
                  rental: {
                    totalPeriod: b.rentals_data
                      ? b.rentals_data.period_total
                      : 0,
                    totalBalancePeriod: b.rentals_data
                      ? b.rentals_data.period_balance
                      : 0,
                    totalPrice: b.rentals_data ? b.rentals_data.total_price : 0,
                    exp: b.rentals_data ? b.rentals_data.rent_end : new Date(),
                    owner: b.rentals_data
                      ? b.rentals_data.seller_address
                      : undefined,
                    buyer: b.rentals_data
                      ? b.rentals_data.buyer_address
                      : undefined
                  }
                }))
                _total = _res.info.totalCount
              }
            })
            .catch(() => {})
          break
        default:
          break
      }
    }
    setInventoryItemRental(_data)
    setTotalCount(_total)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.data, _marketType, currentPage, limit, filterType, search, sort])

  useEffect(() => {
    let load = false
    if (!load) {
      fetchInventoryRental()
    }
    return () => {
      load = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchInventoryRental])

  useEffect(() => {
    let cleanup = false
    if (!cleanup) {
      setIsLoading(true)
    }
    return () => {
      cleanup = true
    }
  }, [fetchInventoryRental])

  useMemo(() => {
    let load = false
    if (!load) {
      setCurrentPage(1)
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketType])

  return {
    isLoading,
    totalCount,
    currentPage,
    limit,
    setLimit,
    setCurrentPage,
    inventoryItemRental
  }
}

export default useInventoryRental
