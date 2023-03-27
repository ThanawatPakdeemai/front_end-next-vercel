import useGetMarketOrderById from "@feature/marketplace/hooks/getMarketOrderById"
import {
  IMarketDetail,
  TNFTType
} from "@feature/marketplace/interfaces/IMarketService"
import useGlobal from "@hooks/useGlobal"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const useMarketDetail = () => {
  const [nameNFT, setNameNFT] = useState<string | undefined>(undefined)
  const [tokenNFT, setTokenNFT] = useState<string | undefined>(undefined)
  const [imageNFT, setImageNFT] = useState<string>("")
  const [vdoNFT, setVDONFT] = useState<string | undefined>(undefined)
  const [detailData, setDetailData] = useState<IMarketDetail>()

  const router = useRouter()
  const { marketType } = useGlobal()

  const id = router.query.id as string
  const limit = 15

  const handleSelectToken = (
    _type: TNFTType | undefined,
    _data: IMarketDetail
  ) => {
    let _tokenId: string = "000000"
    let _nameNFT: string = "NFT-Name"
    let _imageNFT: string = "/images/gameDetails/nakamoto-wars.webp"
    let _vdoNFT: string | undefined
    switch (_type) {
      case "game_item":
        if (_data.item_data) {
          _tokenId = _data.item_data.item_id_smartcontract.toString()
          _nameNFT = _data.item_data.name
          _imageNFT = _data.item_data.image
        }
        break
      case "nft_material":
        if (_data.material_data) {
          _tokenId = _data.material_data.material_id_smartcontract.toString()
          _nameNFT = _data.material_data.name
          _imageNFT = _data.material_data.image
        }
        break
      case "nft_land":
        if (_data.land_data) {
          _tokenId = _data.land_data.land_id
          _nameNFT = _data.land_data.name
          _imageNFT = _data.land_data.image
          _vdoNFT = _data.land_data.NFT_video
        }
        break
      case "nft_building":
        if (_data.building_data && _data.building_data.NFT_token) {
          _tokenId = _data.building_data.NFT_token
          _nameNFT = _data.building_data.name
          _imageNFT = _data.building_data.image
          _vdoNFT = _data.building_data.NFT_video
        }
        break
      case "nft_naka_punk":
        if (_data.nakapunk_data) {
          _tokenId = _data.nakapunk_data.NFT_token
          _nameNFT = _data.nakapunk_data.name
          _imageNFT = _data.nakapunk_data.image
        }
        break
      case "nft_game":
        if (_data.game_data) {
          _tokenId = _data.game_data.NFT_info.NFT_token
          _nameNFT = _data.game_data.name
          _imageNFT = `https://ipfs.io/ipfs/${_data.game_data.NFT_info.image_game_ipfs_cid}`
          _vdoNFT = `https://ipfs.io/ipfs/${_data.game_data.NFT_info.vdo_game_ipfs_cid}?stream=true`
        }
        break
      default:
        break
    }
    setTokenNFT(_tokenId)
    setNameNFT(_nameNFT)
    setImageNFT(_imageNFT)
    setVDONFT(_vdoNFT)
  }

  const { orderData: detailOrder } = useGetMarketOrderById({
    _id: id,
    _type: marketType,
    _isActive: true
  })

  useEffect(() => {
    if (detailOrder) {
      const result = detailOrder.data[0]
      setDetailData(result)
      handleSelectToken(marketType, result)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailOrder])
  // end fetch detail

  return {
    nameNFT,
    tokenNFT,
    imageNFT,
    vdoNFT,
    limit,
    marketType,
    detailData,
    id
  }
}

export default useMarketDetail
