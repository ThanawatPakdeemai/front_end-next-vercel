import useMutateAvatarReef from "@feature/avatarReef/containers/hook/useMutateAvatarReef"
import { useGetBuildingById } from "@feature/building/containers/hooks/useGetMyBuilding"
import { useGetMyArcGameById } from "@feature/game/marketplace/containers/hooks/useGetMyArcGame"
import useInvenGameItem from "@feature/gameItem/inventory/containers/hooks/useInvenGameItem"
import { useGetLandById } from "@feature/land/containers/hooks/useGetMyLand"
import { IPosition } from "@feature/land/interfaces/ILandService"
import useMutateMarketplace from "@feature/marketplace/containers/hooks/useMutateMarketplace"
import {
  IInstallData,
  IMarketData,
  IMarketHistory,
  IRentalData,
  TNFTType
} from "@feature/marketplace/interfaces/IMarketService"
import useInvenMaterial from "@feature/material/inventory/containers/hooks/useInvenMaterial"
import { useGetNakPunkById } from "@feature/nakapunk/containers/hooks/useGetMyNakapunk"
import useGlobal from "@hooks/useGlobal"
import useMarketCategTypes from "@stores/marketCategTypes"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { NextRouter, useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"

interface IInventoryItemData {
  id: string
  name: string
  tokenId: string
  type: TNFTType
  img: string
  vdo?: string
  model?: string
  level?: number
  detail: string
  totalAmount?: number
  qrCode?: string
  position?: IPosition
  history?: IMarketHistory[]
  marketplaces_data?: IMarketData | null
  installments_data?: IInstallData | null
  rentals_data?: IRentalData | null
  wallet_address?: string
}

const useInventoryContext = () => {
  const { profile } = useProfileStore()
  const router: NextRouter = useRouter()
  const id = router.query.id as string
  const [invenItemData, setInvenItemData] = useState<
    IInventoryItemData | undefined
  >(undefined)
  const [invPrice, setInvPrice] = useState<number>(0)
  const [invPeriod, setInvPeriod] = useState<number>(0)
  const [invAmount, setInvAmount] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  // const [transAddrs, setTransAddrs] = useState<string | undefined>(undefined)
  const { marketType } = useGlobal()
  // move this to context? for solve multi call api and data need to update
  const { gameItemList, getGameItemByToken } = useInvenGameItem()
  const { materialList, onTransferMaterial, getMaterialByToken } =
    useInvenMaterial()
  const { gameItemTypes, materialTypes } = useMarketCategTypes()
  const { mutateGetLandById } = useGetLandById()
  const { mutateGetBuildingById } = useGetBuildingById()
  const { mutateGetNakapunkById } = useGetNakPunkById()
  const { mutateGetMyArcGameById } = useGetMyArcGameById()
  const { mutateGetNFTAvatarById } = useMutateAvatarReef()
  const { mutateMarketOrderById } = useMutateMarketplace()
  const { convertNFTTypeToUrl } = Helper

  const updateInvenNFTMarketData = useCallback(
    (_update: IMarketData | undefined, _type?: TNFTType, _amount?: number) => {
      if (invenItemData) {
        let _dummy = invenItemData
        if (_type && _type !== "game_item" && _type !== "nft_material") {
          _dummy = { ...invenItemData, marketplaces_data: _update }
        } else if (_type && _amount && invenItemData.totalAmount) {
          const _total = invenItemData.totalAmount - _amount
          _dummy = {
            ...invenItemData,
            totalAmount: _total,
            marketplaces_data: undefined
          }
        }
        setInvenItemData(_dummy)
        if (!_update) {
          setInvPrice(0)
          setInvPeriod(0)
          setInvAmount(1)
        }
      }
    },
    [invenItemData]
  )

  const fetchInvenNFTItemDataById = useCallback(async () => {
    setIsLoading(true)
    if (
      id &&
      marketType &&
      profile.data &&
      marketType !== "game_item" &&
      marketType !== "nft_material"
    ) {
      let _data: IInventoryItemData = {
        id: "",
        name: "string",
        tokenId: "string",
        type: marketType || "nft_land",
        img: "",
        detail: "-"
      }
      switch (marketType) {
        case "nft_land":
          await mutateGetLandById({ _id: id }).then((_res) => {
            _data = {
              id: _res._id,
              name: _res.name,
              tokenId: _res.NFT_token,
              type: marketType,
              img: _res.NFT_image,
              vdo: _res.NFT_video,
              detail: _res.details,
              qrCode: _res.qrcode_image,
              position: _res.position,
              history: _res.history,
              marketplaces_data: _res.marketplaces_data,
              installments_data: _res.installments_data,
              rentals_data: _res.rentals_data,
              wallet_address: _res.wallet_address
            }
          })
          break
        case "nft_building":
          await mutateGetBuildingById({ _id: id }).then((_res) => {
            _data = {
              id: _res._id,
              name: _res.name,
              tokenId: _res.NFT_token || _res._id,
              type: marketType,
              img: _res.NFT_image,
              vdo: _res.NFT_video,
              model: _res.model_3d,
              level: _res.level,
              detail: _res.detail,
              history: _res.history,
              marketplaces_data: _res.marketplaces_data,
              installments_data: _res.installments_data,
              rentals_data: _res.rentals_data,
              wallet_address: _res.wallet_address
            }
          })
          break
        case "nft_game":
          await mutateGetMyArcGameById({ _id: id }).then((_res) => {
            _data = {
              id: _res.data._id,
              name: _res.data.name,
              tokenId: _res.data.NFT_info.NFT_token,
              type: marketType,
              img: `https://ipfs.io/ipfs/${_res.data.NFT_info.image_game_ipfs_cid}`,
              vdo: `https://ipfs.io/ipfs/${_res.data.NFT_info.vdo_game_ipfs_cid}?stream=true`,
              model: _res.data.animation_nft_arcade_game,
              detail: _res.data.story,
              history: _res.data.history,
              marketplaces_data: _res.data.marketplaces_data,
              installments_data: _res.data.installments_data
            }
          })
          break
        case "nft_naka_punk":
          await mutateGetNakapunkById({ _id: id }).then((_res) => {
            _data = {
              id: _res._id,
              name: _res.name,
              tokenId: _res.NFT_token,
              type: marketType,
              img: _res.image,
              detail: _res.description,
              history: _res.history,
              marketplaces_data: _res.marketplaces_data,
              wallet_address: _res.wallet_adddress
            }
          })
          break
        case "nft_avatar":
          await mutateGetNFTAvatarById({ _id: id }).then((_res) => {
            _data = {
              id: _res._id,
              name: _res.name,
              tokenId: _res.NFT_token,
              type: marketType,
              img: _res.image,
              detail: _res.description,
              history: _res.history
            }
          })
          break
        default:
          break
      }
      setInvenItemData(_data)
    }
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, marketType, profile.data])

  const fetchInvenItemDataById = useCallback(async () => {
    setIsLoading(true)
    if (
      id &&
      profile.data &&
      profile.data.address &&
      gameItemTypes &&
      materialTypes &&
      marketType &&
      (marketType === "game_item" || marketType === "nft_material")
    ) {
      let _data: IInventoryItemData = {
        id: "",
        name: "string",
        tokenId: "string",
        type: marketType || "nft_land",
        img: "",
        detail: "-"
      }
      switch (marketType) {
        case "game_item": {
          if (gameItemTypes) {
            const _gameItem = gameItemTypes.find((gi) => gi._id === id)
            if (_gameItem) {
              await getGameItemByToken(
                profile.data.address,
                _gameItem.item_id_smartcontract.toString()
              ).then((_res) => {
                _data = {
                  id: _gameItem._id,
                  name: _gameItem.name,
                  tokenId: _gameItem.item_id_smartcontract.toString(),
                  type: marketType,
                  img: _gameItem.image,
                  detail: _gameItem.detail,
                  totalAmount: Number(_res.toString())
                }
              })
            } else {
              await mutateMarketOrderById({
                _id: id,
                _urlNFT: convertNFTTypeToUrl(marketType)
              }).then((response) => {
                if (response.data && response.data.item_data) {
                  _data = {
                    id: response.data._id,
                    name: response.data.item_data.name,
                    tokenId:
                      response.data.item_data.item_id_smartcontract.toString(),
                    type: marketType,
                    img: response.data.item_data.image,
                    detail: response.data.item_data.detail,
                    totalAmount: response.data.item_amount,
                    marketplaces_data: {
                      item_amount: response.data.item_amount,
                      order_id: response.data.order_id,
                      seller_id: response.data.seller_id,
                      seller_type: response.data.seller_type,
                      selling_type: response.data.selling_type,
                      item_total: response.data.item_total,
                      is_active: response.data.is_active,
                      type: response.data.type,
                      item_id: response.data.item_id,
                      _id: response.data._id,
                      price: response.data.price,
                      real_land: false,
                      buyer_details: [],
                      updated_at: response.data.created_at,
                      current_time: response.data.created_at,
                      created_at: response.data.created_at
                    }
                  }
                }
              })
            }
          }
          break
        }
        case "nft_material": {
          if (materialTypes) {
            const _materialItem = materialTypes.find((m) => m.id === id)
            if (_materialItem) {
              await getMaterialByToken(
                profile.data.address,
                _materialItem.material_id_smartcontract.toString()
              ).then((_res) => {
                _data = {
                  id: _materialItem.id,
                  name: _materialItem.name,
                  tokenId: _materialItem.material_id_smartcontract.toString(),
                  type: marketType,
                  img: _materialItem.image,
                  detail: _materialItem.detail,
                  totalAmount: Number(_res.toString()),
                  wallet_address: profile.data?.address
                }
              })
            } else {
              await mutateMarketOrderById({
                _id: id,
                _urlNFT: convertNFTTypeToUrl(marketType)
              }).then((response) => {
                if (response.data && response.data.material_data) {
                  _data = {
                    id: response.data._id,
                    name: response.data.material_data.name,
                    tokenId:
                      response.data.material_data.material_id_smartcontract.toString(),
                    type: marketType,
                    img: response.data.material_data.image,
                    detail: response.data.material_data.detail,
                    totalAmount: response.data.item_amount,
                    marketplaces_data: {
                      item_amount: response.data.item_amount,
                      order_id: response.data.order_id,
                      seller_id: response.data.seller_id,
                      seller_type: response.data.seller_type,
                      selling_type: response.data.selling_type,
                      item_total: response.data.item_total,
                      is_active: response.data.is_active,
                      type: response.data.type,
                      item_id: response.data.item_id,
                      _id: response.data._id,
                      price: response.data.price,
                      real_land: false,
                      buyer_details: [],
                      updated_at: response.data.created_at,
                      current_time: response.data.created_at,
                      created_at: response.data.created_at
                    }
                  }
                }
              })
            }
          }
          break
        }
        default:
          break
      }
      setInvenItemData(_data)
    }
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, profile.data, materialTypes, marketType, gameItemTypes])

  useEffect(() => {
    let cleanup = false
    if (!cleanup) {
      fetchInvenNFTItemDataById()
    }
    return () => {
      cleanup = true
    }
  }, [fetchInvenNFTItemDataById])

  useEffect(() => {
    let cleanup = false
    if (!cleanup) {
      fetchInvenItemDataById()
    }
    return () => {
      cleanup = true
    }
  }, [fetchInvenItemDataById])

  return {
    isLoading,
    invenItemData,
    fetchInvenItemDataById,
    invPrice,
    invPeriod,
    invAmount,
    setInvPrice,
    setInvPeriod,
    setInvAmount,
    gameItemList,
    materialList,
    onTransferMaterial,
    updateInvenNFTMarketData
  }
}

export default useInventoryContext
