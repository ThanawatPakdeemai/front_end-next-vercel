import useProfileStore from "@stores/profileStore"
import { useMutation } from "@tanstack/react-query"
import useWalletStore from "@stores/wallet"
import { getNaka } from "@feature/inventory/containers/services/inventory.service"
import useLoadingStore from "@stores/loading"
import { signIn } from "../services/auth.service"

const useSignIn = () => {
  const { onSetProfileData, onSetProfileAddress, onSetProfileJWT } =
    useProfileStore()
  const { setVaultBalance } = useWalletStore()
  const { setOpen, setClose } = useLoadingStore()
  const {
    data: _profile,
    error,
    isLoading,
    isError,
    mutateAsync: mutateSignIn
  } = useMutation(signIn, {
    mutationKey: ["signIn"],
    retry: false,
    onMutate() {
      setOpen("Signing in...")
    },
    onSuccess(res) {
      onSetProfileData(res)
      onSetProfileAddress(res.address)
      onSetProfileJWT(res.jwtToken)
      setClose()
      getNaka(res.address).then((_res) => {
        if (_res && _res.data) {
          setVaultBalance(Number(_res.data))
        }
      })
    }
  })

  return {
    _profile,
    error,
    isLoading,
    isError,
    mutateSignIn
  }
}

export default useSignIn
