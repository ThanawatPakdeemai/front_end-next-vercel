/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import { useCallback, useEffect, useState } from "react"
import {
  FeeData,
  JsonRpcProvider,
  JsonRpcSigner,
  Network,
  Web3Provider
} from "@ethersproject/providers"
import CONFIGS from "@configs/index"
import { WALLET_CONNECTOR_TYPES } from "@configs/walletConnect"
import useProfileStore from "@stores/profileStore"
import { BigNumber, ethers, providers, utils } from "ethers"
import { ELocalKey } from "@interfaces/ILocal"
import Helper from "@utils/helper"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { IErrorMessage } from "@interfaces/IErrorMessage"
import { DEFAULT_STATUS_WALLET } from "@constants/defaultValues"
import useChainSupportStore from "@stores/chainSupport"
import useProfileController from "@feature/profile/containers/hook/useProfileController"
import useGlobal from "@hooks/useGlobal"
import Web3 from "web3"

const useCreateWeb3Provider = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined)
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [provider, setProvider] = useState<
    Web3Provider | JsonRpcProvider | undefined
  >(undefined)
  const [chainId, setChainId] = useState<string | undefined>(undefined)
  const [hasMetamask, setHasMetamask] = useState<boolean>(false)
  const [network, setNetwork] = useState<Network>({} as Network)
  const [balanceETH, setBalance] = useState<BigNumber>(BigNumber.from(0))
  const [bestGasPrice, setBestGasPrice] = useState<string>("")
  const [feeData, setFeeData] = useState<FeeData>({} as FeeData)
  const [disabledConnectButton, setDisabledConnectButton] =
    useState<boolean>(false)
  const [hasChangeAccountMetamask, setHasChangeAccountMetamask] =
    useState(false)
  const [statusWalletConnected, setStatusWalletConnected] =
    useState<IErrorMessage>(DEFAULT_STATUS_WALLET)
  const web3 = new Web3(Web3.givenProvider)

  const { fetchChainData } = useGlobal()

  const profile = useProfileStore((state) => state.profile.data)
  const { isLogin } = useProfileStore()
  const {
    setChainSupport,
    setCurrentChainConnected,
    setCurrentTokenSelected,
    setContractBNB,
    chainSupport,
    isCorrectWallet,
    setIsCorrectWallet,
    currentChainSelected
  } = useChainSupportStore()
  const { successToast, errorToast } = useToast()
  const { onUpdateWallet } = useProfileController()
  let count: boolean = true

  /**
   * @description Disconnect wallet
   */
  const handleDisconnectWallet = useCallback(async () => {
    setProvider(undefined)
    setAddress(undefined)
    // setAccounts(undefined)
    setChainId(undefined)
    setNetwork({} as Network)
    setChainSupport([])
    setCurrentTokenSelected(null)
    setContractBNB(null)
    setStatusWalletConnected(DEFAULT_STATUS_WALLET)
  }, [setChainSupport, setCurrentTokenSelected, setContractBNB])

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
      }
      // NOTE: Not necessary to show a response when error
      /* else {
        errorToast(MESSAGES["error-something"])
      } */
    } catch (error: any) {
      // NOTE: Not necessary to show a response when error
      // User rejected the request
      // if (error.code === 4001) errorToast(error.message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorToast, successToast])

  const onWalletLocked = useCallback(() => {
    // NOTE: Not necessary to show a response when error
    // errorToast(`${MESSAGES.wallet_is_locked}`)
    setStatusWalletConnected({
      responseStatus: false,
      errorMsg: `${MESSAGES.wallet_is_locked}`,
      type: "error"
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * @description Check if current account matches with the one we need
   * @param accounts
   * @returns {void}
   */
  const handleAccountsChanged = useCallback(
    async (_accounts: string[]): Promise<void> => {
      if (_accounts && _accounts.length === 0) {
        setDisabledConnectButton(false)
        onWalletLocked()
        return
      }

      if (
        profile &&
        profile.address &&
        profile.address !== "" &&
        profile.address.toLocaleLowerCase() === _accounts[0].toLocaleLowerCase()
      ) {
        setAddress(_accounts[0])
        setStatusWalletConnected({
          responseStatus: true,
          errorMsg: `${_accounts[0]} ${MESSAGES.wallet_is_correct}`,
          type: "success"
        })
        await fetchChainData()
        successToast("Connected to your Wallet")
        if (!isLogin) return
        if (isCorrectWallet) return
        setIsCorrectWallet(true)
        // Hide success popup
        // successToast(`${_accounts[0]} ${MESSAGES.wallet_is_correct}`)
      } else {
        if (count === true) {
          errorToast("Please change your wallet or try to connect again")
          // eslint-disable-next-line react-hooks/exhaustive-deps
          count = false
        }
        setAddress(undefined)
        setStatusWalletConnected({
          responseStatus: false,
          errorMsg: `${_accounts[0]} ${MESSAGES.wallet_is_incorrect}`,
          type: "error"
        })
        setIsCorrectWallet(false)
        // NOTE: Not necessary to show a response when error
        // if (!isLogin) return
        // if (profile?.address === "" || !profile?.address) return
        // errorToast(`${_accounts[0]} ${MESSAGES.wallet_is_incorrect}`)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      profile,
      isLogin,
      isCorrectWallet,
      setIsCorrectWallet,
      successToast,
      address
    ]
  )

  const switchNetwork = useCallback(
    async (_chainId: string) => {
      handleDisconnectWallet()
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
          // await fetchChainData()
          const _resetProvider = new providers.Web3Provider(_provider)
          const _signer = _resetProvider.getSigner()
          if (_signer) {
            handleConnectWithMetamask()
            /* setTimeout(() => {
              // eslint-disable-next-line no-use-before-define
              window.location.reload()
            }, 1000) */
          }
        } catch (error: Error | any) {
          // This error code indicates that the chain has not been added to MetaMask
          // if it is not, then install it into the user MetaMask
          if (error.code === 4902) {
            try {
              await _provider.request({
                method: "wallet_addEthereumChain",
                params: [Helper.getNetwork(_chainId)]
              })
              setTimeout(() => {
                // eslint-disable-next-line no-use-before-define
                // handleConnectWithMetamask()
                window.location.reload()
              }, 1000)
            } catch (addError) {
              console.error(addError)
            }
          }
        }
      } else {
        // if no window.ethereum then MetaMask is not installed
        // NOTE: Not necessary to show a response when error
        // errorToast(MESSAGES.install_wallet)
        return {
          responseStatus: false,
          errorMsg: MESSAGES.install_wallet,
          type: "failed"
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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

  const chainIdIsSupported = (_chainIdHex: string) =>
    window.ethereum?.chainId === CONFIGS.CHAIN.CHAIN_ID_HEX ||
    window.ethereum?.chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB

  /**
   * @description Connect with metamask
   */
  const handleConnectWithMetamask2 = useCallback(async () => {
    setTimeout(() => {
      setDisabledConnectButton(false)
    }, 5000)

    if (window.ethereum === undefined) return

    // This code effect when user switch network on metamask
    if (window.ethereum.chainId === undefined) return
    if (!chainIdIsSupported(window.ethereum.chainId)) {
      // If not supported, reset chain id to default Polygon
      switchNetwork(CONFIGS.CHAIN.CHAIN_ID_HEX)
    }
    setCurrentChainConnected(window.ethereum?.chainId as string)

    Helper.setLocalStorage({
      key: ELocalKey.walletConnector,
      value: WALLET_CONNECTOR_TYPES.injected
    })

    const _provider = new providers.Web3Provider(window.ethereum)
    // const _provider = new ethers.providers.JsonRpcProvider(
    //   nodesRPCPolygon[random(0, nodesRPCPolygon.length - 1)]
    // )
    const walletAccounts = await _provider?.listAccounts()
    // if (walletAccounts === undefined) setAccounts(undefined)

    if (walletAccounts) {
      onSetAddress(walletAccounts[0])
      if (profile && profile.email) {
        if (!profile.address || profile.address === "") {
          onUpdateWallet(profile, walletAccounts[0])
          // return
        }
      }
    }

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
      .then(async (_accounts) => {
        setProvider(_provider)
        onSetAddress(_accounts[0])
        // setAccounts(_accounts)

        if (handleAccountsChanged) {
          handleAccountsChanged(_accounts)
        }
      })
      .catch((err) => {
        // setAccounts(undefined)
        onSetAddress(undefined)
        // NOTE: Not necessary to show a response when error
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          // errorToast(`Error code: ${err.code}\n${MESSAGES.user_reject_request}`)
          console.error(
            `Error code: ${err.code}\n${MESSAGES.user_reject_request}`
          )
        } else {
          console.error(
            `Error code: ${err.code}\n${err.message}\n${MESSAGES.please_connect_metamask}`
          )
          // errorToast(
          //   `Error code: ${err.code}\n${err.message}\n${MESSAGES.please_connect_metamask}`)
        }
      })

    // Subscribe to session disconnection
    if (window.ethereum && window.ethereum.on) {
      window.ethereum.on("disconnect", (/* code: number, reason: string */) => {
        handleDisconnectWallet()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    onSetAddress,
    profile,
    onUpdateWallet,
    errorToast,
    handleAccountsChanged,
    chainIdIsSupported
  ])

  const handleConnectWithMetamask = useCallback(
    async (_connector?: "metamask" | "okx" | "binance") => {
      const _getLocalConnector = Helper.getLocalStorage(
        ELocalKey.walletConnector
      ) as "metamask" | "okx" | "binance"
      const _inject = _connector || _getLocalConnector || "metamask"
      setTimeout(() => {
        setDisabledConnectButton(false)
      }, 5000)
      if (window.ethereum === undefined) return

      // This code effect when user switch network on metamask
      if (window.ethereum.chainId === undefined) return
      if (!chainIdIsSupported(window.ethereum.chainId)) {
        // If not supported, reset chain id to default Polygon
        switchNetwork(CONFIGS.CHAIN.CHAIN_ID_HEX)
      }
      setCurrentChainConnected(window.ethereum?.chainId as string)

      Helper.setLocalStorage({
        key: ELocalKey.walletConnector,
        value: _inject
      })
      let _provider
      let _address: string | undefined
      switch (_inject) {
        case "metamask": {
          // _provider = new providers.Web3Provider(window.ethereum)
          _provider = new providers.Web3Provider(window.ethereum)
          await web3?.givenProvider
            ?.request({
              method: "eth_requestAccounts"
            })
            .then((response: string[]) => {
              if (response.length > 0) {
                _address = response[0] as string
              }
            })
          break
        }
        case "okx": {
          _provider = new providers.Web3Provider(window.okxwallet)
          await window.okxwallet
            .send("eth_requestAccounts", [])
            .then((response) => {
              if (response.result.length > 0) {
                _address = response.result[0] as string
              }
            })
          break
        }
        case "binance": {
          _provider = new providers.Web3Provider(window.BinanceChain)
          await window.BinanceChain.send("eth_requestAccounts", []).then(
            (response: string[]) => {
              if (response.length > 0) {
                _address = response[0] as string
              }
            }
          )
          break
        }
        default:
          break
      }

      if (_address) {
        onSetAddress(_address)
        if (profile && profile.email) {
          if (!profile.address || profile.address === "") {
            onUpdateWallet(profile, _address)
          }
        }
      }
      if (profile?.address.toLowerCase() !== _address?.toLowerCase()) {
        // setisConnected(false)
        setStatusWalletConnected({
          responseStatus: false,
          errorMsg: `${_address} ${MESSAGES.wallet_is_incorrect}`,
          type: "error"
        })
      } else {
        // setisConnected(true)
        // await fetchChainData()
        setStatusWalletConnected({
          responseStatus: true,
          errorMsg: `${_address} ${MESSAGES.wallet_is_correct}`,
          type: "success"
        })
        if (_provider) {
          const _signer = _provider.getSigner()
          const _gasPrice = await _provider.getGasPrice()
          const _network = await _provider.getNetwork()
          const _gasPriceInGwei = utils.formatUnits(_gasPrice, "gwei")
          const _feeData = await _provider.getFeeData()
          if (_address) {
            const _balance = await _provider.getBalance(_address)
            setBalance(_balance)
            setAddress(_address)
          }
          setProvider(_provider)
          setSigner(_signer)
          setNetwork(_network)
          setBestGasPrice(_gasPriceInGwei)
          setFeeData(_feeData)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      setCurrentChainConnected,
      profile,
      switchNetwork,
      web3?.givenProvider,
      onSetAddress,
      onUpdateWallet
    ]
  )

  const handleSignMessage = useCallback(
    async (
      _provider: Web3Provider,
      _address: string,
      _message: string
    ): Promise<string> => _provider.getSigner(_address).signMessage(_message),
    []
  )

  // const [isConnected, setisConnected] = useState<boolean>(false)
  // const { connect } = useConnect({
  //   onSettled(data, err) {
  //     if (!window.ethereum) throw new Error("window not defined")
  //     if (!profile) throw new Error("Please login your id")
  //     if (!profile.address && data?.account) {
  //       // send to save
  //       onUpdateWallet(profile, data.account)
  //     }
  //     let _address: Address | undefined = walletAddrs || "0x"

  //     if (data?.account) _address = data.account
  //     // console.log("onConnectWallet getAcc", _address)
  //     // console.log("onConnectWallet data", data)
  //     // console.log("onConnectWallet err", err)
  //     if (profile.address.toLowerCase() === _address.toLowerCase()) {
  //       const _provider = new providers.Web3Provider(window.ethereum)
  //       const _signer = _provider.getSigner()
  //       setAddress(_address)
  //       setProvider(_provider)
  //       setSigner(_signer)
  //       setisConnected(true)
  //       setChainId(window.ethereum?.chainId)
  //       // console.log("web3connect chian", window.ethereum?.chainId)

  //       // setStatusWalletConnected({
  //       //   responseStatus: true,
  //       //   errorMsg: `${walletAddrs} ${MESSAGES.wallet_is_correct}`,
  //       //   type: "success"
  //       // })
  //     } else {
  //       // console.log("web3connect fail")
  //       setisConnected(false)
  //       // setStatusWalletConnected({
  //       //   responseStatus: false,
  //       //   errorMsg: `${walletAddrs} ${MESSAGES.wallet_is_incorrect}`,
  //       //   type: "error"
  //       // })
  //     }
  //     if (err) {
  //       console.error(err)
  //       throw new Error(err.message)
  //     }
  //   }
  // })
  // const { disconnect } = useDisconnect()
  const onConnectWallet = useCallback(
    // async (_connect: Connector<any, any>) => {
    //   await fetchAllTokenSupported()
    //   await fetchNAKAToken()
    // },
    // [fetchAllTokenSupported, fetchNAKAToken]
    async () => {
      await fetchChainData()
    },
    [fetchChainData]
  )

  const onInitProvider = useCallback(() => {
    const _provider = new providers.JsonRpcProvider(
      CONFIGS.CHAIN.POLYGON_RPC_URL
    )
    setProvider(_provider)
  }, [])

  const onDisconnectWallet = useCallback(() => {
    // disconnect()
    setAddress(undefined)
    // setProvider(undefined)
    setSigner(undefined)
    setChainId(undefined)
    onInitProvider()
    // setisConnected(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** ******************************************************* */
  /* Handle chain (network) and chainChanged (per EIP-1193) */
  /** ******************************************************* */

  useEffect(() => {
    let load = false
    if (!load) {
      // checkNetwork()
      if (window.ethereum === undefined) return
      window.ethereum.on("chainChanged", switchNetwork)
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isLogin) return
    let load = false
    if (!load) {
      const walletConnector = Helper.getLocalStorage(
        ELocalKey.walletConnector
      ) as "metamask" | "okx" | "binance"
      handleConnectWithMetamask(walletConnector).then(() => {
        setCurrentChainConnected(window.ethereum?.chainId ?? "")
      })
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChainSelected])

  // useEffect(() => {
  //   let load = false

  //   if (!load) {
  //     const getWalletAccount = async () => {
  //       console.log("provider")
  //       const walletAccounts = await provider?.listAccounts()
  //       if (walletAccounts) {
  //         setAddress(walletAccounts[0])
  //       }
  //     }
  //     getWalletAccount()
  //   }

  //   return () => {
  //     load = true
  //   }
  // }, [provider])

  // useEffect(() => {
  //   let load = false
  //   if (!load) {
  //     if (provider === undefined) return
  //     const _signer = provider.getSigner()
  //     setSigner(_signer)
  //   }
  //   return () => {
  //     load = true
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   const load = false

  //   if (!load) {
  //     const checkHasMetamask: boolean = typeof window.ethereum !== "undefined"
  //     setHasMetamask(checkHasMetamask)
  //   }

  //   return () => {
  //     setHasMetamask(false)
  //   }
  // }, [])

  // Subscribe to accounts change
  useEffect(() => {
    let load = false

    if (!load) {
      const _provider = window.ethereum as any
      if (_provider !== undefined) {
        _provider.on("accountsChanged", handleAccountsChanged)
        return () => {
          _provider.removeListener("accountsChanged", handleAccountsChanged)
        }
      }
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let load = false
    if (!load) {
      onInitProvider()
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let load = false
    const getFetchChain = async () => {
      await fetchChainData()
    }
    if (!load && provider && signer && address) {
      getFetchChain()
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, currentChainSelected, provider, signer])

  return {
    // accounts,
    address,
    chainId,
    provider,
    handleConnectWithMetamask,
    handleSignMessage,
    setHasChangeAccountMetamask,
    hasChangeAccountMetamask,
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
    isConnected:
      statusWalletConnected &&
      statusWalletConnected.responseStatus &&
      chainSupport &&
      chainSupport.length > 0,
    // isWrongNetwork,
    onAddToken,
    disabledConnectButton,
    setDisabledConnectButton,
    onConnectWallet,
    // isConnected,
    onDisconnectWallet,
    handleConnectWithMetamask2
  }
}

export default useCreateWeb3Provider
