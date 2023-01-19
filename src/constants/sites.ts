import { BSC, BSCTestnet, BUSD, Mumbai, Polygon, TestBUSD } from "@usedapp/core"
import { CHAIN_ID, CHAIN_NAME, MATIC_ICON } from "./wallets"

// Base setting value and default value
export const defaultvalue = {
  limit: 10,
  chain_id: process.env.NEXT_PUBLIC_CHAIN_ID,
  chain_name: process.env.NEXT_PUBLIC_CHAIN_NAME
}

// Base site information
export const siteInfo = {
  title: "NAKAMOTO",
  description: "Secure, simple, enjoy and earn $NAKA!",
  contract: "0x311434160D7537be358930def317AfB606C0D737",
  privateKey: process.env.NEXT_PUBLIC_KEYTEXT
}

// Base URL website
export const baseUrl = {
  api: process.env.NEXT_PUBLIC_API_URL,
  game: process.env.NEXT_PUBLIC_GAME_URL,
  baseSite: process.env.NEXT_PUBLIC_FRONTEND_URL,
  support: process.env.NEXT_PUBLIC_SUPPORT,
  marketplace: process.env.NEXT_PUBLIC_MARKETPLACE,
  nakaverse: process.env.NEXT_PUBLIC_NAKAVERSE,
  mumbai: process.env.NEXT_PUBLIC_MUMBAI_URL,
  polygon: process.env.NEXT_PUBLIC_POLYGON_SCAN,
  rpc: process.env.NEXT_PUBLIC_POLYGON_RPC_URL,
  redeem: process.env.NEXT_PUBLIC_REDEEM_URL
}

// Base address on Smart Contract ex.0x0000000...
export const baseContractAddress = {
  nakaWallet: process.env.NEXT_PUBLIC_NAKA_WALLET,
  owner: process.env.NEXT_PUBLIC_OWNER,
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  vault: process.env.NEXT_PUBLIC_CONTRACT_BALANCE_VAULT,
  shop: process.env.NEXT_PUBLIC_CONTRACT_SHOP,
  staking: `${process.env.NEXT_PUBLIC_CONTRACT_STAKING_30DAY},${process.env.NEXT_PUBLIC_CONTRACT_STAKING_60DAY},${process.env.NEXT_PUBLIC_CONTRACT_STAKING_90DAY}`,
  stakingA: `${process.env.NEXT_PUBLIC_CONTRACT_STAKING_A_30DAY},${process.env.NEXT_PUBLIC_CONTRACT_STAKING_A_60DAY},${process.env.NEXT_PUBLIC_CONTRACT_STAKING_A_90DAY}`,

  stakingFlexible: `${process.env.NEXT_PUBLIC_CONTRACT_STAKING_FLEXIBLE_180DAY}`,
  stakingFlexibleA: `${process.env.NEXT_PUBLIC_CONTRACT_STAKING_FLEXIBLE_360DAY}`,

  itemVault: process.env.NEXT_PUBLIC_CONTRACT_ITEM_VAULT
    ? process.env.NEXT_PUBLIC_CONTRACT_ITEM_VAULT
    : process.env.NEXT_PUBLIC_CONTRACT_ITEM_VAULT,
  erc20: process.env.NEXT_PUBLIC_CONTRACT_ERC20
    ? process.env.NEXT_PUBLIC_CONTRACT_ERC20
    : "",
  bep20: process.env.NEXT_PUBLIC_CONTRACT_BEP20
    ? process.env.NEXT_PUBLIC_CONTRACT_BEP20
    : "",

  p2pBinance: process.env.NEXT_PUBLIC_CONTRACT_P2P_BINANCE
    ? process.env.NEXT_PUBLIC_CONTRACT_P2P_BINANCE
    : "",
  p2pPolygon: process.env.NEXT_PUBLIC_CONTRACT_P2P_POLYGON
    ? process.env.NEXT_PUBLIC_CONTRACT_P2P_POLYGON
    : ""
}

// Setting slick player ranking
export const settingRanking = {
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

export const providerConfig = {
  binance: [
    {
      chainId: `0x${chainIdConfig.binance.toString(16)}`,
      chainName:
        process.env.NEXT_PUBLIC_MODE === "development"
          ? TestBUSD.name
          : BUSD.name,
      rpcUrls: [
        `${
          process.env.NEXT_PUBLIC_MODE === "development"
            ? "https://data-seed-prebsc-1-s1.binance.org:8545"
            : "https://bsc-dataseed.binance.org/"
        }`
      ],
      blockExplorerUrls: [
        `${
          process.env.NEXT_PUBLIC_MODE === "development"
            ? "https://testnet.bscscan.com"
            : "https://bscscan.com"
        }`
      ],
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18
      }
    }
  ],
  polygon: [
    {
      chainId: `0x${chainIdConfig.polygon.toString(16)}`,
      chainName:
        process.env.NEXT_PUBLIC_MODE === "development"
          ? Mumbai.chainName
          : Polygon.chainName,
      rpcUrls: [baseUrl.rpc],
      blockExplorerUrls: [`${baseUrl.polygon}/`],
      nativeCurrency: {
        name: "NAKA",
        symbol: "MATIC",
        decimals: 18
      }
    }
  ]
}
