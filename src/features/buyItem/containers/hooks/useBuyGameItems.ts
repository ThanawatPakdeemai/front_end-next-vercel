import { useMutation } from "@tanstack/react-query"
// import useWalletStore from "@stores/wallet"
import { buyItems } from "../services/buyItem.service"

const useBuyGameItems = () => {
  // const { setNakaBalance } = useWalletStore()
  const {
    data,
    error,
    isLoading,
    isError,
    mutateAsync: mutateBuyItems
  } = useMutation(buyItems, {
    mutationKey: ["buyItems"],
    retry: false
    // onSuccess(res) {
    // console.log(`result: ${res}`)
    // setNakaBalance(res.)
    // onSetProfileData(res)
    // onSetProfileAddress(res.address)
    // onSetProfileJWT(res.jwtToken)
    // }
  })

  return { data, isLoading, mutateBuyItems, error, isError }
}

export default useBuyGameItems
