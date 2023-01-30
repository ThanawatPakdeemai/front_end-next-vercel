import React, { memo, useEffect, useState } from "react"
import useGetNoticfication from "@feature/notification/containers/hooks/useGetNoticfication"
import { PaginationNaka } from "@components/atoms/pagination"
import useProfileStore from "src/stores/profileStore"
import { TextField, InputAdornment } from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import Header from "../../organisms/header"
import NoticficationTable from "../../organisms/noticficationTable"

const NotificationList = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [unread, setUnread] = useState<number>(0)
  const limit = 10
  const { isLoading, isPreviousData, data } = useGetNoticfication({
    player_id: profile?.id
  })

  useEffect(() => {
    if (data && data.length > 0) {
      setTotalCount(data.length)
    }
  }, [isLoading, isPreviousData, data])

  useEffect(() => {
    if (data && data.length > 0) {
      const result = data.filter((read) => read === false)
      setUnread(result.length)
    }
  }, [isLoading, isPreviousData, data])

  return (
    <div className="mx-auto w-full lg:w-3/4 xl:w-3/5">
      <Header unread={unread} />
      <NoticficationTable data={data} />
      <div className="flex justify-between">
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <TextField
          className="ml-3"
          select
          placeholder="Show 6"
          value="6"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VisibilityOutlinedIcon />
              </InputAdornment>
            )
          }}
        />
      </div>
    </div>
  )
}
export default memo(NotificationList)
