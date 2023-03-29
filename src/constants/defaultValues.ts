import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import { IErrorMessage } from "@interfaces/IErrorMessage"

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
    text: ""
  },
  balanceVault: {
    digit: 0,
    text: ""
  }
}
