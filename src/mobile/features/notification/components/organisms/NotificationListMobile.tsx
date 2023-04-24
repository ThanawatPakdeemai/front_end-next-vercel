import React, { memo } from "react"
import useNotificationController from "@feature/notification/containers/hooks/useNotificationController"
import { PaginationNaka } from "@components/atoms/pagination"
import SkeletonNotification from "@components/atoms/skeleton/SkeletonNotification"
import useNotiStore from "@stores/notification"
import useGlobal from "@hooks/useGlobal"
import DropdownLimit from "@components/atoms/DropdownLimit"
import NoData from "@components/molecules/NoData"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import CheckMarkIcon from "@components/icons/CheckMarkIcon"
import { useTranslation } from "next-i18next"
import NotificationTableMobile from "./NotificationTableMobile"
import Header from "../molecules/NotificationHeaderMobile"

const NotificationListMobile = () => {
  const { t } = useTranslation()
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
      <Header />
      {isLoadingNotification && (
        <SkeletonNotification
          data={[]}
          isLoading={isLoadingNotification}
        />
      )}
      {notificationAll && notificationAll.length > 0 ? (
        <NotificationTableMobile
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
      <div className="my-2 flex justify-between md:my-5 md:w-[678px]">
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
      </div>
      <div className="header fixed inset-x-0 bottom-0 z-[99]  flex flex-row items-center gap-4 bg-neutral-800 p-2">
        <div className="w-[160%] rounded bg-neutral-900 p-2.5">
          <p className="my-2 pl-2 text-sm font-bold uppercase text-[#ffffff]">
            unread: <span className="text-green-lemon">{unread}</span>
          </p>
        </div>
        <ButtonToggleIcon
          startIcon={<CheckMarkIcon />}
          text={t("Read All")}
          handleClick={onHandleClick}
          className="border-sky-500 z-[2] w-[120px] rounded-full border border-solid text-[12px] capitalize"
          type="button"
          disabled={buttonStatus}
        />
      </div>
    </div>
  ) : (
    <></>
  )
}
export default memo(NotificationListMobile)
