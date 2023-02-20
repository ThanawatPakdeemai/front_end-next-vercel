import useProfileStore from "@stores/profileStore"
import { useMutation } from "@tanstack/react-query"
import useWalletStore from "@stores/wallet"
import { getNaka } from "@feature/inventory/containers/services/inventory.service"
import { IProfile } from "@feature/profile/interfaces/IProfileService"
// import handleConnectWithMetamask from "@hooks/useWeb3Provider/useCreateWeb3Provider"
import useLoadingStore from "@stores/loading"
import { loginMetamask } from "../services/auth.service"

const useLoginMetamask = () => {
  const { onSetProfileData, onSetProfileAddress, onSetProfileJWT } =
    useProfileStore()
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
      // TODO NongBoyRanarak Fix Bug auto connect wallet
      //  handleConnectWithMetamask
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
