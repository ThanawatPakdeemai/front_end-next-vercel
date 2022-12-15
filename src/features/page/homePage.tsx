import DeveloperPart from "@feature/home/components/template/DeveloperPart"
import BannerSlide from "@feature/slider/components/templates/BannerSlide"
import CarouselSlide from "@feature/slider/components/templates/CarouselSlide"
import { memo } from "react"

const Home = () => (
  <>
    <BannerSlide />
    {/* Testing display a CarouselSlide component, waiting to merge with team */}
    <div className="grid grid-cols-2 gap-6">
      <></>
      <CarouselSlide />
    </div>
    <DeveloperPart />
  </>
)
export default memo(Home)
