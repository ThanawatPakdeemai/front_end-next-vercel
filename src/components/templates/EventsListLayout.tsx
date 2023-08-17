import React from "react"
import dynamic from "next/dynamic"

const Header = dynamic(() => import("@components/organisms/Header"), {
  suspense: true,
  ssr: false
})
const Footer = dynamic(() => import("@components/organisms/Footer"), {
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
