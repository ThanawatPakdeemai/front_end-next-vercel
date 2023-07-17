import { useCallback } from "react"
import { purchaseLandByRedeemCode } from "@feature/land/containers/services/land.service"
import { purchaseNakapunkByRedeemCode } from "@feature/nakapunk/containers/services/nakapunk.service"
import useMutateAvatarReef from "@feature/avatarReef/containers/hook/useMutateAvatarReef"
import { useToast } from "@feature/toast/containers"
import { TNFTType } from "../interfaces/IMarketService"

interface IParams {
  type: TNFTType
  code: string
  playerId: string
  token?: string
  addrs?: string
}

const useRedeem = () => {
  const { successToast, errorToast } = useToast()
  const { mutateRedeemAvatarReef } = useMutateAvatarReef()
  const onSubmitRedeemByType = useCallback(
    async ({ type, code, playerId, token, addrs }: IParams) => {
      let _status: boolean = false
      switch (type) {
        case "nft_land": {
          if (token) {
            const { data } = await purchaseLandByRedeemCode({
              _code: code,
              _playerId: playerId,
              _landId: token
            })
            if (data) _status = true
          }
          break
        }
        // building
        case "nft_naka_punk": {
          const { status, data } = await purchaseNakapunkByRedeemCode({
            _code: code
          })
          if (status && data) _status = true
          break
        }
        case "nft_avatar": {
          if (addrs) {
            const { status, data } = await mutateRedeemAvatarReef({
              _evmAddrs: addrs,
              _code: code
            })
            if (status && data) _status = true
          }
          break
        }

        default:
          break
      }
      if (_status) successToast("Redeem successful!")
      else errorToast("Redeem Failed!")
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return { onSubmitRedeemByType }
}

export default useRedeem
