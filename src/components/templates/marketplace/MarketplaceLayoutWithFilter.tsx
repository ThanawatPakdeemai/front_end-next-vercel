import ShineIcon from "@components/icons/ShineIcon"
import Banners from "@components/molecules/Banners"
import Tagline from "@components/molecules/tagline/Tagline"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import FilterBox from "@feature/marketplace/components/molecules/FilterBox"
import MarketplaceLayoutMobile from "@feature/page/marketplace/mobilescreen/MarketplaceLayoutMobile"
import React from "react"

const MarketplaceLayoutWithFilter = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto">
    <div className="hidden sm:block">
      <Header />
    </div>
    <div className="block sm:hidden">
      <MarketplaceLayoutMobile />
    </div>
    <Banners className="!md:mb-10" />
    <Tagline
      icon={<ShineIcon />}
      bgColor="bg-neutral-800"
      textColor="text-neutral-500 font-bold"
      text="Join the NFT revolution and game a part of the future of ownership. "
      className="hidden sm:block"
      show
    />
    <div className="flex flex-col gap-3 sm:flex-row">
      {/* add filter component here */}
      <div className="z-10 mx-2 hidden w-60 sm:block">
        <FilterBox />
      </div>
      {children}
    </div>
    <Footer />
  </div>
)

export default MarketplaceLayoutWithFilter
