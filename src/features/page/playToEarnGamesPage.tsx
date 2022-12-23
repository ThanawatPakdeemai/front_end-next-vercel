import ShapeIcon from "@components/icons/ShapeIcon"
import SidebarGames from "@components/molecules/SidebarGames"
import Tagline from "@components/molecules/tagline/Tagline"
import { memo } from "react"
import HeadGames from "@components/molecules/HeadGames"

const PlayToEarnGamesPage = () => (
  <>
    <Tagline
      bgColor="bg-neutral-800"
      textColor="text-neutral-500 font-bold"
      text="This Christmas, you’re the best gift I could ask for."
      icon={<ShapeIcon fill="#4E5057" />}
    />
    <div className="flex flex-row gap-3">
      <SidebarGames />
      <HeadGames />
    </div>
  </>
)

export default memo(PlayToEarnGamesPage)
