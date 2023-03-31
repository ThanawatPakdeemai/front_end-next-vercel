import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import { BigNumber } from "ethers"

export const DEFAULT_CURRENCY_NAKA: ITokenContract[] = [
  {
    symbol: "NAKA",
    tokenName: "NAKA",
    totolSupply: "179999996000000000000000008",
    decimals: 18,
    address: "",
    balanceWallet: {
      digit: 0,
      text: "N/A",
      hex: BigNumber.from(0)
    },
    balanceVault: {
      digit: 0,
      text: "N/A",
      hex: BigNumber.from(0)
    }
  }
]

export const DEFAULT_CURRENCY_BNB: ITokenContract[] = [
  {
    symbol: "BNB",
    tokenName: "BNB",
    totolSupply: "",
    decimals: 18,
    address: "",
    balanceWallet: {
      digit: 0,
      text: "N/A",
      hex: BigNumber.from(0)
    },
    balanceVault: {
      digit: 0,
      text: "N/A",
      hex: BigNumber.from(0)
    }
  }
]
// export const CURRENCY = [
//   {
//     id: "1",
//     name: "Naka",
//     image_icon: "/images/logo/Logo-Master1.png"
//   },
//   {
//     id: "2",
//     name: "BUSD",
//     image_icon: "/images/logo/Logo-Master1.png"
//   }
// ]
