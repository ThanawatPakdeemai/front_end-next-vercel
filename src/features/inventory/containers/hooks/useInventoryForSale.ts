/* eslint-disable react-hooks/exhaustive-deps */
import { useGetMyForSaleBuilding } from "@feature/building/containers/hooks/useGetMyBuilding"
import { useGetForSaleArcGame } from "@feature/game/marketplace/containers/hooks/useGetMyArcGame"
import { IInventoryItemList } from "@feature/inventory/interfaces/IInventoryItem"
import { useGetMyForSaleLand } from "@feature/land/containers/hooks/useGetMyLand"
import useGetMarketOrder from "@feature/marketplace/hooks/getMarketOrder"
import { IMarketServForm } from "@feature/marketplace/interfaces/IMarketService"
import { useGetMyForSaleNakaPunk } from "@feature/nakapunk/containers/hooks/useGetMyNakapunk"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { useCallback, useEffect, useMemo, useState } from "react"

const useInventoryForSale = () => {
  // state
  const [isLoading, setIsLoading] = useState<boolean>(true)
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
  const { convertNFTTypeToUrl } = Helper

  const fetchMyForsale = useCallback(async () => {
    let _data: IInventoryItemList[] = []
    let _total: number = 0
    setIsLoading(true)
    if (profile && profile.data && marketType) {
      const initPayload: IMarketServForm = {
        _limit: limit,
        _page: currentPage,
        _search: {
          player_id: profile.data.id,
          seller_type: "user",
          type: marketType
        }
      }
      const infoPayload: IMarketServForm = {
        _urlNFT: convertNFTTypeToUrl(marketType),
        _limit: limit,
        _page: currentPage,
        _sort: {},
        _search: {
          seller_id: profile.data.address,
          seller_type: "user",
          type: marketType,
          type_marketplace: marketType
        }
      }
      switch (marketType) {
        case "game_item": {
          await getMarketOrderAsnyc(infoPayload).then((_res) => {
            if (_res.data && _res.data.length > 0) {
              _data = _res.data.map((gi) => ({
                id: gi._id,
                tokenId: gi.item_data?.item_id_smartcontract.toString() || "",
                cardType: "game-item",
                name: `${gi.item_data?.name} ${gi.item_data?.item_size}` || "",
                img: gi.item_data?.image || "",
                amount: gi.item_amount,
                size: gi.item_data?.item_size || "1$",
                price: gi.price
              }))
              _total = _res.info.totalCount
            }
          })
          break
        }
        case "nft_material":
          await getMarketOrderAsnyc(infoPayload).then((_res) => {
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
          break
        case "nft_land":
          await mutateGetMyForSaleLand(initPayload).then((_res) => {
            if (_res.data && _res.data.length > 0) {
              _data = _res.data.map((l) => ({
                id: l._id,
                tokenId: l.land_id,
                cardType: "land",
                name: l.name,
                img: l.NFT_image,
                vdo: l.NFT_video,
                price: l.marketplaces_data ? l.marketplaces_data[0].price : 0,
                selling: l.marketplaces_data
                  ? l.marketplaces_data[0].selling_type
                  : "fullpayment"
              }))
              _total = _res.info.totalCount
            }
          })
          break
        case "nft_building":
          await mutateGetMyForSaleBuilding(initPayload).then((_res) => {
            if (_res.data && _res.data.length > 0) {
              _data = _res.data.map((b) => ({
                id: b._id,
                tokenId: b.NFT_token || "",
                cardType: "building",
                name: b.name,
                img: b.NFT_image,
                vdo: b.NFT_video,
                level: b.level,
                percentage:
                  b.deteriorate_building?.rate_deteriorate.percentage || 0,
                price: b.marketplaces_data ? b.marketplaces_data[0].price : 0,
                selling: b.marketplaces_data
                  ? b.marketplaces_data[0].selling_type
                  : "fullpayment"
              }))
              _total = _res.info.totalCount
            }
          })
          break
        case "nft_game":
          await mutateGetForsaleArcGame({
            _limit: limit,
            _search: {},
            _page: currentPage,
            _sort: {
              _id: -1
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
                price: g.marketplaces_data ? g.marketplaces_data[0].price : 0,
                selling: g.marketplaces_data
                  ? g.marketplaces_data[0].selling_type
                  : "fullpayment"
              }))
              _total = _res.info.totalCount
            }
          })
          break
        case "nft_naka_punk":
          await mutateGetMyForsaleNakaPunk({
            _active: true,
            ...initPayload
          }).then((_res) => {
            if (_res.data && _res.data.length > 0) {
              _data = _res.data.map((p) => ({
                id: p._id,
                tokenId: p.NFT_token,
                cardType: "naka-punk",
                name: p.name,
                img: p.image,
                price: p.marketplaces_data ? p.marketplaces_data[0].price : 0,
                selling: p.marketplaces_data
                  ? p.marketplaces_data[0].selling_type
                  : "fullpayment"
              }))
              _total = _res.info.totalCount
            }
          })
          break
        default:
          break
      }
    }
    setInventoryItemForsale(_data)
    setTotalCount(_total)
    setIsLoading(false)
  }, [profile.data, marketType, limit, currentPage])

  useEffect(() => {
    let load = false
    if (!load) {
      fetchMyForsale()
    }
    return () => {
      load = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMyForsale])

  useEffect(() => {
    let cleanup = false
    if (!cleanup) {
      setIsLoading(true)
    }
    return () => {
      cleanup = true
    }
  }, [fetchMyForsale])

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
    inventoryItemForsale,
    isLoading,
    totalCount,
    currentPage,
    limit,
    setLimit,
    setCurrentPage
  }
}

export default useInventoryForSale
