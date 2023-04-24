import { useGetBuildingById } from "@feature/building/containers/hooks/useGetMyBuilding"
import { useGetLandById } from "@feature/land/containers/hooks/useGetMyLand"
import { IOwnerDetailsData } from "@feature/marketplace/interfaces/IMarketService"
import { useGetNakPunkById } from "@feature/nakapunk/containers/hooks/useGetMyNakapunk"
import useGlobal from "@hooks/useGlobal"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const useMarketOwnerDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [ownerDetail, setOwnerDetail] = useState<IOwnerDetailsData>()

  const { marketType } = useGlobal()
  const { mutateGetLandById } = useGetLandById()
  const { mutateGetBuildingById } = useGetBuildingById()
  const { mutateGetNakapunkById } = useGetNakPunkById()

  const router = useRouter()
  const id = router.query.id as string

  const fetchOwnerDetail = () => {
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

  useEffect(() => {
    let load = false

    if (!load) fetchOwnerDetail()

    return () => {
      load = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketType])

  return { isLoading, ownerDetail, marketType }
}

export default useMarketOwnerDetail
