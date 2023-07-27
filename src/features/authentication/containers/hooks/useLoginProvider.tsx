import useProfileStore from "@stores/profileStore"
import { useMutation } from "@tanstack/react-query"
import useLoadingStore from "@stores/loading"
import _ from "lodash"
import useRegisterTypeStore from "@stores/registerTypes"
import useLoginTypeStore from "@stores/loginTypes"
import { loginProvider } from "../services/auth.service"

const useLoginProvider = () => {
  const { onSetProfileData, onSetProfileAddress, onSetProfileJWT } =
    useProfileStore()
  const { getClickRegisterTypes: registerTypes } = useRegisterTypeStore()
  const { getClickLoginTypes: loginTypes } = useLoginTypeStore()

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
      if (loginTypes !== "") {
        localStorage.removeItem("loginWith")
      }
      if (registerTypes !== "") {
        localStorage.removeItem("registerWith")
      }
    },
    onError() {
      setClose()
      if (loginTypes !== "") {
        localStorage.removeItem("loginWith")
      }
      if (registerTypes !== "") {
        localStorage.removeItem("registerWith")
      }
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
