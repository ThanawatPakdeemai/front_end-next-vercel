import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { useGetMyInstallmentLand } from "@feature/land/containers/hooks/useGetMyLand"
import {
  IInstallData,
  IMarketServForm,
  IOwnerData
} from "@feature/marketplace/interfaces/IMarketService"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import { useEffect, useState } from "react"
import { _toEscapedUtf8String } from "ethers/lib/utils"
import { useGetMyInstallmentBuilding } from "@feature/building/containers/hooks/useGetMyBuilding"
import { useGetMyInstallmentArcGame } from "@feature/game/marketplace/containers/hooks/useGetMyArcGame"
import { useRouter } from "next/router"

dayjs.extend(utc)

const useMartketProcessPayment = () => {
  // state
  const [isLoading, setIsLoading] = useState<boolean>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [ownerDataProcess, setOwnerDataProcess] = useState<IOwnerData[]>([])
  const limit = 15

  // hook
  const router = useRouter()
  const { marketType } = useGlobal()
  const { profile } = useProfileStore()
  const { mutateGetMyInstallmentLand } = useGetMyInstallmentLand()
  const { mutateGetMyInstallmentBuilding } = useGetMyInstallmentBuilding()
  const { mutateGetMyInstallmentArcGame } = useGetMyInstallmentArcGame()

  const _today = dayjs().utc().unix()

  const handleDate = ({
    _keyType,
    _data
  }: {
    _keyType: string
    _data: IInstallData[]
  }) => {
    const _nextBill = _data[0].period.find((_item) => _item.history_id === null)

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

  const fetchMyProcess = async () => {
    setOwnerDataProcess([])
    setIsLoading(true)
    if (profile && profile.data) {
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
          mutateGetMyInstallmentLand(initPayload)
            .then((_res) => {
              const dumpData: IOwnerData[] = _res.data.map((_data) => ({
                type: "land",
                id: _data._id,
                tokenId: _data.NFT_token,
                image: _data.NFT_image,
                video: _data.NFT_video,
                name: _data.name,
                selling_type: handleDate({
                  _keyType: _data.key_type as string,
                  _data: _data.installments_data ? _data.installments_data : []
                })
              }))
              setOwnerDataProcess(dumpData)
              setTotalCount(_res.info.totalCount)
            })
            .finally(() => setIsLoading(false))
          break
        case "nft_building":
          mutateGetMyInstallmentBuilding(initPayload)
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
                selling_type: handleDate({
                  _keyType: _data.key_type as string,
                  _data: _data.installments_data ? _data.installments_data : []
                })
              }))
              setOwnerDataProcess(dumpData)
              setTotalCount(_res.info.totalCount)
            })
            .finally(() => setIsLoading(false))
          break
        case "nft_game":
          mutateGetMyInstallmentArcGame(initPayload)
            .then((_res) => {
              const dumpData: IOwnerData[] = _res.data.map((_data) => ({
                type: "arcade-game",
                id: _data._id,
                tokenId: _data.NFT_info.NFT_token,
                image: _data.image_nft_arcade_game,
                name: _data.name,
                selling_type: handleDate({
                  _keyType: _data.key_type as string,
                  _data: _data.installments_data ? _data.installments_data : []
                })
              }))
              setOwnerDataProcess(dumpData)
              setTotalCount(_res.info.totalCount)
            })
            .finally(() => setIsLoading(false))
          break
        default:
          // prevent incorrect url path
          router.push("/marketplace/inventory/process-payment/land")
          break
      }
    }
  }

  useEffect(() => {
    let load = false

    if (!load) fetchMyProcess()

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
    ownerDataProcess,
    isLoading,
    totalCount,
    currentPage,
    limit,
    setCurrentPage
  }
}

export default useMartketProcessPayment
