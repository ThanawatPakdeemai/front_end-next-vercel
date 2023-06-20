import ShapeIcon from "@components/icons/ShapeIcon"
import Banners from "@components/molecules/Banners"
import HeadGames from "@components/molecules/HeadGames"
import SidebarGames from "@components/molecules/SidebarGames"
import Tagline from "@components/molecules/tagline/Tagline"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import React from "react"
import { useTranslation } from "react-i18next"

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
        icon={<ShapeIcon fill="#4E5057" />}
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
