import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

const MarketplaceLayoutFilterNoBanner = dynamic(
  () =>
    import("@components/templates/marketplace/MarketplaceLayoutFilterNoBanner"),
  {
    suspense: true,
    ssr: false
  }
)

const MarketplaceP2PCardList = dynamic(
  () => import("@feature/page/marketplace/MarketplaceP2PCardList"),
  {
    suspense: true,
    ssr: false
  }
)

const Game = () => <MarketplaceP2PCardList />

Game.getLayout = function getLayout(page: ReactElement) {
  return (
    <MarketplaceLayoutFilterNoBanner>{page}</MarketplaceLayoutFilterNoBanner>
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default Game
