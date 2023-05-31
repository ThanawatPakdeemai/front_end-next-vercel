import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"
import useFavoriteGameControllerMobile from "@mobile/features/game/containers/hooks/useFavoriteGameControllerMobile"
import GameListMobile from "../GameListMobile"

interface IWishlistModalProps {
  open: boolean
  setOpenWishlist: React.Dispatch<React.SetStateAction<boolean>>
}

const WishlistModal = ({ open, setOpenWishlist }: IWishlistModalProps) => {
  const { gameFavouriteState, isLoadingGameFavourite, limit } =
    useFavoriteGameControllerMobile()

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={() => setOpenWishlist(false)}
      onOpen={() => setOpenWishlist(true)}
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
