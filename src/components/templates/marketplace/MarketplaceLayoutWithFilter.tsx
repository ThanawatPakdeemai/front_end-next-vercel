import ShineIcon from "@components/icons/ShineIcon"
import Banners from "@components/molecules/Banners"
import Tagline from "@components/molecules/tagline/Tagline"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import FilterBox from "@feature/marketplace/components/molecules/FilterBox"
import React from "react"

const MarketplaceLayoutWithFilter = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto">
    <Header />
    <Banners />
    <Tagline
      icon={<ShineIcon />}
      bgColor="bg-neutral-800"
      textColor="text-neutral-500 font-bold"
      text="Join the NFT revolution and become a part of the future of ownership. "
      show={false}
    />
    <div className="flex flex-col gap-3 md:flex-row">
      {/* add filter component here */}
      <div className="mx-2 w-full lg:w-[200px]">
        <div>
          <FilterBox />
        </div>
      </div>
      {children}
    </div>
    <Footer />
  </div>
)

export default MarketplaceLayoutWithFilter
