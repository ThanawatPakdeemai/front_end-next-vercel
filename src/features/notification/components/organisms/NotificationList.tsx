import React, { memo } from "react"
import useNotificationController from "@feature/notification/containers/hooks/useNotificationController"
import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonNotification from "@components/atoms/skeleton/SkeletonNotification"
import { Box } from "@mui/material"
import useNotiStore from "@stores/notification"
import useGlobal from "@hooks/useGlobal"
import DropdownLimit from "@components/atoms/DropdownLimit"
import NotificationTable from "./NotificationTable"
import Header from "../molecules/NotificationHeader"

const NotificationList = () => {
  const {
    page,
    limit,
    totalCount,
    sortBy,
    setPage,
    onHandleSortBy,
    isLoadingNotification,
    handleLimit,
    unread,
    onHandleClick,
    onClickView,
    buttonStatus
  } = useNotificationController()
  const { notificationAll } = useNotiStore()
  const { hydrated } = useGlobal()

  return hydrated ? (
    <div className="mx-auto w-full lg:w-3/4 xl:w-3/5">
      <Header
        unread={unread}
        onHandleClick={() => onHandleClick()}
        disabled={buttonStatus}
      />
      {notificationAll ? (
        <NotificationTable
          data={notificationAll}
          page={page}
          limit={limit}
          sortBy={sortBy}
          onHandleView={onClickView}
          onHandleSortBy={onHandleSortBy}
        />
      ) : (
        <SkeletonNotification
          data={[]}
          isLoading={isLoadingNotification}
        />
      )}
      <Box
        className="my-2 flex justify-between md:my-5 md:w-[678px]"
        sx={{
          ".MuiPagination-ul": {
            gap: "5px 0"
          }
        }}
      >
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <DropdownLimit
          className="m-0 w-[160px] flex-row"
          defaultValue={limit}
          list={[6, 12, 24, 48, 64]}
          onChangeSelect={handleLimit}
        />
      </Box>
    </div>
  ) : (
    <></>
  )
}
export default memo(NotificationList)
