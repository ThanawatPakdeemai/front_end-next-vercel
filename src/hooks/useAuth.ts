import { useCallback } from "react"
import axios from "axios"
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core"
import { UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector"
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector
} from "@web3-react/walletconnect-connector"
import { setupNetwork } from "@utils/wallet"
import erc20Abi from "@configs/abi/ERC20.json"
import { AbiItem } from "web3-utils"
import toast from "react-hot-toast"
import useProfileStore from "@stores/profileStore/index"
import { getProfileByEmail } from "@src/features/profile/containers/services/profile.service"
import {
  baseContractAddress,
  chainIdConfig,
  providerConfig
} from "@constants/sites"
import { IProfile, IResetPassword } from "@src/types/profile"
import { ethers } from "ethers"
import { useNetworkContext } from "@src/contexts/networkContext"
import { useWeb3 } from "@src/hooks/useWeb3"
import {
  revokeToken as revokeTokenService,
  refreshToken as refreshTokenService
} from "@src/features/authentication/containers/services/auth.service"
import { useRouter } from "next/router"
import { connectorsByName } from "@src/utils/web3React"
import { ConnectorNames } from "../types/wallet"
import { connectorLocalStorageKey } from "../constants/wallets"

const useAuth = () => {
  const { onSetProfileData, onReset } = useProfileStore()
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const web3: any = useWeb3()
  const { activate, deactivate } = useWeb3React()
  const { setChainId } = useNetworkContext()
  const { account } = useWeb3React()
  const profile = useProfileStore((state) => state.profile.data)

  const pathname = router.pathname.split("/")[1]
  const daiContract = new web3.eth.Contract(
    erc20Abi as AbiItem[],
    baseContractAddress.erc20
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const windowETH: any = window.ethereum
  const connectWallet = useCallback(
    (connectorID: ConnectorNames) => {
      if (pathname !== "p2p-dex") {
        const connector = connectorsByName[connectorID]
        if (connector) {
          if (profile && account) {
            if (
              profile &&
              (profile.address === undefined || profile.address === "")
            ) {
              const _email = localStorage.getItem("email")

              axios
                .put<IProfile>("/profile/wallet", {
                  data: { email: _email, address: account },
                  header: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
                })
                .then(async (res) => {
                  toast.success("Success")
                  if (res.data.address) {
                    res.data.createdAt = profile.createdAt
                    res.data.updatedAt = profile.updatedAt
                  }
                  if (_email) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const _profile: any = await getProfileByEmail(_email)
                    if (_profile.status && _profile.data) {
                      onSetProfileData(_profile.data)
                    }
                  }
                })
                .catch((err: Error) => {
                  toast.error(err.message, {
                    style: {
                      minWidth: "400px"
                    }
                  })
                })
            } else if (profile.address !== account) {
              toast.error("Your wallet is incorrect!")
            }
          } else {
            // toast.error("Something wrong!");
            // When Login and click "Connect wallet"
          }
          activate(connector, async (error: Error) => {
            if (error instanceof UnsupportedChainIdError) {
              toast.error("Setup network")
              const hasSetup = await setupNetwork()

              if (hasSetup) {
                await activate(connector)
              }
            } else {
              localStorage.removeItem(connectorLocalStorageKey)

              if (
                error instanceof UserRejectedRequestErrorInjected ||
                error instanceof UserRejectedRequestErrorWalletConnect
              ) {
                if (connector instanceof WalletConnectConnector) {
                  const walletConnector = connector as WalletConnectConnector
                  walletConnector.walletConnectProvider = undefined
                }
                toast.error("Please authorize to access your account")
              } else {
                toast.error(error.message)
              }
            }
          })
        } else {
          toast.error("The connector config is wrong")
        }
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account]
  )

  const getAmount = (_account: string) =>
    new Promise<string>((resolve, reject) => {
      daiContract.methods
        .balanceOf(_account)
        .call()
        .then((res: string) => {
          resolve(res)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })

  const disconnectWallet = useCallback(async () => {
    onReset()
    deactivate()

    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem("walletconnect")) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }

    if (localStorage.getItem("connectorId")) {
      localStorage.removeItem("connectorId")
    }

    if (localStorage.getItem(connectorLocalStorageKey)) {
      localStorage.removeItem(connectorLocalStorageKey)
    }

    if (localStorage.getItem("token")) {
      localStorage.removeItem("email")
      localStorage.removeItem("token")
      localStorage.removeItem("address")
      localStorage.removeItem("loginWith")
      localStorage.removeItem("item") // TODO:
      // await revokeTokenAction()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deactivate])

  const deleteToken = () => {
    delete axios.defaults.headers.common["Authorization"]
    localStorage.removeItem("token")
    localStorage.removeItem("time")
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    localStorage.removeItem("address")
    localStorage.removeItem("loginWith")
    localStorage.removeItem("item") // TODO:
  }

  const revokeTokenAction = () =>
    new Promise((resolve, reject) => {
      const res = revokeTokenService()
      deleteToken()

      resolve(res)
    })

  const refreshToken = () =>
    new Promise<string>((resolve, reject) => {
      refreshTokenService()
        .then((res) => {
          if (res) {
            const { jwtToken } = res
            localStorage.setItem("token", jwtToken)
            axios.defaults.headers.common = {
              Authorization: `Bearer ${jwtToken}`
            }

            resolve(jwtToken)
          }
        })
        .catch((error: Error) => {
          reject(error)
        })
    })

  const accountsChanged = () => {
    if (windowETH) {
      windowETH.on("accountsChanged", async (accounts: Array<string>) => {
        // console.log("accounts", accounts);
      })
    }
  }

  const walletConnect = async (chainRequest: number) => {
    if (windowETH) {
      // const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      // await provider.send("eth_requestAccounts", []);
      // const signer = provider.getSigner();
      // const address = await signer.getAddress();
      const providerRequest =
        chainRequest === chainIdConfig.binance
          ? providerConfig.binance
          : providerConfig.polygon
      windowETH
        .request({
          method: "wallet_addEthereumChain",
          params: providerRequest
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res: any) => {
          // The result varies by RPC method.
          // For example, this method will return a transaction hash hexadecimal string on success.
          // console.log("res", res);
          // onChainChanged()
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          // If the request fails, the Promise will reject with an error.
          // console.log("error", error);
        })
    } else {
      toast.error("install metamask extension!!")
    }
  }

  const onChainChanged = () => {
    if (windowETH) {
      windowETH
        .on("chainChanged", async (accounts: string) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const provider = new ethers.providers.Web3Provider(windowETH, "any")
          await provider.send("eth_requestAccounts", [])
          const signer = await provider.getSigner()
          const chainId = await signer.getChainId()
          // Handle the new accounts, or lack thereof.
          // "accounts" will always be an array, but it can be empty.
          if (chainId) {
            setChainId(chainId)
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((result: any) => {
          // The result varies by RPC method.
          // For example, this method will return a transaction hash hexadecimal string on success.
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          // If the request fails, the Promise will reject with an error.
        })
    }
  }

  const onSwitchNetwork = (chainRequire: number) => {
    walletConnect(chainRequire)
  }

  const forgotPassword = (email: string) =>
    axios
      .get(`/profile/reset-password/${email}`)
      .then((res) => res.data)
      .catch((error) => error)

  const createNewPassword = async ({
    email,
    token,
    password,
    confirmPassword
  }: IResetPassword) =>
    axios
      .post(`/profile/reset-password`, {
        email,
        token,
        password,
        confirmPassword
      })
      .then((res) => res.data)

  return {
    connectWallet,
    walletConnect,
    disconnectWallet,
    accountsChanged,
    deleteToken,
    refreshToken,
    revokeTokenAction,
    getAmount,
    forgotPassword,
    createNewPassword,
    onChainChanged,
    onSwitchNetwork
  }
}
export default useAuth
