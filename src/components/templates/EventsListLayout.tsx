import React from "react"
import Header from "@components/organisms/Header"
import Footer from "@components/organisms/Footer"
import SidebarGames from "@components/molecules/SidebarGames"

const EventLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto px-2 lg:px-0">
    <Header />
    <div className="flex-row gap-[30px] md:flex">
      <SidebarGames />
      {children}
    </div>
    <Footer />
  </div>
)

export default EventLayout
