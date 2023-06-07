import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"
import { StyleDrawer } from "@mobile/styles/muiStyleMobile"
import useHistoryController from "@feature/history/containers/hook/useHistoryController"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import PlayedHistoryListMobile from "@mobile/features/history/components/organisms/PlayedHistoryListMobile"

interface IPlayedHistoryModalProps {
  open: boolean
  setOpenPlayedHistory: React.Dispatch<React.SetStateAction<boolean>>
}

const PlayedHistoryModal = ({
  open,
  setOpenPlayedHistory
}: IPlayedHistoryModalProps) => {
  const { clearAllDrawer } = useDrawerControllerMobile()
  const { hxHistory, isLoadingHistory, limit } = useHistoryController()

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={() => setOpenPlayedHistory(false)}
      onOpen={() => {
        clearAllDrawer()
        setOpenPlayedHistory(true)
      }}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true
      }}
      sx={{
        ...StyleDrawer,
        "&.MuiDrawer-root": {
          zIndex: 1200
        }
      }}
    >
      <Box
        component="div"
        className="notification-list flex flex-col p-[8px_24px_36px]"
      >
        <h2
          className="flex items-center gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary"
          onClick={() => setOpenPlayedHistory(false)}
          aria-hidden="true"
        >
          <ArrowBackIcon />
          Played History
        </h2>

        <PlayedHistoryListMobile
          list={hxHistory}
          loading={isLoadingHistory}
          limit={limit}
        />
      </Box>
    </SwipeableDrawer>
  )
}

export default PlayedHistoryModal
