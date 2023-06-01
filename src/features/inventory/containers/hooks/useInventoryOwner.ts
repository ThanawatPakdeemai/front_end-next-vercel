import { useInventoryProvider } from "@providers/InventoryProvider"
import { useCallback, useEffect, useMemo, useState, useRef } from "react"
import { useGetMyLand } from "@feature/land/containers/hooks/useGetMyLand"
import useProfileStore from "@stores/profileStore"
import useNFTLand from "@feature/land/containers/hooks/useNFTLand"
import CONFIGS from "@configs/index"
import { useGetMyBuilding } from "@feature/building/containers/hooks/useGetMyBuilding"
import { useGetMyArcGame } from "@feature/game/marketplace/containers/hooks/useGetMyArcGame"
import { useGetMyNakaPunk } from "@feature/nakapunk/containers/hooks/useGetMyNakapunk"
import useMutateAvatarReef from "@feature/avatarReef/containers/hook/useMutateAvatarReef"
import useGlobal from "@hooks/useGlobal"
import { IInventoryItemList } from "@feature/inventory/interfaces/IInventoryItem"
import useMarketFilterStore from "@stores/marketFilter"
import Helper from "@utils/helper"
import { NextRouter, useRouter } from "next/router"
import { TType } from "@feature/marketplace/interfaces/IMarketService"

