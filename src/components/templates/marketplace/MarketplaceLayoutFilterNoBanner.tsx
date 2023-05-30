import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import FilterBox from "@feature/marketplace/components/molecules/FilterBox"
import MarketplaceLayoutMobile from "@feature/page/marketplace/mobilescreen/MarketplaceLayoutMobile"
import React from "react"

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
      <main>{children}</main>
    </div>
    <Footer />
  </div>
)

export default MarketplaceLayoutFilterNoBanner
