import { BannerSlide } from "@feature/home/components/organisms/bannerSlide"
import DeveloperPart from "@feature/home/components/template/DeveloperPart"
import { memo } from "react"

const Home = () => (
  <>
    <BannerSlide />
    <DeveloperPart />
  </>
)
export default memo(Home)
