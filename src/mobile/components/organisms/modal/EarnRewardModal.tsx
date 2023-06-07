/* eslint-disable react-hooks/rules-of-hooks */
import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"
import useEarnRewardController from "@feature/earnReward/containers/hooks/useEarnRewardController"
import { StyleDrawer } from "@mobile/styles/muiStyleMobile"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import EarnRewardListMobile from "../EarnRewardListMobile"

interface IEarnRewardModalProps {
  open: boolean
  setOpenReward: React.Dispatch<React.SetStateAction<boolean>>
}

const EarnRewardModal = ({ open, setOpenReward }: IEarnRewardModalProps) => {
  if (!open) return <></>
  const { clearAllDrawer } = useDrawerControllerMobile()
  const { isLoadingReward, earnReward } = useEarnRewardController()

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={() => setOpenReward(false)}
      onOpen={() => {
        clearAllDrawer()
        setOpenReward(true)
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
          onClick={() => setOpenReward(false)}
          aria-hidden="true"
        >
          <ArrowBackIcon />
          Item Rewards
        </h2>
        <EarnRewardListMobile
          earnReward={earnReward || []}
          loading={isLoadingReward}
          limit={9999}
        />
      </Box>
    </SwipeableDrawer>
  )
}

export default EarnRewardModal
