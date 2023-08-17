import React, { memo } from "react"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import useNotificationController from "@feature/notification/containers/hooks/useNotificationController"
import useNotiStore from "@stores/notification"
import useGlobal from "@hooks/useGlobal"

const PaginationNaka = dynamic(
  () => import("@components/atoms/pagination/PaginationNaka"),
  {
    suspense: true,
    ssr: false
  }
)
const DropdownLimit = dynamic(() => import("@components/atoms/DropdownLimit"), {
  suspense: true,
  ssr: false
})
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: true
})
const NotificationTable = dynamic(() => import("./NotificationTable"), {
  suspense: true,
  ssr: false
})
const Header = dynamic(() => import("../molecules/NotificationHeader"), {
  suspense: true,
  ssr: false
})

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
      {notificationAll &&
      notificationAll.length > 0 &&
      !isLoadingNotification ? (
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
