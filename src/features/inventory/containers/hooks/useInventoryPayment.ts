import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { useGetMyInstallmentBuilding } from "@feature/building/containers/hooks/useGetMyBuilding"
import { useGetMyInstallmentArcGame } from "@feature/game/marketplace/containers/hooks/useGetMyArcGame"
import { useGetMyInstallmentLand } from "@feature/land/containers/hooks/useGetMyLand"
import {
  IInstallPeriod,
  TType
} from "@feature/marketplace/interfaces/IMarketService"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import { useCallback, useEffect, useMemo, useState } from "react"
import { IInventoryItemList } from "@feature/inventory/interfaces/IInventoryItem"
import Helper from "@utils/helper"
import useMarketFilterStore from "@stores/marketFilter"
import { NextRouter, useRouter } from "next/router"

dayjs.extend(utc)

const useInventoryPayment = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [limit, setLimit] = useState<number>(16)

  const { profile } = useProfileStore()
  const { mutateGetMyInstallmentLand } = useGetMyInstallmentLand()
  const { mutateGetMyInstallmentBuilding } = useGetMyInstallmentBuilding()
  const { mutateGetMyInstallmentArcGame } = useGetMyInstallmentArcGame()
  const { marketType } = useGlobal()

  const [inventoryItemPayment, setInventoryItemPayment] = useState<
    Array<IInventoryItemList>
  >([])
  const { getValueFromTKey, convertTTypeToNFTType } = Helper
  const { sort, search, filterType } = useMarketFilterStore()
  const router: NextRouter = useRouter()
  const _marketType =
    marketType ||
    convertTTypeToNFTType(router.query.type as TType) ||
    "nft_land"

  const handleDate = ({
    _keyType,
    _data
  }: {
    _keyType: string
    _data: IInstallPeriod[]
  }) => {
    const _today = dayjs().utc().unix()
    const _nextBill = _data.find((_item) => _item.history_id === null)
    switch (_keyType) {
      case "owner":
        return "Process selling"
      case "player":
        if (_today < dayjs(_nextBill?.due_date).add(7, "days").utc().unix()) {
          return "Process buying"
        }
        return "Unpaid"
      default:
        return ""
    }
  }

  const fetchInventoryItemPayment = useCallback(async () => {
    let _data: IInventoryItemList[] = []
    let _total = 0
    setIsLoading(true)
    if (profile.data && _marketType && filterType && search && sort) {
      switch (_marketType) {
        case "nft_land":
          await mutateGetMyInstallmentLand({
            _active: true,
            _limit: limit,
            _page: currentPage,
            _search: {
              player_id: profile.data.id,
              type_land:
                filterType.nft_land.length > 0
                  ? filterType.nft_land
                  : undefined,
              nft_token:
                search.length > 0
                  ? (getValueFromTKey(search, "nft_token") as string) // should be nft_token same, discuss with BE team!
                  : undefined
            }
          }).then((_res) => {
            if (_res.data && _res.data.length > 0) {
              _data = _res.data.map((l) => ({
                id: l._id,
                tokenId: l.land_id,
                cardType: "land",
                name: l.name,
                img: l.image,
                vdo: l.NFT_video,
                payment_type: handleDate({
                  _keyType: l.key_type || "",
                  _data: l.installments_data ? l.installments_data.period : []
                })
              }))
              _total = _data.length
            }
          })
          break
        case "nft_building":
          await mutateGetMyInstallmentBuilding({
            _active: true,
            _limit: limit,
            _page: currentPage,
            _search: {
              player_id: profile.data.id,
              type_building:
                filterType.nft_building.length > 0
                  ? filterType.nft_building
                  : undefined,
              nft_token:
                search.length > 0
                  ? (getValueFromTKey(search, "nft_token") as string) // should be nft_token same, discuss with BE team!
                  : undefined
            }
          }).then((_res) => {
            if (_res.data && _res.data.length > 0) {
              _data = _res.data.map((b) => ({
                id: b._id,
                tokenId: b.NFT_token || "",
                cardType: "building",
                name: b.name,
                img: b.image,
                vdo: b.NFT_video,
                level: b.level,
                payment_type: handleDate({
                  _keyType: b.key_type || "",
                  _data: b.installments_data ? b.installments_data.period : []
                })
              }))
              _total = _data.length
            }
          })
          break
        case "nft_game":
          await mutateGetMyInstallmentArcGame({
            _active: true,
            _limit: limit,
            _page: currentPage,
            _search: {
              player_id: profile.data.id,
              nft_token:
                search.length > 0
                  ? (getValueFromTKey(search, "nft_token") as string) // should be nft_token same, discuss with BE team!
                  : undefined
            }
          }).then((_res) => {
            if (_res.data && _res.data.length > 0) {
              _data = _res.data.map((g) => ({
                id: g._id,
                tokenId: g.NFT_info.NFT_token,
                cardType: "arcade-game",
                name: g.name,
                img: `https://ipfs.io/ipfs/${g.NFT_info.image_game_ipfs_cid}`,
                vdo: `https://ipfs.io/ipfs/${g.NFT_info.vdo_game_ipfs_cid}?stream=true`,
                payment_type: handleDate({
                  _keyType: g.key_type || "",
                  _data: g.installments_data ? g.installments_data.period : []
                })
              }))
            }
          })
          break
        default:
          break
      }
    }
    setInventoryItemPayment(_data)
    setTotalCount(_total)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.data, _marketType, limit, currentPage, filterType, search, sort])

  useEffect(() => {
    let cleanup = false
    if (!cleanup) {
      fetchInventoryItemPayment()
    }
    return () => {
      cleanup = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchInventoryItemPayment])

  useMemo(() => {
    let cleanup = false
    if (!cleanup && _marketType) {
      setCurrentPage(1)
    }
    return () => {
      cleanup = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_marketType])

  return {
    inventoryItemPayment,
    isLoading,
    limit,
    currentPage,
    totalCount,
    setLimit,
    setCurrentPage
  }
}

export default useInventoryPayment
