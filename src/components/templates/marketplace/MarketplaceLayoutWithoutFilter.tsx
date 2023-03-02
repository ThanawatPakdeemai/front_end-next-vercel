import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import React from "react"

const MarketplaceLayoutWithoutFilter = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto">
    <Header />
    <div>{children}</div>
    <Footer />
  </div>
)

export default MarketplaceLayoutWithoutFilter
