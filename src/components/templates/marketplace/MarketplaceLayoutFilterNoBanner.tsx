import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import React from "react"

const MarketplaceLayoutFilterNoBanner = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto">
    <Header />
    <div className="flex flex-row gap-3">
      {/* add filter component here */}
      <div className="w-[200px]">Filter</div>
      <div>{children}</div>
    </div>
    <Footer />
  </div>
)

export default MarketplaceLayoutFilterNoBanner
