import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import { StyleDrawer } from "@mobile/styles/muiStyleMobile"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import useNotificationController from "@feature/notification/containers/hooks/useNotificationController"
import dynamic from "next/dynamic"

const ArrowBackIcon = dynamic(
  () => import("@mobile/components/atoms/icons/ArrowBackIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const NotificationListMobile = dynamic(
  () =>
    import(
      "@mobile/features/notification/components/organisms/NotificationListMobile"
    ),
  {
    suspense: true,
    ssr: false
  }
)

interface INotificationModalProps {
  open: boolean
  setOpenNotification: React.Dispatch<React.SetStateAction<boolean>>
}

const NotificationModal = ({
  open,
  setOpenNotification
}: INotificationModalProps) => {
  const { clearAllDrawer } = useDrawerControllerMobile()
  const { notificationList, isLoadingNotification, limit, onClickView } =
    useNotificationController()

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
        sx={{
          "h2": {
            lineHeight: "1",
            alignItems: "flex-start"
          }
        }}
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
          list={notificationList}
          loading={isLoadingNotification}
          limit={limit}
          handleClick={onClickView}
        />
      </Box>
    </SwipeableDrawer>
  )
}

export default NotificationModal
