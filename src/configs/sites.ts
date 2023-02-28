import CONFIGS from "@configs/index"
import { BUSD, Mumbai, Polygon, TestBUSD } from "@usedapp/core"

// Base setting value and default value
export const DEFAULT_VALUE = {
  limit: 10
}

// Base site information
export const siteInfo = {
  title: "NAKAMOTO",
  description: "Secure, simple, enjoy and earn $NAKA!",
  contract: "0x311434160D7537be358930def317AfB606C0D737"
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
  binance: parseInt(CONFIGS.CHAIN.BNB_CHAIN_ID, 10),
  polygon: parseInt(CONFIGS.CHAIN.CHAIN_ID, 10)
}

export const PROVIDER_CONFIG = {
  binance: [
    {
      chainId: `0x${CHAIN_ID_CONFIG.binance.toString(16)}`,
      chainName: CONFIGS.CHAIN.BNB_CHAIN_NAME,
      rpcUrls: [`${CONFIGS.CHAIN.BNB_RPC_URL}`],
      blockExplorerUrls: [`${CONFIGS.CHAIN.BNB_SCAN}/`],
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
      chainName: CONFIGS.CHAIN.CHAIN_NAME,
      rpcUrls: [CONFIGS.CHAIN.POLYGON_RPC_URL],
      blockExplorerUrls: [`${CONFIGS.CHAIN.POLYGON_SCAN}/`],
      nativeCurrency: {
        name: "NAKA",
        symbol: "MATIC",
        decimals: 18
      }
    }
  ]
}

// polygonscan url
export const baseExplorer: string =
  process.env.NEXT_PUBLIC_MODE === "production"
    ? "https://polygonscan.com"
    : "https://mumbai.polygonscan.com"

// Base setting value and default value
export const defaultvalue = {
  limit: 10,
  chain_id: process.env.NEXT_PUBLIC_CHAIN_ID,
  chain_name: process.env.NEXT_PUBLIC_CHAIN_NAME
}

export const chainIdConfig = {
  binance:
    process.env.NEXT_PUBLIC_MODE === "development"
      ? TestBUSD.chainId
      : BUSD.chainId,
  polygon:
    process.env.NEXT_PUBLIC_MODE === "development"
      ? Mumbai.chainId
      : Polygon.chainId
}
