import { NextRouter, useRouter } from "next/router"
import { useEffect, useState } from "react"
import Helper from "@utils/helper"
import {
  IMarketDetail,
  TNFTType
} from "@feature/marketplace/interfaces/IMarketService"
import useGlobal from "@hooks/useGlobal"
import useMutateMarketplace from "./useMutateMarketplace"

const useMarketContext = () => {
  const router: NextRouter = useRouter()
  const id = router.query.id as string

  const { mutateMarketOrderById } = useMutateMarketplace()
  const { convertNFTTypeToUrl } = Helper
  const { marketType } = useGlobal()
  const [marketOrder, setMarketOrder] = useState<IMarketDetail | undefined>(
    undefined
  )
  const [nameNFT, setNameNFT] = useState<string | undefined>(undefined)
  const [tokenNFT, setTokenNFT] = useState<string | undefined>(undefined)
  const [imageNFT, setImageNFT] = useState<string>(
    "/images/gameDetails/nakamoto-wars.webp"
  )
  const [vdoNFT, setVDONFT] = useState<string | undefined>(undefined)

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
          _nameNFT = `${_data.item_data.name} ${_data.item_data.item_size}`
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
          _imageNFT = _data.building_data.NFT_image
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

  const fetchOrderById = async () => {
    if (id && marketType) {
      mutateMarketOrderById({
        _id: id,
        _urlNFT: convertNFTTypeToUrl(marketType)
      }).then((response) => {
        handleSelectToken(marketType, response.data[0])
        setMarketOrder(response.data[0])
      })
    }
  }

  useEffect(() => {
    let cleanup = false
    if (!cleanup) fetchOrderById()
    return () => {
      cleanup = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, marketType])

  return { marketOrder, nameNFT, tokenNFT, imageNFT, vdoNFT, fetchOrderById }
}

export default useMarketContext
