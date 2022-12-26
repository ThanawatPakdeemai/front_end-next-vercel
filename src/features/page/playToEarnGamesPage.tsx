import { PaginationNaka } from "@components/atoms/pagination"
import React, { memo } from "react"

const PlayToEarnGamesPage = () => {
  const [page, setPage] = React.useState<number>(1)

  return (
    <>
      <div>PlayToEarnGamesPage</div>
      <PaginationNaka
        totalPage={20}
        setPage={setPage}
      />
    </>
  )
}

export default memo(PlayToEarnGamesPage)
