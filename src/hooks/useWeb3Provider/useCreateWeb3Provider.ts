import { useCallback, useEffect, useState } from "react"
import {
  FeeData,
  JsonRpcSigner,
  Network,
  Web3Provider
} from "@ethersproject/providers"
import CONFIGS from "@configs/index"
import { WALLET_CONNECTOR_TYPES } from "@configs/walletConnect"
import useProfileStore from "@stores/profileStore"
import { BigNumber, providers, utils } from "ethers"
import { ELocalKey } from "@interfaces/ILocal"
import Helper from "@utils/helper"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { IErrorMessage } from "@interfaces/IErrorMessage"
import {
  getProfileByEmail,
  updateWalletAddress
} from "@feature/profile/containers/services/profile.service"
import { DEFAULT_STATUS_WALLET } from "@constants/defaultValues"
import { IProfile } from "@feature/profile/interfaces/IProfileService"
import useChainSupportStore from "@stores/chainSupport"

const useCreateWeb3Provider = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined)
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [provider, setProvider] = useState<Web3Provider | undefined>(undefined)
  const [chainId, setChainId] = useState<string | undefined>(undefined)
  const [accounts, setAccounts] = useState<string[] | undefined>(undefined)
  const [hasMetamask, setHasMetamask] = useState<boolean>(false)
  const [network, setNetwork] = useState<Network>({} as Network)
  const [balanceETH, setBalance] = useState<BigNumber>(BigNumber.from(0))
  const [bestGasPrice, setBestGasPrice] = useState<string>("")
  const [feeData, setFeeData] = useState<FeeData>({} as FeeData)
  // const [isWrongNetwork, setIsWrongNetwork] = useState(false)
  const [disabledConnectButton, setDisabledConnectButton] =
    useState<boolean>(false)
  const [hasChangeAccountMetamask, setHasChangeAccountMetamask] =
    useState(false)
  const [statusWalletConnected, setStatusWalletConnected] =
    useState<IErrorMessage>(DEFAULT_STATUS_WALLET)

  const profile = useProfileStore((state) => state.profile.data)
  const { onSetProfileData, onSetProfileAddress, isLogin } = useProfileStore()
  const { setCurrentChainConnected, chainSupport, setCurrentTokenSelected } =
    useChainSupportStore()
  // const { fetchAllTokenSupported, fetchNAKAToken } = useSupportedChain()
  const { successToast, errorToast } = useToast()

  /**
   * @description Add token to metamask
   */
  const onAddToken = useCallback(async () => {
    try {
      if (window.ethereum === undefined) return
      if (window.ethereum.request === undefined) return
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: Helper.getParams() as any
      })
      if (wasAdded) {
        successToast(MESSAGES.success)
      } else {
        errorToast(MESSAGES["error-something"])
      }
    } catch (error: any) {
      // User rejected the request
      if (error.code === 4001) errorToast(error.message)
    }
  }, [errorToast, successToast])

  /**
   * @description Check if current account matches with the one we need
   * @param accounts
   * @returns {void}
   */
  const handleAccountsChanged = useCallback(
    (_accounts: string[]): void => {
      if (_accounts && _accounts.length === 0) {
        setStatusWalletConnected({
          responseStatus: true,
          errorMsg: `${_accounts[0]} ${MESSAGES.wallet_is_correct}`,
          type: "success"
        })
        return
      }
      if (
        profile &&
        profile.address &&
        profile.address.toLocaleLowerCase() === _accounts[0].toLocaleLowerCase()
      ) {
        // successToast(`${_accounts[0]} ${MESSAGES.wallet_is_correct}`)
        setStatusWalletConnected({
          responseStatus: true,
          errorMsg: `${_accounts[0]} ${MESSAGES.wallet_is_correct}`,
          type: "success"
        })
      } else {
        errorToast(`${_accounts[0]} ${MESSAGES.wallet_is_incorrect}`)
        setStatusWalletConnected({
          responseStatus: false,
          errorMsg: `${_accounts[0]} ${MESSAGES.wallet_is_incorrect}`,
          type: "error"
        })
      }
    },
    [errorToast, profile]
  )

  /**
   * @description Adding chain
   */
  const resetChainId = useCallback(
    async (_chainId: string) => {
      const _provider = window.ethereum
      if (_provider === undefined || _provider.request === undefined) {
        return
      }
      if (_provider && _provider.request) {
        try {
          await _provider.request({
            method: "wallet_addEthereumChain",
            params: [Helper.getNetwork(_chainId)]
          })
          return {
            responseStatus: true,
            errorMsg: MESSAGES.wallet_addEthereumChain,
            type: "success"
          }
        } catch (error: any) {
          errorToast(error.message)
          return {
            responseStatus: false,
            errorMsg: (error as Error).message,
            type: "failed"
          }
        }
      } else {
        return {
          responseStatus: false,
          errorMsg:
            "Can't setup the MATIC network on metamask because window.ethereum is undefined",
          type: "failed"
        }
      }
    },
    [errorToast]
  )

  const onSetAddress = useCallback((_address: string | undefined) => {
    // eslint-disable-next-line no-unused-vars
    let cancel = false
    setAddress(_address)
    useProfileStore.getState().onSetProfileAddress(_address)
    return () => {
      cancel = true
    }
  }, [])

  const chainIdIsSupported = () =>
    window.ethereum?.chainId === CONFIGS.CHAIN.CHAIN_ID_HEX ||
    window.ethereum?.chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB

  /**
   * @description Disconnect wallet
   */
  const handleDisconnectWallet = useCallback(async () => {
    setProvider(undefined)
    setAddress(undefined)
    setAccounts(undefined)
    setChainId(undefined)
    setNetwork({} as Network)
    setStatusWalletConnected(DEFAULT_STATUS_WALLET)
  }, [])

  /**
   * @description Update wallet address if it's empty
   */
  const onUpdateWallet = useCallback(
    async (_profile: IProfile, _address: string) => {
      const data = {
        _email: _profile.email,
        _address
      }
      await updateWalletAddress(data)
      await getProfileByEmail(_profile.email).then((_res) => {
        onSetProfileData(_res)
        onSetProfileAddress(_res.address)
      })
      // TODO: Do something when updated wallet address
      // handleConnectWithMetamask()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  /**
   * @description Connect with metamask
   */
  const handleConnectWithMetamask = useCallback(async () => {
    if (window.ethereum === undefined) return

    if (!chainIdIsSupported()) {
      resetChainId(CONFIGS.CHAIN.CHAIN_ID_HEX)
    }
    setCurrentChainConnected(window.ethereum?.chainId as string)
    if (chainSupport && chainSupport.length > 0) {
      setCurrentTokenSelected(chainSupport[0])
    }

    const _provider = new providers.Web3Provider(window.ethereum)
    const walletConnector = Helper.getLocalStorage(ELocalKey.walletConnector)
    if (walletConnector === WALLET_CONNECTOR_TYPES.injected) {
      const account = await Helper.getWalletAccount()
      if (_provider) {
        const _signer = _provider.getSigner()
        const _gasPrice = await _provider.getGasPrice()
        const _network = await _provider.getNetwork()
        const _gasPriceInGwei = utils.formatUnits(_gasPrice, "gwei")
        const _feeData = await _provider.getFeeData()
        if (account && account[0]) {
          const _balance = await _provider.getBalance(account[0])
          setBalance(_balance)
        }
        setSigner(_signer)
        setNetwork(_network)
        setBestGasPrice(_gasPriceInGwei)
        setFeeData(_feeData)
      }
    }
    _provider
      .send("eth_requestAccounts", [])
      .then((_accounts) => {
        setProvider(_provider)
        onSetAddress(_accounts[0])
        setAccounts(_accounts)
        handleAccountsChanged(_accounts)
        setTimeout(() => {
          setDisabledConnectButton(false)
        }, 5000)
      })
      .catch((err) => {
        setAccounts(undefined)
        onSetAddress(undefined)
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          errorToast(`Error code: ${err.code}\n${MESSAGES.user_reject_request}`)
        } else {
          errorToast(
            `Error code: ${err.code}\n${err.message}\n${MESSAGES.please_connect_metamask}`
          )
        }
      })

    const walletAccounts = await _provider?.listAccounts()
    if (walletAccounts === undefined) setAccounts(undefined)

    if (walletAccounts) {
      onSetAddress(walletAccounts[0])
      if (profile) {
        if (!profile.address || profile.address === "") {
          if (profile.email) {
            onUpdateWallet(profile, walletAccounts[0])
          }
        }
      }
    }

    // Subscribe to chainId change
    window.ethereum.on("chainChanged", (_chainId: string) => {
      if (_chainId === undefined) {
        setChainId(undefined)
        return
      }
      // switchNetwork(_chainId)
      setChainId(_chainId)
      // handleDisconnectWallet()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSetAddress, resetChainId, chainSupport])

  /**
   * @description Check if current chain matches with the one we need
   * @returns
   */
  // NO NEED ANYMORE
  /* const checkNetwork = useCallback(async () => {
    const _provider = window.ethereum
    if (_provider === undefined || _provider.request === undefined) {
      return
    }
    if (_provider && _provider.request) {
      try {
        const currentChainId = await _provider.request({
          method: "eth_chainId"
        })
        setChainId(currentChainId)
        return {
          responseStatus: true,
          errorMsg: "",
          type: "success"
        }
      } catch (error) {
        return {
          responseStatus: false,
          errorMsg: (error as Error).message,
          type: "failed"
        }
      }
    }
  }, []) */

  const handleSignMessage = useCallback(
    async (
      _provider: Web3Provider,
      _address: string,
      _message: string
    ): Promise<string> => _provider.getSigner(_address).signMessage(_message),
    []
  )

  const switchNetwork = useCallback(
    async (_chainId: string) => {
      const _provider = window.ethereum
      if (_provider === undefined || _provider.request === undefined) {
        return
      }
      if (_provider && _provider.request) {
        try {
          // check if the chain to connect to is installed
          await _provider.request({
            method: "wallet_switchEthereumChain",
            // chainId must be in hexadecimal numbers
            params: [{ chainId: _chainId }]
          })
          successToast(
            `Switch to chain ${Helper.getNetwork(_chainId).chainName}`
          )
          const _resetProvider = new providers.Web3Provider(_provider)
          const _signer = _resetProvider.getSigner()
          if (_signer) {
            handleConnectWithMetamask()
          }
        } catch (error: Error | any) {
          // This error code indicates that the chain has not been added to MetaMask
          // if it is not, then install it into the user MetaMask
          if (error.code === 4902 || error.code === -32602) {
            resetChainId(_chainId)
          }
        }
      } else {
        // if no window.ethereum then MetaMask is not installed
        errorToast(MESSAGES.install_wallet)
        return {
          responseStatus: false,
          errorMsg: MESSAGES.install_wallet,
          type: "failed"
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleConnectWithMetamask, resetChainId]
  )

  /** ******************************************************* */
  /* Handle chain (network) and chainChanged (per EIP-1193) */
  /** ******************************************************* */
  const handleChainChanged = (_chainId: string) => {
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload()
  }

  useEffect(() => {
    if (window.ethereum === undefined) return
    window.ethereum.on("chainChanged", handleChainChanged)

    if (!isLogin) return

    let load = false

    if (!load) handleConnectWithMetamask() // checkChain()

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])

  useEffect(() => {
    let load = false

    if (!load) {
      const getWalletAccount = async () => {
        const walletAccounts = await provider?.listAccounts()
        if (walletAccounts) {
          setAddress(walletAccounts[0])
        } else {
          setAccounts(undefined)
        }
      }
      getWalletAccount()
    }

    return () => {
      load = true
    }
  }, [provider])

  useEffect(() => {
    let load = false

    if (address === undefined) return
    if (provider === undefined) return
    if (!load) {
      const _signer = provider?.getSigner()
      setSigner(_signer)
    }

    return () => {
      load = true
    }
  }, [address, provider])

  useEffect(() => {
    const load = false

    if (!load) {
      const checkHasMetamask: boolean = typeof window.ethereum !== "undefined"
      setHasMetamask(checkHasMetamask)
    }

    return () => {
      setHasMetamask(false)
    }
  }, [])

  // Subscribe to accounts change
  useEffect(() => {
    const _provider = window.ethereum as any
    if (_provider !== undefined) {
      _provider.on("accountsChanged", handleAccountsChanged)
      return () => {
        _provider.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [handleAccountsChanged])

  return {
    accounts,
    address,
    chainId,
    provider,
    handleConnectWithMetamask,
    handleSignMessage,
    setHasChangeAccountMetamask,
    hasChangeAccountMetamask,
    handleSetAccount: setAccounts,
    handleSetAddress: setAddress,
    signer,
    handleDisconnectWallet,
    hasMetamask,
    bestGasPrice,
    network,
    balanceETH,
    feeData,
    switchNetwork,
    setChainId,
    statusWalletConnected,
    isConnected: statusWalletConnected && statusWalletConnected.responseStatus,
    // isWrongNetwork,
    onAddToken,
    disabledConnectButton,
    setDisabledConnectButton
  }
}

export default useCreateWeb3Provider
