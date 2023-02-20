import { useQuery } from "@tanstack/react-query"
import { BigNumberish } from "ethers"
import useContractVault from "../useContractVault"

interface INakaBalance {
  status: boolean
  data: BigNumberish
}

const useGetNakaBalanceVault = (
  _address: string,
  isConnectedWallet: boolean
) => {
  // @ts-ignore
  const { getNakaBalanceOf } = useContractVault()

  const { data: balanceVault } = useQuery({
    queryKey: ["naka_balance_vault", _address],
    queryFn: () => getNakaBalanceOf(_address),
    enabled: _address !== "" && isConnectedWallet,
    staleTime: Infinity
  })

  return {
    balanceVault: balanceVault as INakaBalance
  }
}

export default useGetNakaBalanceVault
