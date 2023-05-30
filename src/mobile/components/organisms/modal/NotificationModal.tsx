import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"

interface INotificationModalProps {
  open: boolean
  setOpenNotification: React.Dispatch<React.SetStateAction<boolean>>
}

const NotificationModal = ({
  open,
  setOpenNotification
}: INotificationModalProps) => (
  <SwipeableDrawer
    anchor="right"
    open={open}
    onClose={() => setOpenNotification(false)}
    onOpen={() => setOpenNotification(true)}
    disableSwipeToOpen={false}
    ModalProps={{
      keepMounted: true
    }}
    sx={{
      ".MuiDrawer-paper": {
        background: "#121212",
        width: "100%"
      }
    }}
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
    </Box>
  </SwipeableDrawer>
)

export default NotificationModal
