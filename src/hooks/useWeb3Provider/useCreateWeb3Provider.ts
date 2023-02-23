import { useCallback, useEffect, useState } from "react"
import { Web3Provider } from "@ethersproject/providers"
import CONFIGS from "@configs/index"
import { WALLET_CONNECTOR_TYPES } from "@configs/walletConnect"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { BigNumber, providers } from "ethers"
import { ELocalKey } from "@interfaces/ILocal"
import useGlobal from "@hooks/useGlobal"

const useCreateWeb3Provider = () => {
  const [signer, setSigner] = useState<any>(undefined)
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [provider, setProvider] = useState<Web3Provider | undefined>(undefined)
  const [chainId, setChainId] = useState<string | undefined>(undefined)
  const [accounts, setAccounts] = useState<string[] | undefined>(undefined)
  const [hasMetamask, setHasMetamask] = useState<boolean>(false)
  const [currentGasPrice, setCurrentGasPrice] = useState<BigNumber>(
    BigNumber.from(0)
  )

  const [hasChangeAccountMetamask, setHasChangeAccountMetamask] =
    useState(false)

  const { getNetwork } = useGlobal()

  const resetChainId = async () => {
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
  }

  const chainIdIsSupported = () =>
    window.ethereum?.chainId === CONFIGS.CHAIN.CHAIN_ID_HEX ||
    window.ethereum?.chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB

  // const { onReset } = useProfileStore()
  const handleDisconnectWallet = useCallback(async () => {
    // onReset()
    // Helper.resetLocalStorage()
    setProvider(undefined)
    setAddress(undefined)
  }, [])

  const onSetAddress = (_address: string | undefined) => {
    setAddress(_address)
    useProfileStore.getState().onSetProfileAddress(_address)
  }

  const handleConnectWithMetamask = async () => {
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
    const walletAccounts = await _provider?.listAccounts()
    if (walletAccounts === undefined) setAccounts(undefined)
    if (walletAccounts) {
      onSetAddress(walletAccounts[0])
    }

    const _signer = _provider.getSigner()
    setSigner(_signer)

    // Subscribe to accounts change
    window.ethereum.on("accountsChanged", async () => {
      await handleDisconnectWallet()
      setHasChangeAccountMetamask(true)
    })

    // Subscribe to chainId change
    window.ethereum.on("chainChanged", (_chainId: string) => {
      if (_chainId === undefined) {
        setChainId(undefined)
        return
      }
      setChainId(_chainId)
      handleDisconnectWallet()
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
  }

  const handleSignMessage = useCallback(
    async (
      _provider: Web3Provider,
      _address: string,
      _message: string
    ): Promise<string> => _provider.getSigner(_address).signMessage(_message),
    []
  )

  const switchNetwork = async (_chainId: string) => {
    const _provider = window.ethereum
    if (_provider === undefined || _provider.request === undefined) {
      return
    }
    if (_provider && _provider.request) {
      try {
        await _provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: _chainId }] // [handleNetworkSettings(_chainId)]
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
  }

  /**
   * @description Check if current chain matches with the one we need
   * @returns
   */
  const checkNetwork = async () => {
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
        switchNetwork(currentChainId)
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
  }

  const checkChain = useCallback(async () => {
    if (!chainIdIsSupported()) {
      resetChainId()
    } else {
      checkNetwork()
    }
    if (window.ethereum === undefined) {
      return
    }

    const walletConnector = Helper.getLocalStorage(ELocalKey.walletConnector)
    if (walletConnector === WALLET_CONNECTOR_TYPES.injected) {
      const account = await Helper.getWalletAccount()
      const _provider = new providers.Web3Provider(window.ethereum)
      if (_provider) {
        const _signer = _provider.getSigner()
        const _currentGasPrice = await _provider.getGasPrice()
        setSigner(_signer)
        setProvider(_provider)
        setCurrentGasPrice(_currentGasPrice)
      }
      setAccounts(account)
      onSetAddress(account[0])

      window.ethereum.on("accountsChanged", async () => {
        await handleDisconnectWallet()
        await setHasChangeAccountMetamask(true)
      })

      // Subscribe to chainId change
      window.ethereum.on("chainChanged", (_chainId: string) => {
        if (_chainId === undefined) {
          setChainId(undefined)
          return
        }
        setChainId(_chainId)
        handleDisconnectWallet()
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
  }, [handleDisconnectWallet])

  useEffect(() => {
    checkChain()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])

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
    currentGasPrice
  }
}

export default useCreateWeb3Provider
