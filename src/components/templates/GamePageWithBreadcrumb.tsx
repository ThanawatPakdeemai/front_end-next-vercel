import React from "react"
import dynamic from "next/dynamic"
import { ICrumb } from "@interfaces/IMenu"

const Breadcrumb = dynamic(() => import("@components/molecules/Breadcrumb"))
const SidebarGames = dynamic(
  () => import("@components/molecules/SidebarGames"),
  {
    suspense: true,
    ssr: false
  }
)
const Footer = dynamic(() => import("@components/organisms/Footer"), {
  suspense: true,
  ssr: false
})
const Header = dynamic(() => import("@components/organisms/Header"), {
  suspense: true,
  ssr: false
})

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
    <div className="flex-row gap-[30px] md:flex md:justify-between">
      <SidebarGames />
      {children}
    </div>
    <Footer />
  </div>
)

export default GamePageWithBreadcrumb
