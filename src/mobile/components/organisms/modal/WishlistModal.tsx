import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"
import { StyleDrawer } from "@mobile/styles/muiStyleMobile"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import useFavoriteGameControllerMobile from "@mobile/features/game/containers/hooks/useFavoriteGameControllerMobile"
import useGlobal from "@hooks/useGlobal"
import GameListMobile from "../GameListMobile"

interface IWishlistModalProps {
  open: boolean
  setOpenWishlist: React.Dispatch<React.SetStateAction<boolean>>
}

const WishlistModal = ({ open, setOpenWishlist }: IWishlistModalProps) => {
  const { defaultBody, stateProfile } = useGlobal()
  const { clearAllDrawer } = useDrawerControllerMobile()

  const { gameFavorite, isLoadingGameFavourite } =
    useFavoriteGameControllerMobile({
      defaultBody,
      profileId: stateProfile?.id || ""
    })

  /**
   * @description When player login, render game favorite
   * @returns
   */
  const renderContent = () => {
    if (stateProfile) {
      return (
        <GameListMobile
          gameData={gameFavorite}
          loading={isLoadingGameFavourite}
        />
      )
    }
    return <></>
  }

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={() => setOpenWishlist(false)}
      onOpen={() => {
        clearAllDrawer()
        setOpenWishlist(true)
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
          onClick={() => setOpenWishlist(false)}
          aria-hidden="true"
        >
          <ArrowBackIcon />
          Wishlist
        </h2>
        {renderContent()}
      </Box>
    </SwipeableDrawer>
  )
}

export default WishlistModal
