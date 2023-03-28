import useProfileStore from "@stores/profileStore"
import { useMutation } from "@tanstack/react-query"
import useWalletStore from "@stores/wallet"
import useLoadingStore from "@stores/loading"
import { useToast } from "@feature/toast/containers"
import { IMessage } from "@feature/multichain/interfaces/IMultichain"
import { getNaka } from "@feature/balance/containers/services/balance.services"
import { signIn } from "../services/auth.service"

const useSignIn = () => {
  const { onSetProfileData, onSetProfileAddress, onSetProfileJWT } =
    useProfileStore()
  const { setVaultBalance } = useWalletStore()
  const { setOpen, setClose } = useLoadingStore()
  const { errorToast } = useToast()
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
    onError(err) {
      errorToast((err as IMessage).message)
      setClose()
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
