/* eslint-disable no-unused-vars */

declare namespace NodeJS {
  interface Process {
    /**
     * @deprecated Use `typeof window` instead
     */
    readonly browser: boolean
  }

  interface ProcessEnv {
    readonly NEXT_PUBLIC_MODE: "development" | "uat" | "production"
    readonly NEXT_PUBLIC_DISPLAY_MOBILE_MODE: string
    readonly NEXT_PUBLIC_APP_NAME: string
    readonly NEXT_PUBLIC_API_URL: string
    readonly NEXT_PUBLIC_GAME_URL: string
    readonly NEXT_PUBLIC_FRONTEND_URL: string
    readonly NEXT_PUBLIC_METAMASK_APP: string
    readonly NEXT_PUBLIC_SUPPORT: string
    readonly NEXT_PUBLIC_KEYTEXT: string
    readonly NEXT_PUBLIC_MARKETPLACE: string
    readonly NEXT_PUBLIC_MARKETPLACE_LEGACY: string
    readonly NEXT_PUBLIC_NAKAVERSE: string
    readonly NEXT_PUBLIC_NAKA_CONTRACT: string
    readonly NEXT_PUBLIC_KEY_RECAPTCHA: string
    readonly NEXT_PUBLIC_POLYGON_SCAN: string
    readonly NEXT_PUBLIC_POLYGON_RPC_URL: string
    readonly NEXT_PUBLIC_TOKEN_NAME: string
    readonly NEXT_PUBLIC_TOKEN_SYMBOL: string
    readonly NEXT_PUBLIC_TOKEN_NAME_BUSD: string
    readonly NEXT_PUBLIC_TOKEN_SYMBOL_BNB: string
    readonly NEXT_PUBLIC_CHAIN_ID: string
    readonly NEXT_PUBLIC_CHAIN_ID_HEX: string
    readonly NEXT_PUBLIC_CHAIN_NAME: string
    readonly NEXT_PUBLIC_BNB_CHAIN_ID: string
    readonly NEXT_PUBLIC_BNB_CHAIN_NAME: string
    readonly NEXT_PUBLIC_BNB_RPC_URL: string
    readonly NEXT_PUBLIC_BNB_SCAN: string
    readonly NEXT_PUBLIC_CONTRACT_ERC20: string
    readonly NEXT_PUBLIC_OWNER: string
    readonly NEXT_PUBLIC_CONTRACT_BALANCE_VAULT: string
    readonly NEXT_PUBLIC_CONTRACT_BALANCE_VAULT_BINANCE: string
    readonly NEXT_PUBLIC_CONTRACT_ITEM_VAULT: string
    readonly NEXT_PUBLIC_CONTRACT_SHOP: string
    readonly NEXT_PUBLIC_CONTRACT_MATERIAL_VAULT: string
    readonly NEXT_PUBLIC_CONTRACT_MARKETPLACE: string
    readonly NEXT_PUBLIC_CONTRACT_MARKETPLACE_MATERIAL: string
    readonly NEXT_PUBLIC_CONTRACT_MARKETPLACE_NFT: string
    readonly NEXT_PUBLIC_CONTRACT_MARKETPLACE_NFT_INSTALLMENT: string
    readonly NEXT_PUBLIC_CONTRACT_MARKETPLACE_NFT_RENTAL: string
    readonly NEXT_PUBLIC_CONTRACT_NFT_LAND: string
    readonly NEXT_PUBLIC_CONTRACT_NFT_BUILDING: string
    readonly NEXT_PUBLIC_CONTRACT_NFT_NAKAPUNK: string
    readonly NEXT_PUBLIC_CONTRACT_NFT_ARCADEGAME: string
    readonly NEXT_PUBLIC_CONTRACT_GETLANDSOFADDRESS: string
    readonly NEXT_PUBLIC_CONTRACT_GETGAMEITEMADDRESS: string
    readonly NEXT_PUBLIC_CONTRACT_STAKING_30DAY: string
    readonly NEXT_PUBLIC_CONTRACT_STAKING_60DAY: string
    readonly NEXT_PUBLIC_CONTRACT_STAKING_90DAY: string
    readonly NEXT_PUBLIC_CONTRACT_STAKING_A_30DAY: string
    readonly NEXT_PUBLIC_CONTRACT_STAKING_A_60DAY: string
    readonly NEXT_PUBLIC_CONTRACT_STAKING_A_90DAY: string
    readonly NEXT_PUBLIC_CONTRACT_STAKING_FLEXIBLE_180DAY: string
    readonly NEXT_PUBLIC_CONTRACT_STAKING_FLEXIBLE_360DAY: string
    readonly NEXT_PUBLIC_CONTRACT_BEP20: string
    readonly NEXT_PUBLIC_CONTRACT_P2P_BINANCE: string
    readonly NEXT_PUBLIC_CONTRACT_P2P_POLYGON: string
    readonly NEXT_PUBLIC_CONTRACT_ESCAPE_URL: string
    readonly NEXT_PUBLIC_FIREBASE_APIKEY: string
    readonly NEXT_PUBLIC_FIREBASE_AUTHDOMAIN: string
    readonly NEXT_PUBLIC_FIREBASE_PROJECT_Id: string
    readonly NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string
    readonly NEXT_PUBLIC_FIREBASE_MESSAGING_SEND_ID: string
    readonly NEXT_PUBLIC_FIREBASE_APPID: string
    readonly NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string
    readonly NEXT_PUBLIC_ICON_NAKA: string
    readonly NEXT_PUBLIC_CONTRACT_REEF_PAY: string
    readonly NEXT_PUBLIC_GOOGLE_CLIENT_ID: string
    readonly NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string
    readonly NEXT_PUBLIC_DISCORD_CLIENT_ID: string
    readonly NEXT_PUBLIC_DISCORD_CLIENT_SECRET: string
    readonly NEXT_PUBLIC_NEXT_AUTH_SECRET: string
    readonly NEXT_PUBLIC_TWITTER_ID: string
    readonly NEXT_PUBLIC_TWITTER_SECRET: string
    readonly NEXT_PUBLIC_FACEBOOK_CLIENT_ID: string
    readonly NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET: string
    readonly NEXT_PUBLIC_NEXTAUTH_SECRET: string
    readonly NEXT_PUBLIC_NEXTAUTH_URL: string
  }
}

interface ethreumAdditionalMethods {
  on: (param1: string, fn: (param2: string[] & string) => void) => void
  selectedAddress?: string
  chainId?: string
}

declare interface Window {
  ethereum?: import("ethers").providers.ExternalProvider &
    ethreumAdditionalMethods
  TWidgetLogin: {
    auth: () => void
  }
  okxwallet: any
  BinanceChain: any
}

// declare module "*.svg" {
//   import React = require("react")

//   export const ReactComponent: React.FunctionComponent<
//     React.SVGProps<SVGSVGElement>
//   >
//   const src: string
//   export default src
// }

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
 *
 */
interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>
}
