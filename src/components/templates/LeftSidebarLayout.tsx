import SidebarGames from "@components/molecules/SidebarGames"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import React from "react"

const LeftSidebarLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto px-2 lg:px-0">
    <Header />
    <div className="flex flex-row gap-3">
      <SidebarGames />
      <article>{children}</article>
    </div>
    <Footer />
  </div>
)

export default LeftSidebarLayout
