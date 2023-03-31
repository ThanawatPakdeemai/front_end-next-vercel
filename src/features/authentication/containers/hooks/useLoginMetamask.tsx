import useProfileStore from "@stores/profileStore"
import { useMutation } from "@tanstack/react-query"
import useWalletStore from "@stores/wallet"
import { IProfile } from "@feature/profile/interfaces/IProfileService"
import useLoadingStore from "@stores/loading"
import { useWeb3Provider } from "@providers/index"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { getNaka } from "@feature/balance/containers/services/balance.services"
import { loginMetamask } from "../services/auth.service"

const useLoginMetamask = () => {
  const { onSetProfileData, onSetProfileAddress, onSetProfileJWT } =
    useProfileStore()
  const { errorToast } = useToast()
  const { handleConnectWithMetamask } = useWeb3Provider()
  const { setVaultBalance } = useWalletStore()
  const { setOpen, setClose } = useLoadingStore()
  const {
    data: _profile,
    error,
    isLoading,
    isError,
    mutateAsync: mutateLoginMetamask
  } = useMutation(loginMetamask, {
    mutationKey: ["loginMetamask"],
    retry: false,
    onMutate() {
      setOpen("Signing in...")
    },
    onSuccess(res: IProfile) {
      onSetProfileData(res)
      onSetProfileAddress(res.address)
      onSetProfileJWT(res.jwtToken)
      setClose()
      getNaka(res.address).then((_res) => {
        if (_res && _res.data) {
          setVaultBalance(Number(_res.data))
        }
      })
      const handleConnectWallet = () => {
        if (res && handleConnectWithMetamask) {
          handleConnectWithMetamask()
        } else {
          errorToast(MESSAGES.please_connect_wallet)
        }
      }
      handleConnectWallet()
    },
    onError(err) {
      errorToast((err as Error).message)
      setClose()
    }
  })

  return {
    _profile,
    error,
    isLoading,
    isError,
    mutateLoginMetamask
  }
}

export default useLoginMetamask
