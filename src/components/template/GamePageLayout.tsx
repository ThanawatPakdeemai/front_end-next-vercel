import ShapeIcon from "@components/icons/ShapeIcon"
import Banner from "@components/molecules/Banner"
import HeadGames from "@components/molecules/HeadGames"
import SidebarGames from "@components/molecules/SidebarGames"
import Tagline from "@components/molecules/tagline/Tagline"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import React from "react"

const GamePageLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto">
    <Header />
    <Tagline
      bgColor="bg-neutral-800"
      textColor="text-neutral-500 font-bold"
      text="This Christmas, you’re the best gift I could ask for."
      icon={<ShapeIcon fill="#4E5057" />}
    />
    <Banner />
    <div className="flex flex-row gap-3">
      <SidebarGames />
      <HeadGames>{children}</HeadGames>
    </div>
    <Footer />
  </div>
)

export default GamePageLayout
