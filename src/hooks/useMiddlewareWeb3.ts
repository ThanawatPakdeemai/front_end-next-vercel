import { useToast } from "@feature/toast/containers"
import { useWeb3Provider } from "@providers/Web3Provider"
import useProfileStore from "@stores/profileStore"
import { useCallback } from "react"

const useMiddlewareWeb3 = () => {
  const { signer, address } = useWeb3Provider()
  const { profile } = useProfileStore()
  const { errorToast } = useToast()

  const validationAccount = useCallback(() => {
    let _status: boolean = false
    let _message: string | undefined
    if (
      profile.data &&
      profile.data.address &&
      signer &&
      address &&
      profile.data.address.toLowerCase() === address.toLowerCase()
    ) {
      _status = true
    } else if (!profile.data) {
      _message = "user not login"
    } else if (!signer || !address || profile.data?.address) {
      _message = "user not connect wallet"
    } else if (profile.data.address.toLowerCase() !== address.toLowerCase()) {
      _message = "wallet address are invalid"
    } else {
      _message = "fail to vaildation web3"
    }
    if (!_status && _message) errorToast(_message)
    return _status
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, profile.data, signer])

  return { validationAccount }
}

export default useMiddlewareWeb3
