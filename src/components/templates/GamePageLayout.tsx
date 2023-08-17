import React from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const Banners = dynamic(() => import("@components/molecules/Banners"), {
  suspense: true,
  ssr: false
})
const HeadGames = dynamic(() => import("@components/molecules/HeadGames"), {
  suspense: true,
  ssr: false
})
const SidebarGames = dynamic(
  () => import("@components/molecules/SidebarGames"),
  {
    suspense: true,
    ssr: false
  }
)
const Tagline = dynamic(() => import("@components/molecules/tagline/Tagline"), {
  suspense: true,
  ssr: false
})
const Footer = dynamic(() => import("@components/organisms/Footer"), {
  suspense: true,
  ssr: false
})
const Header = dynamic(() => import("@components/organisms/Header"), {
  suspense: true,
  ssr: false
})

const GamePageLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  const { t } = useTranslation()

  return (
    <div className="main-container mx-auto px-2 lg:px-0">
      <Header />
      <Tagline
        bgColor="bg-neutral-800"
        textColor="text-neutral-500 font-bold"
        text={String(t("christmas_gift"))}
        icon={<Icomoon className="icon-require" />}
        show={false}
      />
      <Banners />
      <div className="flex-row gap-3 md:flex">
        <SidebarGames />
        <HeadGames>{children}</HeadGames>
      </div>
      <Footer />
    </div>
  )
}

export default GamePageLayout
