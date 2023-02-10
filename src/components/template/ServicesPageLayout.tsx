import Banner from "@components/molecules/Banner"
import HeadStaking from "@components/molecules/HeadStaking"
import SidebarServices from "@components/molecules/SidebarServices"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { STAKING_BANNER } from "@constants/servicesBanner"
import React from "react"

const StakingPageLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto">
    <Header />

    <Banner data={STAKING_BANNER} />
    <div className="flex flex-row gap-3">
      <SidebarServices />
      <HeadStaking>{children}</HeadStaking>
    </div>
    <Footer />
  </div>
)

export default StakingPageLayout
