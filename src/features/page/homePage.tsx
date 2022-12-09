import { BannerSlide } from "@feature/slider/components/templates/bannerSlide"
import DeveloperPart from "@feature/home/components/template/developerPart"
import { memo } from "react"
import { CarouselSlide } from "@feature/slider/components/templates/carouselSlide"

const Home = () => (
  <>
    <BannerSlide />
    {/* Testing display a CarouselSlide component */}
    <div className="grid grid-cols-2 gap-6">
      <></>
      <CarouselSlide />
    </div>
    <DeveloperPart />
  </>
)
export default memo(Home)
