/* eslint-disable react-hooks/rules-of-hooks */
import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"
import useFavoriteGameControllerMobile from "@mobile/features/game/containers/hooks/useFavoriteGameControllerMobile"
import { StyleDrawer } from "@mobile/styles/muiStyleMobile"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import GameListMobile from "../GameListMobile"

interface IWishlistModalProps {
  open: boolean
  setOpenWishlist: React.Dispatch<React.SetStateAction<boolean>>
}

const WishlistModal = ({ open, setOpenWishlist }: IWishlistModalProps) => {
  if (!open) return <></>
  const { gameFavouriteState, isLoadingGameFavourite, limit } =
    useFavoriteGameControllerMobile()
  const { clearAllDrawer } = useDrawerControllerMobile()

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
      >
        <h2
          className="flex items-center gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary"
          onClick={() => setOpenWishlist(false)}
          aria-hidden="true"
        >
          <ArrowBackIcon />
          Wishlist
        </h2>
        {/* Game List */}
        <GameListMobile
          gameData={gameFavouriteState || []}
          loading={isLoadingGameFavourite}
          limit={limit}
        />
      </Box>
    </SwipeableDrawer>
  )
}

export default WishlistModal
