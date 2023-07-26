import useProfileStore from "@stores/profileStore"
import { useMutation } from "@tanstack/react-query"
import useLoadingStore from "@stores/loading"
import _ from "lodash"
import { loginProvider } from "../services/auth.service"

const useLoginProvider = () => {
  const { onSetProfileData, onSetProfileAddress, onSetProfileJWT } =
    useProfileStore()
  const { setOpen, setClose } = useLoadingStore()
  const {
    data: _profile,
    error,
    isLoading,
    isError,
    mutateAsync: mutateLoginProvider
  } = useMutation(loginProvider, {
    mutationKey: ["LoginProvider"],
    retry: false,
    onMutate() {
      setOpen("Signing in...")
    },
    onSuccess(res) {
      onSetProfileData(res)
      onSetProfileAddress("")
      onSetProfileJWT(res.jwtToken)
      setClose()
    },
    onError() {
      setClose()
    }
  })

  return {
    _profile,
    error,
    isLoading,
    isError,
    mutateLoginProvider
  }
}

export default useLoginProvider
