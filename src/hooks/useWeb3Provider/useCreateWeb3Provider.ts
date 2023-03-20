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
import useChainSupport from "@stores/chainSupport"
import Helper from "@utils/helper"
import { IErrorMessage } from "@interfaces/IErrorMessage"
import Web3 from "web3"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import {
  AddEthereumChainParameter,
  WatchAssetParams
} from "@interfaces/IMetamask"

import { updateWalletAddress } from "@feature/profile/containers/services/profile.service"

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
  const [loading, setLoading] = useState<boolean>(false)
  const [hasChangeAccountMetamask, setHasChangeAccountMetamask] =
    useState(false)
  const { setChainSupport } = useChainSupport()
  const profile = useProfileStore((state) => state.profile.data)
  const { successToast, errorToast } = useToast()

  const getParams = (): WatchAssetParams => ({
    type: "ERC20",
    options: {
      address: CONFIGS.CONTRACT_ADDRESS.ERC20,
      symbol: CONFIGS.CHAIN.TOKEN_NAME,
      decimals: 18,
      image: CONFIGS.CHAIN.ICON_NAKA
    }
  })

  /**
   * @description Handle network setting for metamask
   * @param _chainId
   * @returns
   */
  const getNetwork = useCallback(
    (_chainId: string): AddEthereumChainParameter => {
      switch (_chainId) {
        case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
          return {
            chainId: `0x${Number(CONFIGS.CHAIN.BNB_CHAIN_ID).toString(16)}`,
            chainName: `${CONFIGS.CHAIN.BNB_CHAIN_NAME}`,
            rpcUrls: [`${CONFIGS.CHAIN.BNB_RPC_URL}/`],
            blockExplorerUrls: [`${CONFIGS.CHAIN.BNB_SCAN}/`],
            nativeCurrency: {
              name: CONFIGS.CHAIN.TOKEN_NAME_BUSD,
              symbol: CONFIGS.CHAIN.TOKEN_SYMBOL_BNB,
              decimals: 18
            }
          }

        default:
          return {
            chainId: `0x${Number(CONFIGS.CHAIN.CHAIN_ID).toString(16)}`,
            chainName: `${CONFIGS.CHAIN.CHAIN_NAME}`,
            rpcUrls: [`${CONFIGS.CHAIN.POLYGON_RPC_URL}/`],
            blockExplorerUrls: [`${CONFIGS.CHAIN.POLYGON_SCAN}/`],
            nativeCurrency: {
              name: CONFIGS.CHAIN.TOKEN_NAME,
              symbol: CONFIGS.CHAIN.TOKEN_SYMBOL,
              decimals: 18
            }
          }
      }
    },
    []
  )

  const importNakaToken = useCallback(async () => {
    const web3 = new Web3(Web3.givenProvider)
    if (!web3) return
    if (web3 && web3.givenProvider.request) {
      try {
        return await web3.givenProvider.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: CONFIGS.CONTRACT_ADDRESS.ERC20,
              symbol: "naka",
              decimals: 18,
              image: `${CONFIGS.BASE_URL.FRONTEND}/favicon.svg`
            }
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
  }, [])

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
            params: [getNetwork(_chainId)]
          })
          successToast(MESSAGES.wallet_addEthereumChain)
          return {
            responseStatus: true,
            errorMsg: "",
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
    [getNetwork, errorToast, successToast]
  )

  const chainIdIsSupported = () =>
    window.ethereum?.chainId === CONFIGS.CHAIN.CHAIN_ID_HEX ||
    window.ethereum?.chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB

  const handleDisconnectWallet = useCallback(async () => {
    setProvider(undefined)
    setAddress(undefined)
    setAccounts(undefined)
    setChainId(undefined)
    setNetwork({} as Network)
    setChainSupport([])
  }, [setChainSupport])

  const onSetAddress = useCallback((_address: string | undefined) => {
    setAddress(_address)
    useProfileStore.getState().onSetProfileAddress(_address)
  }, [])

  const handleCheckingWallet = useCallback((): IErrorMessage => {
    if (
      profile &&
      address &&
      profile.address &&
      profile.address.toLocaleLowerCase() !== address.toLocaleLowerCase()
    ) {
      // Uncomment this if you want to disconnect wallet when user change account on metamask
      // handleDisconnectWallet()
      return {
        responseStatus: false,
        errorMsg: "Wallet is incorrect",
        type: "error"
      }
    }

    return {
      responseStatus: true,
      errorMsg: "Wallet is correct",
      type: "success"
    }
  }, [address, profile])

  /**
   * @description Check if current chain matches with the one we need
   * @returns
   */
  const checkNetwork = useCallback(async () => {
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
  }, [])

  const checkChain = useCallback(async () => {
    if (!chainIdIsSupported()) {
      resetChainId(CONFIGS.CHAIN.CHAIN_ID_HEX)
    }
    if (window.ethereum === undefined) {
      return
    }
    if (window.ethereum.request === undefined) return
    const _currentChainId = await window.ethereum.request({
      method: "eth_chainId"
    })
    if (_currentChainId === undefined) return
    setChainId(_currentChainId)
    const walletConnector = Helper.getLocalStorage(ELocalKey.walletConnector)
    if (walletConnector === WALLET_CONNECTOR_TYPES.injected) {
      const account = await Helper.getWalletAccount()
      const _provider = new providers.Web3Provider(window.ethereum)
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
        handleCheckingWallet()
      }

      setAccounts(account)
      onSetAddress(account[0])
      window.ethereum.on("accountsChanged", async () => {
        // await handleDisconnectWallet()
        await setHasChangeAccountMetamask(true)
        // handleCheckingWallet(_provider, address[0])
        checkChain()
      })
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
      // Subscribe to session disconnection
      if (window.ethereum && window.ethereum.on) {
        window.ethereum.on(
          "disconnect",
          (/* code: number, reason: string */) => {
            setProvider(undefined)
            setAddress(undefined)
          }
        )
      }
    }
  }, [handleCheckingWallet, onSetAddress, resetChainId])

  const handleConnectWithMetamask = useCallback(async () => {
    if (window.ethereum === undefined) return
    if (!chainIdIsSupported()) {
      resetChainId(CONFIGS.CHAIN.CHAIN_ID_HEX)
    }
    Helper.setLocalStorage({
      key: ELocalKey.walletConnector,
      value: WALLET_CONNECTOR_TYPES.injected
    })
    const _provider = new providers.Web3Provider(window.ethereum)
    _provider.send("eth_requestAccounts", []).then(() => {
      setProvider(_provider)
    })
    const account = await _provider.send("eth_requestAccounts", [])
    if (account === undefined) {
      setAccounts(undefined)
      onSetAddress(undefined)
      return
    }
    onSetAddress(account[0])
    setAccounts(account)
    checkNetwork()

    const walletAccounts = await _provider?.listAccounts()
    if (walletAccounts === undefined) setAccounts(undefined)
    if (walletAccounts) {
      onSetAddress(walletAccounts[0])

      if (profile) {
        if (profile.address === undefined) {
          if (profile.email) {
            const data = {
              _email: profile.email,
              _address: walletAccounts[0]
            }

            await updateWalletAddress(data)
            checkChain()
          }
        }
      }
    }
    const _signer = _provider.getSigner()
    setSigner(_signer)

    // Subscribe to accounts change
    window.ethereum.on("accountsChanged", async () => {
      // !Error - this code has problem when user change network on metamask
      // await handleDisconnectWallet()
      setHasChangeAccountMetamask(true)
    })
    // Subscribe to chainId change
    window.ethereum.on("chainChanged", (_chainId: string) => {
      if (_chainId === undefined) {
        setChainId(undefined)
        return
      }
      setChainId(_chainId)
      // !Error - this code has problem when user change network on metamask
      // handleDisconnectWallet()
      if (!chainIdIsSupported()) {
        resetChainId(`0x${Number(_chainId).toString(16)}`)
      }
    })
    // Subscribe to session disconnection
    if (window.ethereum && window.ethereum.on) {
      window.ethereum.on("disconnect", (/* code: number, reason: string */) => {
        setProvider(undefined)
        setAddress(undefined)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkNetwork, onSetAddress, resetChainId])

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
            params: [{ chainId: _chainId }] // chainId must be in hexadecimal numbers
          })
          successToast(MESSAGES.wallet_switchEthereumChain)
          const _newProvider = new providers.Web3Provider(_provider)
          const _signer = _newProvider.getSigner()
          if (_signer) {
            checkNetwork()
            setChainId(_chainId)
            setSigner(_signer)
            setLoading(false)
            handleConnectWithMetamask()
          }
          // successToast(error.message)
        } catch (error: any) {
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
    [
      checkNetwork,
      handleConnectWithMetamask,
      errorToast,
      resetChainId,
      successToast
    ]
  )

  useEffect(() => {
    checkChain()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getWalletAccount = async () => {
      const walletAccounts = await provider?.listAccounts()
      if (walletAccounts) {
        setAddress(walletAccounts[0])
      } else {
        setAccounts(undefined)
      }
    }
    getWalletAccount()
  }, [provider])

  useEffect(() => {
    if (address === undefined) return
    if (provider === undefined) return
    const _signer = provider?.getSigner()
    setSigner(_signer)
  }, [address, provider])

  useEffect(() => {
    const checkHasMetamask: boolean = typeof window.ethereum !== "undefined"
    setHasMetamask(checkHasMetamask)
    return () => {
      setHasMetamask(false)
    }
  }, [])

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
        params: getParams() as any
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
    loading,
    switchNetwork,
    // checkNetwork/
    importNakaToken,
    setChainId,
    getNetwork,
    checkChain,
    statusWalletConnected: handleCheckingWallet(),
    onAddToken
  }
}

export default useCreateWeb3Provider
