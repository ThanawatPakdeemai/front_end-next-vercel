import { useGetBuildingById } from "@feature/building/containers/hooks/useGetMyBuilding"
import useInvenGameItem from "@feature/gameItem/inventory/containers/hooks/useInvenGameItem"
import { useGetLandById } from "@feature/land/containers/hooks/useGetMyLand"
import { IOwnerDetailsData } from "@feature/marketplace/interfaces/IMarketService"
import useInvenMaterial from "@feature/material/inventory/containers/hooks/useInvenMaterial"
import { useGetNakPunkById } from "@feature/nakapunk/containers/hooks/useGetMyNakapunk"
import useGlobal from "@hooks/useGlobal"
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef, useState } from "react"

const useMarketOwnerDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [ownerDetail, setOwnerDetail] = useState<IOwnerDetailsData>()

  const loadRef = useRef(false)
  const { marketType } = useGlobal()
  const { mutateGetLandById } = useGetLandById()
  const { mutateGetBuildingById } = useGetBuildingById()
  const { mutateGetNakapunkById } = useGetNakPunkById()
  const { gameItemList } = useInvenGameItem()
  const { materialList } = useInvenMaterial()

  const router = useRouter()
  const id = router.query.id as string

  const fetchOwnerDetail = () => {
    setOwnerDetail(undefined)
    setIsLoading(false)
    switch (marketType) {
      case "nft_land":
        mutateGetLandById({ _id: id })
          .then((_res) => {
            setOwnerDetail({
              type: "land",
              id: _res._id,
              tokenId: _res.NFT_token,
              image: _res.NFT_image,
              video: _res.NFT_video,
              name: _res.name,
              desc: _res.details,
              pos: _res.position,
              qrcode: _res.qrcode_image
            })
          })
          .finally(() => setIsLoading(false))
        break
      case "nft_building":
        mutateGetBuildingById({ _id: id })
          .then((_res) => {
            setOwnerDetail({
              type: "building",
              id: _res._id,
              tokenId: _res.NFT_token,
              image: _res.NFT_image,
              name: _res.name,
              desc: _res.detail,
              model: _res.model_3d
            })
          })
          .finally(() => setIsLoading(false))
        break
      case "nft_naka_punk":
        mutateGetNakapunkById({ _id: id })
          .then((_res) => {
            setOwnerDetail({
              type: "naka-punk",
              id: _res._id,
              tokenId: _res.NFT_token,
              image: _res.image,
              name: _res.name,
              desc: _res.description
            })
          })
          .finally(() => setIsLoading(false))
        break
      default:
        break
    }
  }

  const fetchWithContract = useCallback(() => {
    setOwnerDetail(undefined)
    switch (marketType) {
      case "game_item":
        if (gameItemList) {
          const findId =
            gameItemList && gameItemList.find((_item) => _item._id === id)
          if (findId) {
            setOwnerDetail({
              type: "naka-punk",
              id: findId.id,
              tokenId: String(findId.item_id_smartcontract),
              image: findId.image,
              name: findId.name,
              desc: findId.detail
            })
          }
        }
        break
      case "nft_material":
        // eslint-disable-next-line no-case-declarations
        if (materialList) {
          const findMatID =
            materialList && materialList.find((_item) => _item.id === id)
          if (findMatID) {
            setOwnerDetail({
              type: "material",
              id: findMatID.id,
              tokenId: String(findMatID.material_id_smartcontract),
              image: findMatID.image,
              name: findMatID.name,
              desc: findMatID.detail
            })
          }
        }
        break
      default:
        break
    }
  }, [gameItemList, materialList, id, marketType])

  useEffect(() => {
    let load = false

    if (!load) fetchOwnerDetail()

    return () => {
      load = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketType])

  useEffect(() => {
    if (
      (marketType === "game_item" || marketType === "nft_material") &&
      gameItemList &&
      !loadRef.current
    ) {
      fetchWithContract()
      loadRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketType, gameItemList, materialList])

  useEffect(
    () => () => {
      loadRef.current = false
    },
    []
  )

  return { isLoading, ownerDetail, marketType }
}

export default useMarketOwnerDetail
