import { useQuery } from "@tanstack/react-query"
import { BigNumberish } from "ethers"
import useContractVault from "../useContractVault"

interface INakaBalance {
  status: boolean
  data: BigNumberish
}

const useGetNakaBalance = (_address: string, isConnectedWallet: boolean) => {
  const { getNakaBalance }: any = useContractVault()

  const { data: balance, refetch: refetchBalance } = useQuery({
    queryKey: ["naka_balance", _address],
    queryFn: () => getNakaBalance(_address),
    enabled: _address !== "" && isConnectedWallet,
    staleTime: Infinity
  })

  return {
    balance: balance as INakaBalance,
    refetchBalance
  }
}

export default useGetNakaBalance
