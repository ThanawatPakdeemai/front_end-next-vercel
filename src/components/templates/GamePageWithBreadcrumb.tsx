import Breadcrumb from "@components/molecules/Breadcrumb"
import SidebarGames from "@components/molecules/SidebarGames"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { ICrumb } from "@interfaces/IMenu"
import React from "react"

interface IProp
  extends React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">> {
  _breadcrumb?: ICrumb[]
}

const GamePageWithBreadcrumb = ({ children }: IProp) => (
  <div className="main-container mx-auto px-2 lg:px-0">
    <Header />
    <div className="mb-10 flex">
      <Breadcrumb />
    </div>
    <div className="flex flex-row gap-3">
      <SidebarGames />
      {children}
    </div>
    <Footer />
  </div>
)

export default GamePageWithBreadcrumb
