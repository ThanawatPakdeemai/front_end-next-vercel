import CONFIGS from "@configs/index"
import useGetMyBuilding from "@feature/building/containers/hooks/useGetMyBuilding"
import useGetMyArcGame from "@feature/game/marketplace/containers/hooks/useGetMyArcGame"
import useInvenGameItem from "@feature/gameItem/inventory/containers/hooks/useInvenGameItem"
import useGetMyLand from "@feature/land/containers/hooks/useGetMyLand"
import useNFTLand from "@feature/land/containers/services/hooks/useNFTLand"
import { TType } from "@feature/marketplace/interfaces/IMarketService"
import useInvenMaterial from "@feature/material/inventory/containers/hooks/useInvenMaterial"
import useGetMyNakaPunk from "@feature/nakapunk/containers/hooks/useGetMyNakapunk"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import { useEffect, useState } from "react"

interface IOwnerData {
  type: TType
  id: string
  tokenId?: string
  image: string
  video?: string
  name: string
  durability?: string | number
  level?: string | number
  size?: string | number
  amount?: string | number
}

const useMartketOwner = () => {
  // state
  const [isLoading, setIsLoading] = useState<boolean>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [ownerData, setOwnerData] = useState<IOwnerData[]>([])
  const limit = 15

  // hook
  const { marketType } = useGlobal()
  const { profile } = useProfileStore()
  const { getLandsOfAddress } = useNFTLand()
  const { gameItemList } = useInvenGameItem()
  const { materialList } = useInvenMaterial()
  const { mutateGetMyLand } = useGetMyLand()
  const { mutateGetOwnerBuilding } = useGetMyBuilding()
  const { mutateGetMyNakaPunk } = useGetMyNakaPunk()
  const { mutateGeyMyArcGame } = useGetMyArcGame()

  const fetchOwnerDataList = async () => {
    setOwnerData([])
    setIsLoading(true)
    if (profile && profile.data) {
      const allLandResponse = await getLandsOfAddress(
        CONFIGS.CONTRACT_ADDRESS.LAND_NFT,
        profile.data.address
      )
      const cvLandList: string[] = allLandResponse.map((item) =>
        item.toString()
      )
      switch (marketType) {
        case "nft_land":
          mutateGetMyLand({
            _limit: limit,
            _page: currentPage,
            _search: {
              isRent: false,
              player_id: profile.data.id,
              type: marketType
            },
            _landList: cvLandList
          })
            .then((_res) => {
              const dumpData: IOwnerData[] = _res.data.map((_data) => ({
                type: "land",
                id: _data._id,
                tokenId: _data.NFT_token,
                image: _data.NFT_image,
                video: _data.NFT_video,
                name: _data.name
              }))
              setOwnerData(dumpData)
              setTotalCount(_res.info.totalCount)
            })
            .finally(() => setIsLoading(false))

          break
        case "nft_building":
          mutateGetOwnerBuilding({
            _limit: limit,
            _page: currentPage,
            _search: {
              isRent: false,
              player_id: profile.data.id
            }
          })
            .then((_res) => {
              const dumpData: IOwnerData[] = _res.data.map((_data) => ({
                type: "building",
                id: _data._id,
                tokenId: _data.NFT_token,
                image: _data.NFT_image,
                name: _data.name,
                level: _data.level,
                durability:
                  _data.deteriorate_building?.rate_deteriorate.percentage
              }))
              setOwnerData(dumpData)
              setTotalCount(_res.info.totalCount)
            })
            .finally(() => setIsLoading(false))
          break
        case "nft_naka_punk":
          mutateGetMyNakaPunk({
            _limit: limit,
            _active: true,
            _page: currentPage,
            _search: {
              type_marketplace: marketType
            }
          })
            .then((_res) => {
              const dumpData: IOwnerData[] = _res.data.map((_data) => ({
                type: "land",
                id: _data._id,
                tokenId: _data.NFT_token,
                image: _data.image,
                name: _data.name
              }))
              setOwnerData(dumpData)
              setTotalCount(_res.info.totalCount)
            })
            .finally(() => setIsLoading(false))
          break
        case "nft_game":
          mutateGeyMyArcGame({
            _limit: limit,
            _page: currentPage,
            _search: {}
          })
            .then((_res) => {
              const dumpData: IOwnerData[] = _res.data.map((_data) => ({
                type: "land",
                id: _data._id,
                tokenId: _data.NFT_info.NFT_token,
                image: _data.image_nft_arcade_game,
                name: _data.name
              }))
              setOwnerData(dumpData)
              setTotalCount(_res.info.totalCount)
            })
            .finally(() => setIsLoading(false))
          break
        default:
          break
      }
    }
  }

  const fetchWithContract = async () => {
    setOwnerData([])
    switch (marketType) {
      case "nft_material":
        if (materialList) {
          const dumpData: IOwnerData[] = materialList.map((_data) => ({
            type: "game-item",
            id: _data.id,
            image: _data.image,
            amount: _data.amount,
            name: _data.name
          }))
          setOwnerData(dumpData)
          setTotalCount(dumpData.length)
          setIsLoading(false)
        }
        break

      case "game_item":
        if (gameItemList) {
          const dumpData: IOwnerData[] =
            gameItemList &&
            gameItemList.map((_data) => ({
              type: "game-item",
              id: _data.id,
              image: _data.image,
              size: _data.item_size,
              amount: _data.amount,
              name: _data.name
            }))
          setOwnerData(dumpData)
          setTotalCount(dumpData.length)
          setIsLoading(false)
        }
        break

      default:
        break
    }
  }

  useEffect(() => {
    if (marketType) {
      if (marketType !== "game_item" && marketType !== "nft_material") {
        fetchOwnerDataList()
      } else {
        fetchWithContract()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketType, currentPage])

  useEffect(() => {
    if (currentPage > 1) {
      setCurrentPage(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketType])

  return {
    isLoading,
    currentPage,
    totalCount,
    limit,
    ownerData,
    setCurrentPage
  }
}

export default useMartketOwner