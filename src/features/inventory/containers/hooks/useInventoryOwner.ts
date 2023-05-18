import { useInventoryProvider } from "@providers/InventoryProvider"
import { useCallback, useEffect, useMemo, useState } from "react"
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

const useInventoryOwner = () => {
  const { profile } = useProfileStore()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [limit, setLimit] = useState<number>(6)
  const { marketType } = useGlobal()
  // const { sort, search, filter } = useMarketFilterStore()
  // game-item
  // material
  const { gameItemList, materialList } = useInventoryProvider()
  // land
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

  const fetchInventoryNFTItem = useCallback(async () => {
    let _data: IInventoryItemList[] = []
    let _total = 0
    setIsLoading(true)
    if (
      profile.data &&
      marketType &&
      marketType !== "game_item" &&
      marketType !== "nft_material"
    ) {
      switch (marketType) {
        case "nft_land": {
          const allLandResponse = await getLandsOfAddress(
            CONFIGS.CONTRACT_ADDRESS.LAND_NFT,
            profile.data.address
          )
          const cvLandList: string[] = allLandResponse.map((item) =>
            item.toString()
          )
          await mutateGetMyLand({
            _urlNFT: "NFT-Land",
            _limit: limit,
            _page: currentPage,
            _search: {
              isRent: false,
              player_id: profile.data.id,
              type: "nft_land"
              // type_land: filter.length > 0 ? filter : undefined
            },
            _landList: cvLandList
          }).then((_res) => {
            if (_res.data.length > 0) {
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
          break
        }
        case "nft_building":
          await mutateGetOwnerBuilding({
            _urlNFT: "NFT-Building",
            _limit: limit,
            _page: currentPage,
            _search: {
              isRent: false,
              player_id: profile.data.id
            }
          }).then((_res) => {
            if (_res.data.length > 0) {
              _data = _res.data.map((b) => ({
                id: b._id,
                tokenId: b.NFT_token || "",
                cardType: "building",
                name: b.name,
                img: b.image,
                vdo: b.NFT_video,
                model: b.model_3d,
                level: b.level,
                percentage: b.deteriorate_building?.rate_deteriorate.percentage
              }))
              _total = _res.info.totalCount
            }
          })
          break
        case "nft_game":
          await mutateGeyMyArcGame({
            _urlNFT: "NFT-As-Game",
            _limit: limit,
            _page: currentPage,
            _search: {}
          }).then((_res) => {
            if (_res.data.length > 0) {
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
          break
        case "nft_naka_punk": {
          await mutateGetMyNakaPunk({
            _urlNFT: "NFT-NakaPunk",
            _limit: limit,
            _active: true,
            _page: currentPage,
            _search: {
              type_marketplace: "nft_naka_punk"
            }
          }).then((_res) => {
            if (_res.data.length > 0) {
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
          break
        }
        case "nft_avatar":
          await mutateGetMyAvatarReef({
            _urlNFT: "NFT-Avatar",
            _limit: limit,
            _active: true,
            _page: currentPage,
            _search: {
              type_marketplace: "nft_avatar"
            }
          }).then((_res) => {
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
          break
        default:
          break
      }
    }
    setInventoryItemList(_data)
    setTotalCount(_total)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.data, marketType, currentPage, limit])

  const fetchInventoryItem = useCallback(async () => {
    let _data: IInventoryItemList[] = []
    let _total = 0
    if (
      profile.data &&
      marketType &&
      (marketType === "game_item" || marketType === "nft_material")
    ) {
      switch (marketType) {
        case "game_item":
          if (gameItemList && gameItemList.length > 0) {
            _data = gameItemList.map((gi) => ({
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
            _data = materialList.map((m) => ({
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
    }
    setInventoryItemList(
      _data.splice((currentPage - 1) * limit, currentPage * limit)
    )
    setTotalCount(_total)
    setIsLoading(false)
  }, [profile.data, marketType, limit, currentPage, gameItemList, materialList])

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

  useEffect(() => {
    let cleanup = false
    if (!cleanup) {
      setIsLoading(true)
    }
    return () => {
      cleanup = true
    }
  }, [fetchInventoryNFTItem, fetchInventoryItem])

  useMemo(() => {
    let cleanup = false
    if (!cleanup && marketType) {
      setCurrentPage(1)
    }
    return () => {
      cleanup = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketType])

  return {
    inventoryItemList,
    isLoading,
    limit,
    currentPage,
    totalCount,
    setLimit,
    setCurrentPage
  }
}

export default useInventoryOwner
