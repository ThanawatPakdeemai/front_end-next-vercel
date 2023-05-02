import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import React, { ReactElement } from "react"

const MarketplaceLayoutWithoutFilter = dynamic(
  () =>
    import("@components/templates/marketplace/MarketplaceLayoutWithoutFilter"),
  {
    suspense: true,
    ssr: false
  }
)

const MarketplaceReefAvatar = dynamic(
  () => import("@feature/page/marketplace/MarketplaceReefAvatar"),
  {
    suspense: true,
    ssr: false
  }
)

const MarketReefAvatarPage = () => <MarketplaceReefAvatar />

MarketReefAvatarPage.getLayout = function getLayout(page: ReactElement) {
  return <MarketplaceLayoutWithoutFilter>{page}</MarketplaceLayoutWithoutFilter>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default MarketReefAvatarPage
