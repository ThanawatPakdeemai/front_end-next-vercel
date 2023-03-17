import Banners from "@components/molecules/Banners"
import SidebarGames from "@components/molecules/SidebarGames"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import React from "react"

const TournamentLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto px-2 lg:px-0">
    <Header />
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
