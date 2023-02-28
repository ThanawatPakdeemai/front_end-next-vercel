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
import Helper from "@utils/helper"
import { BigNumber, providers, utils } from "ethers"
import { ELocalKey } from "@interfaces/ILocal"
import useChainSupport from "@stores/chainSupport"

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

  /**
   * @description Handle network setting for metamask
   * @param _chainId
   * @returns
   */
  const getNetwork = useCallback((_chainId: string) => {
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
  }, [])

  const resetChainId = useCallback(async () => {
    const _provider = window.ethereum
    if (_provider === undefined || _provider.request === undefined) {
      return
    }
    if (_provider && _provider.request) {
      try {
        await _provider.request({
          method: "wallet_addEthereumChain",
          params: [getNetwork(CONFIGS.CHAIN.CHAIN_ID_HEX)]
        })

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
    } else {
      return {
        responseStatus: false,
        errorMsg:
          "Can't setup the MATIC network on metamask because window.ethereum is undefined",
        type: "failed"
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const chainIdIsSupported = () =>
    window.ethereum?.chainId === CONFIGS.CHAIN.CHAIN_ID_HEX ||
    window.ethereum?.chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB

  // const { onReset } = useProfileStore()
  const handleDisconnectWallet = useCallback(async () => {
    // onReset()
    // Helper.resetLocalStorage()
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

  const handleConnectWithMetamask = useCallback(async () => {
    if (window.ethereum === undefined) return
    if (!chainIdIsSupported()) {
      resetChainId()
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
        resetChainId()
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
  }, [])

  const handleSignMessage = useCallback(
    async (
      _provider: Web3Provider,
      _address: string,
      _message: string
    ): Promise<string> => _provider.getSigner(_address).signMessage(_message),
    []
  )

  const switchNetwork = useCallback(async (_chainId: string) => {
    const _provider = window.ethereum
    if (_provider === undefined || _provider.request === undefined) {
      return
    }
    if (_provider && _provider.request) {
      try {
        setLoading(true)
        await _provider
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: _chainId }] // [handleNetworkSettings(_chainId)]
          })
          .then(() => {
            // handleConnectWithMetamask()
            checkNetwork()
            setChainId(_chainId)
            setLoading(false)
          })
          .catch(() => {
            setLoading(false)
          })

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkChain = useCallback(async () => {
    if (!chainIdIsSupported()) {
      resetChainId()
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
        const _balance = await _provider.getBalance(account[0])
        const _feeData = await _provider.getFeeData()
        const _gasPriceInGwei = utils.formatUnits(_gasPrice, "gwei")

        setSigner(_signer)
        setBestGasPrice(_gasPriceInGwei)
        setNetwork(_network)
        setBalance(_balance)
        setFeeData(_feeData)
      }
      setAccounts(account)
      onSetAddress(account[0])

      window.ethereum.on("accountsChanged", async () => {
        // await handleDisconnectWallet()
        await setHasChangeAccountMetamask(true)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  // useEffect(() => {
  // }, [provider])

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
    setChainId,
    getNetwork,
    checkChain
  }
}

export default useCreateWeb3Provider
