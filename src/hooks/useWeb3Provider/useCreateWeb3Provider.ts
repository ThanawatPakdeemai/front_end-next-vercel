import { useCallback, useEffect, useState } from "react"
import { Web3Provider } from "@ethersproject/providers"
import CONFIGS from "@configs/index"
import { WALLET_CONNECTOR_TYPES } from "@configs/walletConnect"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { providers } from "ethers"
import { ELocalKey } from "@interfaces/ILocal"

const useCreateWeb3Provider = () => {
  const [signer, setSigner] = useState<any>(undefined)
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [provider, setProvider] = useState<Web3Provider | undefined>(undefined)
  const [chainId, setChainId] = useState<string | undefined>(undefined)
  const [accounts, setAccounts] = useState<string[] | undefined>(undefined)
  const [hasMetamask, setHasMetamask] = useState<boolean>(false)

  const [hasChangeAccountMetamask, setHasChangeAccountMetamask] =
    useState(false)

  const resetChainId = async () => {
    const _provider = window.ethereum
    if (_provider === undefined || _provider.request === undefined) {
      return
    }
    if (_provider && _provider.request) {
      try {
        await _provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
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
          ]
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
    window.ethereum?.chainId === CONFIGS.CHAIN.CHAIN_ID_HEX

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

  const checkChain = useCallback(async () => {
    if (!chainIdIsSupported()) {
      resetChainId()
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
        setSigner(_signer)
        setProvider(_provider)
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
  }, [handleDisconnectWallet])

  useEffect(() => {
    checkChain()
  }, [chainId, checkChain])

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
    hasMetamask
  }
}

export default useCreateWeb3Provider
