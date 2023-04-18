import React, { memo } from "react"
import useNotificationController from "@feature/notification/containers/hooks/useNotificationController"
import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonNotification from "@components/atoms/skeleton/SkeletonNotification"
import { Box } from "@mui/material"
import useNotiStore from "@stores/notification"
import useGlobal from "@hooks/useGlobal"
import DropdownLimit from "@components/atoms/DropdownLimit"
import NoData from "@components/molecules/NoData"
import NotificationTable from "./NotificationTable"
import Header from "../molecules/NotificationHeader"

const NotificationList = () => {
  const { hydrated } = useGlobal()
  const {
    limit,
    page,
    totalCount,
    setPage,
    pager,
    setLimit,
    sortBy,
    onHandleSortBy,
    isLoadingNotification,
    unread,
    onHandleClick,
    onClickView,
    buttonStatus
  } = useNotificationController()
  const { notificationAll } = useNotiStore()

  return hydrated ? (
    <div className="mx-auto w-full lg:w-3/4 xl:w-3/5">
      <Header
        unread={unread}
        onHandleClick={() => onHandleClick()}
        disabled={buttonStatus}
      />
      {isLoadingNotification && (
        <SkeletonNotification
          data={[]}
          isLoading={isLoadingNotification}
        />
      )}
      {notificationAll && notificationAll.length > 0 ? (
        <NotificationTable
          data={notificationAll}
          page={page}
          limit={limit}
          sortBy={sortBy}
          onHandleView={onClickView}
          onHandleSortBy={onHandleSortBy}
        />
      ) : (
        <NoData />
      )}
      <Box
        component="div"
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
          defaultValue={12}
          list={pager}
          onChangeSelect={setLimit}
        />
      </Box>
    </div>
  ) : (
    <></>
  )
}
export default memo(NotificationList)
