import Banners from "@components/molecules/Banners"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import React from "react"
import Tagline from "@components/molecules/tagline/Tagline"
import ShapeIcon from "@components/icons/ShapeIcon"
import SidebarGames from "@components/molecules/SidebarGames"

const TournamentLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto px-2 lg:px-0">
    <Header />
    <Tagline
      bgColor="bg-neutral-800"
      textColor="text-neutral-500 font-bold"
      text="This Christmas, you’re the best gift I could ask for."
      icon={<ShapeIcon fill="#4E5057" />}
    />
    <Banners />
    {/* <div className="flex flex-row gap-3">{children}</div> */}
    <div className="flex-row gap-3 md:flex">
      <SidebarGames />
      {children}
    </div>
    <Footer />
  </div>
)

export default TournamentLayout
