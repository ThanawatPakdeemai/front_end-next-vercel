import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import { IErrorMessage } from "@interfaces/IErrorMessage"
import { BigNumber } from "ethers"

export const DEFAULT_STATUS_WALLET: IErrorMessage = {
  responseStatus: false,
  errorMsg: "",
  type: "error"
}

export const DEFAULT_TOKEN_INFO: ITokenContract = {
  symbol: "",
  tokenName: "",
  address: "",
  balanceWallet: {
    digit: 0,
    text: "",
    hex: BigNumber.from(0)
  },
  balanceVault: {
    digit: 0,
    text: "",
    hex: BigNumber.from(0)
  }
}
