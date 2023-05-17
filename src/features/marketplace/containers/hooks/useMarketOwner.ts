import CONFIGS from "@configs/index"
import useMutateAvatarReef from "@feature/avatarReef/containers/hook/useMutateAvatarReef"
import { useGetMyBuilding } from "@feature/building/containers/hooks/useGetMyBuilding"
import { useGetMyArcGame } from "@feature/game/marketplace/containers/hooks/useGetMyArcGame"
import useInventoryContext from "@feature/inventory/containers/hooks/useInventoryContext"
import { useGetMyLand } from "@feature/land/containers/hooks/useGetMyLand"
import useNFTLand from "@feature/land/containers/hooks/useNFTLand"
import { IOwnerData } from "@feature/marketplace/interfaces/IMarketService"
import { useGetMyNakaPunk } from "@feature/nakapunk/containers/hooks/useGetMyNakapunk"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

// owner
const useMartketOwner = () => {
  // state
  const [isLoading, setIsLoading] = useState<boolean>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [ownerData, setOwnerData] = useState<IOwnerData[]>([])
  const limit = 15

  // hook
  const router = useRouter()
  const { marketType } = useGlobal()
  const { profile } = useProfileStore()
  const { getLandsOfAddress } = useNFTLand()
  const { mutateGetMyLand } = useGetMyLand()
  const { mutateGetOwnerBuilding } = useGetMyBuilding()
  const { mutateGetMyNakaPunk } = useGetMyNakaPunk()
  const { mutateGeyMyArcGame } = useGetMyArcGame()
  const { mutateGetMyAvatarReef } = useMutateAvatarReef()
  const { gameItemList, materialList } = useInventoryContext()

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
            _urlNFT: "NFT-Land",
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
            _urlNFT: "NFT-Building",
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
            _urlNFT: "NFT-NakaPunk",
            _limit: limit,
            _active: true,
            _page: currentPage,
            _search: {
              type_marketplace: marketType
            }
          })
            .then((_res) => {
              const dumpData: IOwnerData[] = _res.data.map((_data) => ({
                type: "naka-punk",
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
            _urlNFT: "NFT-As-Game",
            _limit: limit,
            _page: currentPage,
            _search: {}
          })
            .then((_res) => {
              const dumpData: IOwnerData[] = _res.data.map((_data) => ({
                type: "arcade-game",
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
        case "nft_avatar":
          mutateGetMyAvatarReef({
            _urlNFT: "NFT-Avatar",
            _limit: limit,
            _active: true,
            _page: currentPage,
            _search: {
              type_marketplace: marketType
            }
          })
            .then((_res) => {
              const dumpData: IOwnerData[] = _res.data.map((_data) => ({
                type: "avatar-reef",
                id: _data.id,
                tokenId: _data.NFT_token,
                image: _data.image,
                name: _data.name
              }))
              setOwnerData(dumpData)
              setTotalCount(_res.info.totalCount)
            })
            .finally(() => setIsLoading(false))
          break
        default:
          // prevent incorrect url path
          router.push("/marketplace/inventory/land")
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
            type: "material",
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
    let load = false

    if (!load) {
      if (marketType) {
        if (marketType !== "game_item" && marketType !== "nft_material") {
          fetchOwnerDataList()
        }
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketType, currentPage])

  useEffect(() => {
    let load = false
    if (
      !load &&
      marketType &&
      gameItemList &&
      materialList &&
      (marketType === "game_item" || marketType === "nft_material")
    ) {
      fetchWithContract()
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameItemList, materialList, marketType, currentPage])

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
    isLoading,
    currentPage,
    totalCount,
    limit,
    ownerData,
    setCurrentPage
  }
}

export default useMartketOwner
