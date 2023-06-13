import { useState } from "react"

const useDrawerControllerMobile = () => {
  // State
  const [open, setOpen] = useState(false)
  const [openNotification, setOpenNotification] = useState<boolean>(false)
  const [openWishlist, setOpenWishlist] = useState<boolean>(false)
  const [openSetting, setOpenSetting] = useState<boolean>(false)
  const [openReward, setOpenReward] = useState<boolean>(false)
  const [profileSetting, setProfileSetting] = useState<boolean>(false)
  const [openPlayedHistory, setOpenPlayedHistory] = useState<boolean>(false)
  const [openAboutGame, setOpenAboutGame] = useState<boolean>(false)
  const [openCreateRoom, setOpenCreateRoom] = useState<boolean>(false)
  const [openSignIn, setOpenSignIn] = useState<boolean>(false)

  /**
   * @description Clear all drawer before setting new drawer
   */
  const clearAllDrawer = () => {
    setOpen(false)
    setOpenNotification(false)
    setOpenWishlist(false)
    setOpenSetting(false)
    setOpenReward(false)
    setProfileSetting(false)
    setOpenPlayedHistory(false)
    setOpenAboutGame(false)
    setOpenCreateRoom(false)
    setOpenSignIn(false)
  }

  return {
    clearAllDrawer,
    open,
    setOpen,
    openNotification,
    setOpenNotification,
    openWishlist,
    setOpenWishlist,
    openSetting,
    setOpenSetting,
    openReward,
    setOpenReward,
    profileSetting,
    setProfileSetting,
    openPlayedHistory,
    setOpenPlayedHistory,
    openAboutGame,
    setOpenAboutGame,
    openCreateRoom,
    setOpenCreateRoom,
    openSignIn,
    setOpenSignIn
  }
}

export default useDrawerControllerMobile
