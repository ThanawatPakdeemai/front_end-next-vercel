import { PaginationNaka } from "@components/atoms/pagination"
import { memo } from "react"

const PlayToEarnGamesPage = () => (
  <>
    <div>PlayToEarnGamesPage</div>
    <PaginationNaka
      totalPage={20}
      defaultPage={1}
    />
  </>
)

export default memo(PlayToEarnGamesPage)