const useInventoryOwner = () => {
  const ref = useRef<boolean>(false)
  const router: NextRouter = useRouter()
  const { profile } = useProfileStore()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isItemLoading, setItemIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [limit, setLimit] = useState<number>(16)
  const { marketType } = useGlobal()
  const { sort, search, filterType } = useMarketFilterStore()
  // game-item
  // material
  const { gameItemList, materialList } = useInventoryProvider()
  // land
  const [isFetchAllLand, setIsFetchAllLand] = useState<boolean>(false)
  const [allLandofAddrsData, setAllLandofAddrsData] = useState<string[]>([])
  const { getLandsOfAddress } = useNFTLand()
  const { mutateGetMyLand } = useGetMyLand()
  // building
  const { mutateGetOwnerBuilding } = useGetMyBuilding()
  // arcade-game
  const { mutateGeyMyArcGame } = useGetMyArcGame()
  // naka-punk
  const { mutateGetMyNakaPunk } = useGetMyNakaPunk()
  // avatar
  const { mutateGetMyAvatarReef } = useMutateAvatarReef()

  const [inventoryItemList, setInventoryItemList] = useState<
    Array<IInventoryItemList>
  >([])

  const { getValueFromTKey, convertTTypeToNFTType } = Helper
  const _marketType =
    marketType ||
    convertTTypeToNFTType(router.query.type as TType) ||
    "nft_land"

  const fetchAllLandofAddress = useCallback(async () => {
    if (!isFetchAllLand && profile.data) {
      const allLandResponse = await getLandsOfAddress(
        CONFIGS.CONTRACT_ADDRESS.LAND_NFT,
        profile.data.address
      )
      const cvLandList: string[] = allLandResponse.map((item) =>
        item.toString()
      )
      if (cvLandList && allLandResponse) {
        setIsFetchAllLand(true)
        setAllLandofAddrsData(cvLandList)
      }
      return cvLandList
    }
    return allLandofAddrsData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchInventoryNFTItem = useCallback(async () => {
    let _data: IInventoryItemList[] = []
    let _total = 0
    setIsLoading(true)
    if (
      profile.data &&
      filterType &&
      search &&
      sort &&
      _marketType &&
      _marketType !== "game_item" &&
      _marketType !== "nft_material"
    ) {
      switch (_marketType) {
        case "nft_building":
          await mutateGetOwnerBuilding({
            _urlNFT: "NFT-Building",
            _limit: limit,
            _page: currentPage,
            _search: {
              isRent: false,
              player_id: profile.data.id,
              type_building:
                filterType.nft_building.length > 0
                  ? filterType.nft_building
                  : undefined,
              nft_token:
                search.length > 0
                  ? (getValueFromTKey(search, "nft_token") as string)
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
                  img: b.image,
                  vdo: b.NFT_video,
                  model: b.model_3d,
                  level: b.level,
                  percentage:
                    b.deteriorate_building?.rate_deteriorate.percentage
                }))
                _total = _res.info.totalCount
              }
            })
            .catch(() => {})
          break
        case "nft_game":
          await mutateGeyMyArcGame({
            _urlNFT: "NFT-As-Game",
            _limit: limit,
            _page: currentPage,
            _search: {
              nft_token:
                search.length > 0
                  ? (getValueFromTKey(search, "nft_token") as string)
                  : undefined
            }
          })
            .then((_res) => {
              if (_res.data && _res.data.length > 0) {
                _data = _res.data.map((g) => ({
                  id: g._id,
                  tokenId: g.NFT_info.NFT_token,
                  cardType: "arcade-game",
                  name: g.name,
                  img: `https://ipfs.io/ipfs/${g.NFT_info.image_game_ipfs_cid}`,
                  vdo: `https://ipfs.io/ipfs/${g.NFT_info.vdo_game_ipfs_cid}?stream=true`,
                  model: g.animation_nft_arcade_game
                }))
                _total = _res.info.totalCount
              }
            })
            .catch(() => {})
          break
        case "nft_naka_punk": {
          await mutateGetMyNakaPunk({
            _urlNFT: "NFT-NakaPunk",
            _limit: limit,
            _active: true,
            _page: currentPage,
            _search: {
              nft_token:
                search.length > 0
                  ? (getValueFromTKey(search, "nft_token") as string)
                  : undefined
            }
          })
            .then((_res) => {
              if (_res.data && _res.data.length > 0) {
                _data = _res.data.map((p) => ({
                  id: p._id,
                  tokenId: p.NFT_token,
                  cardType: "naka-punk",
                  name: p.name,
                  img: p.image
                }))
                _total = _res.info.totalCount
              }
            })
            .catch(() => {})
          break
        }
        case "nft_avatar":
          await mutateGetMyAvatarReef({
            _urlNFT: "NFT-Avatar",
            _limit: limit,
            _active: true,
            _page: currentPage,
            _search: {
              nft_token:
                search.length > 0
                  ? (getValueFromTKey(search, "nft_token") as string)
                  : undefined
            }
          })
            .then((_res) => {
              if (_res.data.length > 0) {
                _data = _res.data.map((a) => ({
                  id: a.id,
                  tokenId: a.NFT_token,
                  cardType: "avatar-reef",
                  name: a.name,
                  img: a.image
                }))
                _total = _res.info.totalCount
              }
            })
            .catch(() => {})
          break
        default: {
          await mutateGetMyLand({
            _urlNFT: "NFT-Land",
            _limit: limit,
            _page: currentPage,
            _search: {
              isRent: false,
              player_id: profile.data.id,
              type: "nft_land",
              type_land:
                filterType.nft_land.length > 0
                  ? filterType.nft_land
                  : undefined,
              nft_token:
                search.length > 0
                  ? (getValueFromTKey(search, "nft_token") as string) // should be nft_token same, discuss with BE team!
                  : undefined
            },
            _landList: await fetchAllLandofAddress()
          })
            .then((_res) => {
              if (_res.data && _res.data.length > 0) {
                _data = _res.data.map((l) => ({
                  id: l._id,
                  tokenId: l.land_id,
                  cardType: "land",
                  name: l.name,
                  img: l.NFT_image,
                  vdo: l.NFT_video
                }))
                _total = _res.info.totalCount
              }
            })
            .catch(() => {})
          break
        }
      }
    }
    setInventoryItemList(_data)
    setTotalCount(_total)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.data, _marketType, currentPage, limit, filterType, search, sort])

  const fetchInventoryItem = useCallback(async () => {
    if (
      profile.data &&
      _marketType &&
      filterType &&
      gameItemList &&
      materialList &&
      (_marketType === "game_item" || _marketType === "nft_material")
    ) {
      setItemIsLoading(true)
      let _data: IInventoryItemList[] = []
      let _total = 0
      switch (_marketType) {
        case "game_item":
          if (gameItemList && gameItemList.length > 0) {
            let _dummy = gameItemList
            if (filterType.game_item && filterType.game_item.length > 0) {
              _dummy = _dummy.filter(
                (d) => d._id === filterType.game_item.find((f) => f === d._id)
              )
            }
            _data = _dummy.map((gi) => ({
              id: gi._id,
              tokenId: gi.item_id_smartcontract.toString(),
              cardType: "game-item",
              name: `${gi.name} ${gi.item_size}`,
              img: gi.image,
              amount: gi.amount || 0,
              size: gi.item_size
            }))
            _total = _data.length
          }
          break
        case "nft_material":
          if (materialList && materialList.length > 0) {
            let _dummy = materialList
            if (filterType.nft_material && filterType.nft_material.length > 0) {
              _dummy = _dummy.filter(
                (d) =>
                  d.name_type ===
                  filterType.nft_material.find((f) => f === d.name_type)
              )
            }
            _data = _dummy.map((m) => ({
              id: m.id,
              tokenId: m.material_id_smartcontract.toString(),
              cardType: "material",
              name: m.name,
              img: m.image,
              amount: m.amount || 0
            }))
            _total = _data.length
          }
          break
        default:
          break
      }
      setInventoryItemList(
        _data.splice((currentPage - 1) * limit, currentPage * limit)
      )
      setTotalCount(_total)
      setItemIsLoading(false)
    }
    ref.current = true
  }, [
    profile.data,
    _marketType,
    filterType,
    gameItemList,
    materialList,
    currentPage,
    limit
  ])

  useEffect(() => {
    let cleanup = false
    if (!cleanup) {
      fetchInventoryNFTItem()
    }
    return () => {
      cleanup = true
    }
  }, [fetchInventoryNFTItem])

  useEffect(() => {
    let cleanup = false
    if (!cleanup) {
      fetchInventoryItem()
    }
    return () => {
      cleanup = true
    }
  }, [fetchInventoryItem])

  useMemo(() => {
    let cleanup = false
    if (!cleanup && _marketType) {
      setCurrentPage(1)
    }
    return () => {
      cleanup = true
      ref.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_marketType])

  return {
    inventoryItemList,
    isLoading,
    isItemLoading,
    limit,
    currentPage,
    totalCount,
    setLimit,
    setCurrentPage
  }
}

export default useInventoryOwner
