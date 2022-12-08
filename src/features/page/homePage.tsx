import { Layout } from "@components/template"
import { BannerSlide } from "@feature/home/components/template/bannerSlide"
import DeveloperPart from "@feature/home/components/template/developerPart"
import { memo } from "react"

const Home = () => (
  <Layout>
    <BannerSlide />
    <DeveloperPart />
  </Layout>
)
export default memo(Home)
