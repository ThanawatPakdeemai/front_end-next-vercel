/* eslint-disable react-hooks/exhaustive-deps */
import { useGetMyForSaleBuilding } from "@feature/building/containers/hooks/useGetMyBuilding"
import { useGetForSaleArcGame } from "@feature/game/marketplace/containers/hooks/useGetMyArcGame"
import { IInventoryItemList } from "@feature/inventory/interfaces/IInventoryItem"
import { useGetMyForSaleLand } from "@feature/land/containers/hooks/useGetMyLand"
import useGetMarketOrder from "@feature/marketplace/hooks/getMarketOrder"
import {
  TSellingType,
  TType
} from "@feature/marketplace/interfaces/IMarketService"
import { useGetMyForSaleNakaPunk } from "@feature/nakapunk/containers/hooks/useGetMyNakapunk"
import useGlobal from "@hooks/useGlobal"
import useMarketFilterStore from "@stores/marketFilter"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { NextRouter, useRouter } from "next/router"
import { useCallback, useEffect, useMemo, useState } from "react"

const useInventoryForSale = () => {
  // state
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isItemLoading, setItemIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [limit, setLimit] = useState<number>(16)
  const [inventoryItemForsale, setInventoryItemForsale] = useState<
    Array<IInventoryItemList>
  >([])

  // hook
  const { marketType } = useGlobal()
  const { profile } = useProfileStore()
  const { mutateGetMyForSaleLand } = useGetMyForSaleLand()
  const { mutateGetMyForSaleBuilding } = useGetMyForSaleBuilding()
  const { mutateGetMyForsaleNakaPunk } = useGetMyForSaleNakaPunk()
  const { mutateGetForsaleArcGame } = useGetForSaleArcGame()
  const { getMarketOrderAsnyc } = useGetMarketOrder()
  const { convertNFTTypeToUrl, getValueFromTKey, convertTTypeToNFTType } =
    Helper
  const { sort, search, filterType } = useMarketFilterStore()
  const router: NextRouter = useRouter()
  const _marketType =
    marketType ||
    convertTTypeToNFTType(router.query.type as TType) ||
    "nft_land"

  const fetchMyNFTForsale = useCallback(async () => {
    let _data: IInventoryItemList[] = []
    let _total: number = 0
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
        case "nft_land":
          await mutateGetMyForSaleLand({
            _limit: limit,
            _page: currentPage,
            _search: {
              seller_type: "user",
              type_land:
                filterType.nft_land.length > 0
                  ? filterType.nft_land
                  : undefined,
              selling_type:
                search.length > 0
                  ? (getValueFromTKey(search, "selling_type") as TSellingType)
                  : undefined,
              nft_token:
                search.length > 0
                  ? (getValueFromTKey(search, "nft_token") as string) // should be same as same nft_token
                  : undefined
            }
          })
            .then((_res) => {
              if (_res.data && _res.data.length > 0) {
                _data = _res.data.map((l) => ({
                  id: l.marketplaces_data?._id || l._id,
                  tokenId: l.land_id,
                  cardType: "land",
                  name: l.name,
                  img: l.NFT_image,
                  vdo: l.NFT_video,
                  price: l.marketplaces_data ? l.marketplaces_data.price : 0,
                  selling: l.marketplaces_data
                    ? l.marketplaces_data.selling_type
                    : "fullpayment"
                }))
                _total = _res.info.totalCount
              }
            })
            .catch(() => {})
          break
        case "nft_building":
          await mutateGetMyForSaleBuilding({
            _limit: limit,
            _page: currentPage,
            _search: {
              seller_type: "user",
              type_building:
                filterType.nft_building.length > 0
                  ? filterType.nft_building
                  : undefined,
              selling_type:
                search.length > 0
                  ? (getValueFromTKey(search, "selling_type") as TSellingType)
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
                  id: b.marketplaces_data?._id || b._id,
                  tokenId: b.NFT_token || "",
                  cardType: "building",
                  name: b.name,
                  img: b.NFT_image,
                  vdo: b.NFT_video,
                  level: b.level,
                  percentage:
                    b.deteriorate_building?.rate_deteriorate.percentage || 0,
                  price: b.marketplaces_data ? b.marketplaces_data.price : 0,
                  selling: b.marketplaces_data
                    ? b.marketplaces_data.selling_type
                    : "fullpayment"
                }))
                _total = _res.info.totalCount
              }
            })
            .catch(() => {})
          break
        case "nft_game":
          await mutateGetForsaleArcGame({
            _limit: limit,
            _search: {
              seller_type: "user",
              nft_token:
                search.length > 0
                  ? (getValueFromTKey(search, "nft_token") as string)
                  : undefined
              // selling_type
            },
            _page: currentPage,
            _sort: {
              _id: -1
            }
          })
            .then((_res) => {
              if (_res.data && _res.data.length > 0) {
                _data = _res.data.map((g) => ({
                  id: g.marketplaces_data?._id || g._id,
                  tokenId: g.NFT_info.NFT_token,
                  cardType: "arcade-game",
                  name: g.name,
                  img: `https://ipfs.io/ipfs/${g.NFT_info.image_game_ipfs_cid}`,
                  vdo: `https://ipfs.io/ipfs/${g.NFT_info.vdo_game_ipfs_cid}?stream=true`,
                  price: g.marketplaces_data ? g.marketplaces_data.price : 0,
                  selling: g.marketplaces_data
                    ? g.marketplaces_data.selling_type
                    : "fullpayment"
                }))
                _total = _res.info.totalCount
              }
            })
            .catch(() => {})
          break
        case "nft_naka_punk":
          await mutateGetMyForsaleNakaPunk({
            _active: true,
            _limit: limit,
            _page: currentPage,
            _search: {
              seller_type: "user",
              nft_token:
                search.length > 0
                  ? (getValueFromTKey(search, "nft_token") as string)
                  : undefined
            }
          })
            .then((_res) => {
              if (_res.data && _res.data.length > 0) {
                _data = _res.data.map((p) => ({
                  id: p.marketplaces_data?._id || p._id,
                  tokenId: p.NFT_token,
                  cardType: "naka-punk",
                  name: p.name,
                  img: p.image,
                  price: p.marketplaces_data ? p.marketplaces_data.price : 0,
                  selling: p.marketplaces_data
                    ? p.marketplaces_data.selling_type
                    : "fullpayment"
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
    setInventoryItemForsale(_data)
    setTotalCount(_total)
    setIsLoading(false)
  }, [profile.data, _marketType, limit, currentPage, filterType, search, sort])

  const fetchMyItemForsale = useCallback(async () => {
    let _data: IInventoryItemList[] = []
    let _total: number = 0
    setItemIsLoading(true)
    if (
      profile &&
      profile.data &&
      _marketType &&
      filterType &&
      search &&
      sort &&
      (_marketType === "game_item" || _marketType === "nft_material")
    ) {
      switch (_marketType) {
        case "game_item": {
          await getMarketOrderAsnyc({
            _urlNFT: convertNFTTypeToUrl(_marketType),
            _limit: limit,
            _page: currentPage,
            _sort: {},
            _search: {
              seller_id: profile.data.address,
              seller_type: "user",
              item_id:
                filterType.game_item.length > 0
                  ? filterType.game_item
                  : undefined
            }
          })
            .then((_res) => {
              if (_res.data && _res.data.length > 0) {
                _data = _res.data.map((gi) => ({
                  id: gi._id,
                  tokenId: gi.item_data?.item_id_smartcontract.toString() || "",
                  cardType: "game-item",
                  name:
                    `${gi.item_data?.name} ${gi.item_data?.item_size}` || "",
                  img: gi.item_data?.image || "",
                  amount: gi.item_amount,
                  size: gi.item_data?.item_size || "1$",
                  price: gi.price
                }))
                _total = _res.info.totalCount
              }
            })
            .catch(() => {})
          break
        }
        case "nft_material":
          await getMarketOrderAsnyc({
            _urlNFT: convertNFTTypeToUrl(_marketType),
            _limit: limit,
            _page: currentPage,
            _sort: {},
            _search: {
              seller_id: profile.data.address,
              seller_type: "user",
              type_material:
                filterType.nft_material.length > 0
                  ? filterType.nft_material
                  : undefined
            }
          })
            .then((_res) => {
              if (_res.data && _res.data.length > 0) {
                _data = _res.data.map((m) => ({
                  id: m._id,
                  tokenId:
                    m.material_data?.material_id_smartcontract.toString() || "",
                  cardType: "material",
                  name: m.material_data?.name || "",
                  img: m.material_data?.image || "",
                  amount: m.item_amount,
                  price: m.price
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
    setInventoryItemForsale(_data)
    setTotalCount(_total)
    setItemIsLoading(false)
  }, [profile.data, _marketType, limit, currentPage, filterType, search, sort])

  useEffect(() => {
    let load = false
    if (!load) {
      fetchMyNFTForsale()
    }
    return () => {
      load = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMyNFTForsale])

  useEffect(() => {
    let load = false
    if (!load) {
      fetchMyItemForsale()
    }
    return () => {
      load = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMyItemForsale])

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
    inventoryItemForsale,
    isLoading,
    isItemLoading,
    totalCount,
    currentPage,
    limit,
    setLimit,
    setCurrentPage
  }
}

export default useInventoryForSale
