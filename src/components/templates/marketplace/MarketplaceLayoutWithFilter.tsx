import ShineIcon from "@components/icons/ShineIcon"
import Banners from "@components/molecules/Banners"
import Tagline from "@components/molecules/tagline/Tagline"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import FilterBox from "@feature/marketplace/components/molecules/FilterBox"
import useGlobal from "@hooks/useGlobal"
import React from "react"

const MarketplaceLayoutWithFilter = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  /** This is only temporary code for hide marketplace in production */
  const { isShowMarket } = useGlobal()
  /** This is only temporary code for hide marketplace in production */
  return isShowMarket ? (
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
        <div className="z-10 mx-2 w-60">
          <FilterBox />
        </div>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  ) : (
    <></>
  )
}

export default MarketplaceLayoutWithFilter
