import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { useGetMyInstallmentBuilding } from "@feature/building/containers/hooks/useGetMyBuilding"
import { useGetMyInstallmentArcGame } from "@feature/game/marketplace/containers/hooks/useGetMyArcGame"
import { useGetMyInstallmentLand } from "@feature/land/containers/hooks/useGetMyLand"
import {
  IInstallPeriod,
  IMarketServForm,
  TType
} from "@feature/marketplace/interfaces/IMarketService"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import { useCallback, useEffect, useState } from "react"

dayjs.extend(utc)

interface IInventoryList {
  id: string
  tokenId: string
  cardType: TType
  name: string
  img: string
  vdo?: string
  model?: string
  amount?: number
  size?: string
  level?: string | number
  percentage?: number
  price?: number
  href?: string
  keyType?: string // "owner"
  rental?: {
    totalPeriod: number
    totalBalancePeriod: number
    totalPrice: number
    exp: Date
  }
  payment_type?: string
}

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
    Array<IInventoryList>
  >([])

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
    let _data: IInventoryList[] = []
    let _total = 0
    setIsLoading(true)
    if (profile.data && marketType) {
      const initPayload: IMarketServForm = {
        _active: true,
        _limit: limit,
        _page: currentPage,
        _search: {
          player_id: profile.data.id,
          type: marketType
        }
      }
      switch (marketType) {
        case "nft_land":
          await mutateGetMyInstallmentLand(initPayload).then((_res) => {
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
                  _data: l.installments_data
                    ? l.installments_data[0].period
                    : []
                })
              }))
              _total = _data.length
            }
          })
          break
        case "nft_building":
          mutateGetMyInstallmentBuilding(initPayload).then((_res) => {
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
                  _data: b.installments_data
                    ? b.installments_data[0].period
                    : []
                })
              }))
              _total = _data.length
            }
          })
          break
        case "nft_game":
          mutateGetMyInstallmentArcGame(initPayload).then((_res) => {
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
                  _data: g.installments_data
                    ? g.installments_data[0].period
                    : []
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
  }, [marketType, profile.data])

  useEffect(() => {
    let cleanup = false
    if (!cleanup && marketType && profile.data) {
      fetchInventoryItemPayment()
    }
    return () => {
      cleanup = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.data, marketType])

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
