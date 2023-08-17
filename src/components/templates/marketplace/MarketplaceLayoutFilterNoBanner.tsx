import React from "react"
import dynamic from "next/dynamic"

const Footer = dynamic(() => import("@components/organisms/Footer"), {
  suspense: true,
  ssr: false
})
const Header = dynamic(() => import("@components/organisms/Header"), {
  suspense: true,
  ssr: false
})
const FilterBox = dynamic(
  () => import("@feature/marketplace/components/molecules/FilterBox")
)
const MarketplaceLayoutMobile = dynamic(
  () => import("@feature/page/marketplace/mobilescreen/MarketplaceLayoutMobile")
)

const MarketplaceLayoutFilterNoBanner = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto">
    <div className="hidden sm:block">
      <Header />
    </div>
    <div className="block sm:hidden">
      <MarketplaceLayoutMobile />
    </div>
    {/* <Header /> */}
    <div className="flex flex-col gap-3 sm:flex-row">
      {/* add filter component here */}
      <div className="hidden w-60 sm:block">
        <FilterBox />
      </div>
      {children}
    </div>
    <Footer />
  </div>
)

export default MarketplaceLayoutFilterNoBanner
