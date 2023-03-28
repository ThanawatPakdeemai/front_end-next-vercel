import { IProfile } from "@feature/profile/interfaces/IProfileService"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  IFilterGamesByKey,
  IGame,
  IGetType
} from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import CONFIGS from "@configs/index"
import useContractVaultBinance, {
  ITokenContract
} from "@feature/contract/containers/hooks/useContractVaultBinance"

import { Contract, ethers } from "ethers"
import BEP20Abi from "@configs/abi/BEP20.json"
import ERC20Abi from "@configs/abi/ERC20.json"
import useChainSupport from "@stores/chainSupport"
import useContractVault from "@feature/contract/containers/hooks/useContractVault"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import { DEFAULT_CURRENCY_BNB, DEFAULT_CURRENCY_NAKA } from "@configs/currency"
import useSwitchNetwork from "./useSwitchNetwork"

const useGlobal = (
  _limit?: number,
  _skip?: number,
  _sort?: string,
  _search?: string,
  _item?: string | string[],
  _device?: string,
  _gameType?: IGetType,
  _tournament?: boolean,
  _category?: string,
  _nftgame?: boolean
) => {
  const router = useRouter()

  const defaultBody: IFilterGamesByKey = {
    limit: _limit ?? 20,
    skip: _skip ?? 1,
    sort: _sort ?? "_id",
    search: _search ?? "",
    item: _item ?? "all",
    device: _device ?? "all",
    game_type: _gameType ?? "all",
    tournament: _tournament ?? false,
    category: _category ?? "all",
    nftgame: _nftgame ?? false
  }

  // hook
  const { onSetGameData, onSetGamePartnersData } = useGameStore()
  const { getAllTokenAddressInContract, getBNBContract } =
    useContractVaultBinance()
  const { getAllTokenInfoByContractAddress } = useContractVaultBinance()
  const { setChainSupport, setContractBNB } = useChainSupport()
  const { getNAKATokenInfo } = useContractVault()
  const { chainId, signer, accounts, statusWalletConnected } =
    useSwitchNetwork()

  const profile = useProfileStore((state) => state.profile.data)
  // States
  const [stateProfile, setStateProfile] = useState<IProfile | null>()
  const [hydrated, setHydrated] = useState(false)
  const [marketType, setMarketType] = useState<TNFTType>()

  /**
   * @description check if url is in marketplace
   */
  const isMarketplace = router.asPath.includes("marketplace")

  /**
   * @description check if url is in marketplace
   */
  const isDeveloperPage =
    router.asPath.includes("become-developer") ||
    router.asPath.includes("developer")

  /**
   * @description Set profile
   */
  useEffect(() => {
    let load = false

    if (!load) {
      setStateProfile(profile)
    }

    return () => {
      load = true
    }
  }, [profile])

  /**
   * @description Set hydrate to fix error "Text content does not match server-rendered HTML"
   */
  useEffect(() => {
    let load = false

    if (!load) {
      setHydrated(true)
    }

    return () => {
      load = true
    }
  }, [])

  /**
   * @description Global values for pagination
   */
  const [limit, setLimit] = useState<number>(24)
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const pager: number[] = [6, 12, 24, 48, 64]
  const handleLimit = (limitItem: number) => {
    setLimit(limitItem)
  }

  /**
   * @description Handle click on game card
   * @param _gameUrl - Game url to redirect
   * @param _gameData - Game data to set to store
   */
  const onHandleClick = async (
    _type: IGetType,
    _gameUrl: string,
    _gameData: IGame | IPartnerGameData
  ) => {
    switch (_type) {
      case "partner-publisher":
        onSetGamePartnersData(_gameData as IPartnerGameData)
        // await router.push(`/publishers/${_gameData.name}`)
        break

      case "partner-game":
        onSetGamePartnersData(_gameData as IPartnerGameData)
        // await router.push(`/partner-games/${_gameUrl}?id=${_gameData.id}`)
        break

      case "arcade-emporium":
        onSetGameData(_gameData as IGame)
        // await router.push(`/arcade-emporium/${_gameUrl}?id=${_gameData.id}`)
        break

      default:
        onSetGameData(_gameData as IGame)
        // await router.push(`/${_type}-games/${_gameUrl}`)
        break
    }
    // NOTE: No need this code
    // await router.push(`/${_gameUrl}`)
  }

  const onHandleSetGameStore = async (
    _type: IGetType,
    _gameData: IGame | IPartnerGameData
  ) => {
    switch (_type) {
      case "partner-publisher":
        onSetGamePartnersData(_gameData as IPartnerGameData)
        break

      case "partner-game":
        onSetGamePartnersData(_gameData as IPartnerGameData)
        break

      case "arcade-emporium":
        onSetGameData(_gameData as IGame)
        break

      default:
        onSetGameData(_gameData as IGame)
        break
    }
  }

  const onClickLink = async (
    _type: IGetType,
    _gameUrl: string,
    _gameData: IGame | IPartnerGameData
  ) => {
    switch (_type) {
      case "partner-publisher":
        return `/publishers/${_gameData.name}`

      case "partner-game":
        return `/partner-games/${_gameUrl}?id=${_gameData.id}`

      case "arcade-emporium":
        return `/arcade-emporium/${_gameUrl}?id=${_gameData.id}`

      default:
        ;`/${_type}-games/${_gameUrl}`
    }
    // NOTE: No need this code
    // await router.push(`/${_gameUrl}`)
  }

  const getTokenAddress = (_chainId: string) => {
    switch (_chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        return CONFIGS.CONTRACT_ADDRESS.BEP20

      default:
        return CONFIGS.CONTRACT_ADDRESS.ERC20
    }
  }

  /**
   * @description Get tokens amount
   * @param _chainId
   * @returns {string}
   */
  const getTokenSupply = (_chainId: string): string => {
    switch (_chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        return "31000000000000000000000000"

      default:
        return "179999996000000000000000008"
    }
    // NOTE: No need this code
    // await router.push(`/${_gameUrl}`)
  }

  /**
   * @description Fetch BNB token address from Smart Contract
   */
  const fetchContractBNB = useCallback(async () => {
    const result = await getBNBContract()
    if (result) {
      setContractBNB(result)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBNBContract])
  /**
   * @description Fetch BNB token address
   */
  useMemo(() => {
    if (!statusWalletConnected.responseStatus) return
    if (signer === undefined || accounts === undefined) return
    fetchContractBNB()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * @description Get all token supported
   */
  const fetchAllTokenSupported = useCallback(async () => {
    const allContract: Contract[] = []
    const allTokenSupported: ITokenContract[] = []
    const tokens = await getAllTokenAddressInContract()
    for (let index = 0; index < tokens.length; index += 1) {
      const { ethereum }: any = window
      const _web3 = new ethers.providers.Web3Provider(ethereum)
      const contract = new ethers.Contract(tokens[index], BEP20Abi.abi, _web3)
      allContract.push(contract)
      // if (tokens[index] !== CONFIGS.CONTRACT_ADDRESS.BNB_CONTRACT) {
      //   const contract = new ethers.Contract(tokens[index], BEP20Abi.abi, _web3)
      //   allContract.push(contract)
      // }
    }
    await Promise.all(
      allContract.map(async (contract) => {
        const result = await getAllTokenInfoByContractAddress(
          contract,
          contract.address,
          profile ? profile.address : ""
        )
        allTokenSupported.push(result)
      })
    )
    const allTokenSupportedSorted = allTokenSupported.sort((a, b) => {
      if (a.symbol < b.symbol) {
        return -1
      }
      if (a.symbol > b.symbol) {
        return 1
      }
      return 0
    })
    setChainSupport(allTokenSupportedSorted)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchNAKAToken = useCallback(async () => {
    const allContract: Contract[] = []
    const allTokenSupported: ITokenContract[] = []
    const tokens = [CONFIGS.CONTRACT_ADDRESS.ERC20]
    for (let index = 0; index < tokens.length; index += 1) {
      const { ethereum }: any = window
      const _web3 = new ethers.providers.Web3Provider(ethereum)
      const contract = new ethers.Contract(tokens[index], ERC20Abi, _web3)
      allContract.push(contract)
    }
    await Promise.all(
      allContract.map(async (contract) => {
        const result = await getNAKATokenInfo(
          contract,
          contract.address,
          profile ? profile.address : ""
        )
        allTokenSupported.push(result)
      })
    )
    const allTokenSupportedSorted = allTokenSupported.sort((a, b) => {
      if (a.symbol < b.symbol) {
        return -1
      }
      if (a.symbol > b.symbol) {
        return 1
      }
      return 0
    })
    setChainSupport(allTokenSupportedSorted)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * @description Fetch all token supported
   */
  useEffect(() => {
    let load = false

    if (!load) {
      if (signer && accounts) {
        if (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB) {
          fetchAllTokenSupported()
        } else if (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX) {
          fetchNAKAToken()
        }
      } /* else {
      console.log("signer or accounts is undefined", signer, accounts, provider)
    } */
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, signer, fetchAllTokenSupported, fetchNAKAToken])

  /**
   * @description Get default currency
   * @returns {ITokenContract[]}
   */
  const getDefaultCoin = (): ITokenContract[] => {
    switch (chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        return DEFAULT_CURRENCY_BNB
      default:
        return DEFAULT_CURRENCY_NAKA
    }
  }

  /**
   * @description Open link in new tab
   * @param url {string}
   */
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer")
  }

  /**
   * @description Get type game path folder
   */
  const getTypeGamePathFolder = (_gameData: IGame): IGetType => {
    if (_gameData) {
      // if (_gameData.play_to_earn && _gameData.play_to_earn_status !== "free") {
      //   return "play-to-earn-games"
      // }
      if (_gameData.play_to_earn_status === "free") {
        return "free-to-play"
      }
      if (_gameData.game_type === "storymode") {
        return "story-mode"
      }
      if (_gameData.is_NFT) {
        return "arcade-emporium"
      }
    }
    return "play-to-earn-games"
  }

  const isRedirectRoomlist = (_game: IGame): "/roomlist" | "" => {
    if (_game.play_to_earn_status === "free") {
      return "/roomlist"
    }
    return ""
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (router.asPath.includes("land")) {
        setMarketType("nft_land")
      } else if (router.asPath.includes("building")) {
        setMarketType("nft_building")
      } else if (router.asPath.includes("naka-punk")) {
        setMarketType("nft_naka_punk")
      } else if (router.asPath.includes("material")) {
        setMarketType("nft_material")
      } else if (router.asPath.includes("game-item")) {
        setMarketType("game_item")
      } else if (router.asPath.includes("arcade-game")) {
        setMarketType("nft_game")
      }
    }

    return () => {
      load = true
    }
  }, [router.asPath])

  return {
    onHandleClick,
    onClickLink,
    limit,
    page,
    setPage,
    setLimit,
    totalCount,
    setTotalCount,
    handleLimit,
    stateProfile,
    hydrated,
    defaultBody,
    pager,
    getTokenAddress,
    getTokenSupply,
    fetchAllTokenSupported,
    fetchNAKAToken,
    getDefaultCoin,
    isMarketplace,
    isDeveloperPage,
    openInNewTab,
    getTypeGamePathFolder,
    marketType,
    isRedirectRoomlist,
    onHandleSetGameStore
  }
}

export default useGlobal
