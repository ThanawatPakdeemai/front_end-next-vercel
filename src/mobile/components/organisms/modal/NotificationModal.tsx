import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"
import { StyleDrawer } from "@mobile/styles/muiStyleMobile"
import NotificationListMobile from "@mobile/features/notification/components/organisms/NotificationListMobile"
import useHistoryController from "@feature/history/containers/hook/useHistoryController"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"

interface INotificationModalProps {
  open: boolean
  setOpenNotification: React.Dispatch<React.SetStateAction<boolean>>
}

const NotificationModal = ({
  open,
  setOpenNotification
}: INotificationModalProps) => {
  const { clearAllDrawer } = useDrawerControllerMobile()
  const { hxHistory, isLoadingHistory, limit } = useHistoryController()

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={() => setOpenNotification(false)}
      onOpen={() => {
        clearAllDrawer()
        setOpenNotification(true)
      }}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true
      }}
      sx={StyleDrawer}
    >
      <Box
        component="div"
        className="notification-list flex flex-col p-[8px_24px_36px]"
      >
        <h2
          className="flex items-center gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary"
          onClick={() => setOpenNotification(false)}
          aria-hidden="true"
        >
          <ArrowBackIcon />
          Notification
        </h2>

        <NotificationListMobile
          list={hxHistory}
          loading={isLoadingHistory}
          limit={limit}
          type="history"
        />
      </Box>
    </SwipeableDrawer>
  )
}

export default NotificationModal
