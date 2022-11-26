import Config from "."

// Base setting value and default value
export const DEFAULT_VALUE = {
  limit: 10,
  chain_id: Config.CHAIN_ID,
  chain_name: Config.CHAIN_NAME
}

// Base site information
export const siteInfo = {
  title: "NAKAMOTO",
  description: "Secure, simple, enjoy and earn $NAKA!"
}

// Base URL website
export const BASE_URL = {
  api: Config.API_URL,
  game: Config.GAME_URL,
  baseSite: Config.FRONTEND_URL,
  support: Config.SUPPORT,
  marketplace: Config.MARKETPLACE,
  nakaverse: Config.NAKAVERSE
}

// Base address on Smart Contract ex.0x0000000...
export const CONTRACT_ADDRESS = {
  owner: Config.OWNER,
  vault: Config.CONTRACT_BALANCE_VAULT,
  shop: Config.CONTRACT_SHOP,
  staking: `${Config.CONTRACT_STAKING_30DAY},${Config.CONTRACT_STAKING_60DAY},${Config.CONTRACT_STAKING_90DAY}`,
  stakingA: `${Config.CONTRACT_STAKING_A_30DAY},${Config.CONTRACT_STAKING_A_60DAY},${Config.CONTRACT_STAKING_A_90DAY}`,
  stakingFlexible: `${Config.CONTRACT_STAKING_FLEXIBLE_180DAY}`,
  stakingFlexibleA: `${Config.CONTRACT_STAKING_FLEXIBLE_360DAY}`,
  itemVault: Config.CONTRACT_ITEM_VAULT
    ? Config.CONTRACT_ITEM_VAULT
    : Config.CONTRACT_ITEM_VAULT,
  erc20: Config.CONTRACT_ERC20 ? Config.CONTRACT_ERC20 : "",
  bep20: Config.CONTRACT_BEP20 ? Config.CONTRACT_BEP20 : "",
  p2pBinance: Config.CONTRACT_P2P_BINANCE ? Config.CONTRACT_P2P_BINANCE : "",
  p2pPolygon: Config.CONTRACT_P2P_POLYGON ? Config.CONTRACT_P2P_POLYGON : ""
}

// Setting slick player ranking
export const SETTING_RANKING = {
  dots: false,
  arrows: false,
  className: "center",
  infinite: false,
  centerPadding: "60px",
  variableWidth: true,
  slidesToShow: 6,
  slidesToScroll: 5,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1420,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 1220,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 889,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 715,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 359,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0",
        variableWidth: true
      }
    }
  ]
}

export const CHAIN_ID_CONFIG = {
  binance: parseInt(Config.BNB_CHAIN_ID, 10),
  polygon: parseInt(Config.CHAIN_ID, 10)
}

export const PROVIDER_CONFIG = {
  binance: [
    {
      chainId: `0x${CHAIN_ID_CONFIG.binance.toString(16)}`,
      chainName: Config.BNB_CHAIN_NAME,
      rpcUrls: [`${Config.BNB_RPC_URL}`],
      blockExplorerUrls: [`${Config.BNB_SCAN}/`],
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18
      }
    }
  ],
  polygon: [
    {
      chainId: `0x${CHAIN_ID_CONFIG.polygon.toString(16)}`,
      chainName: Config.CHAIN_NAME,
      rpcUrls: [Config.POLYGON_RPC_URL],
      blockExplorerUrls: [`${Config.POLYGON_SCAN}/`],
      nativeCurrency: {
        name: "NAKA",
        symbol: "MATIC",
        decimals: 18
      }
    }
  ]
}
