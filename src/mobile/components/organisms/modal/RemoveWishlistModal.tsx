import React from "react"
import { Avatar, Box, Button, SwipeableDrawer } from "@mui/material"
import useFavoriteGameContoller from "@feature/favourite/containers/hooks/useFavoriteGameContoller"
import dynamic from "next/dynamic"

const HeartFilledIcon = dynamic(
  () => import("@mobile/components/atoms/icons/HeartFilledIcon"),
  {
    suspense: true,
    ssr: false
  }
)

interface ICategoriesModalProps {
  open: boolean
  setOpen: (_toggle: boolean) => void
  playedId: string
  gameId: string
  src: string
  name: string
  type: string
  gameMode: string
}

const RemoveWishlistModal = ({
  open,
  setOpen,
  playedId,
  gameId,
  src,
  name,
  type,
  gameMode
}: ICategoriesModalProps) => {
  const { onClickFavouriteButton } = useFavoriteGameContoller({
    playerId: playedId,
    gameId
  })

  const handleRemoveWishList = () => {
    onClickFavouriteButton()
    setOpen(false)
  }

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => {}}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true
      }}
      sx={{
        ".MuiDrawer-paper": {
          background: "#18181C",
          borderRadius: "44px 44px 0px 0px"
        }
      }}
    >
      <Box
        component="div"
        className="categories-list flex flex-col p-[8px_24px_36px]"
        sx={{
          width: "100%",
          maxHeight: "calc(100vh - 240px)",
          h2: {
            padding: "30px 0",
            borderBottom: "1px solid #35383F"
          }
        }}
      >
        <h2 className="py-[30px] text-center font-urbanist text-[24px] font-bold text-white-default">
          Remove from Wishlist?
        </h2>
        <Box
          component="div"
          className="flex flex-col"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0px",
            "button + button": {
              borderTop: "1px solid #35383F"
            }
          }}
        >
          <Box
            component="div"
            className="py-6 font-urbanist font-bold text-white-default"
            sx={{ width: "-webkit-fill-available" }}
          >
            <Box
              component="div"
              className="grid grid-cols-[1fr_calc(100%-132px)_1fr] items-start justify-between gap-4"
            >
              <Avatar
                className="h-20 w-20 rounded-2xl"
                variant="square"
                src={src}
              />
              <Box component="div">
                <p className="font-urbanist font-bold text-white-default">
                  {name}
                </p>
                <p className="font-urbanist font-semibold text-warning-100">
                  {type}
                </p>
                {gameMode === "play-to-earn" && (
                  <p className="font-urbanist font-medium text-grey-neutral01">
                    In-App Purchase
                  </p>
                )}
              </Box>
              <Box
                component="div"
                className="mt-[5px] flex items-center"
              >
                <HeartFilledIcon />
              </Box>
            </Box>
          </Box>
          <Box
            component="div"
            className="flex gap-3"
          >
            <Button
              variant="contained"
              className=" h-[58px] w-[170px] rounded-bl-3xl border border-solid border-neutral-710 !bg-neutral-710"
              onClick={() => setOpen(false)}
            >
              <div className="flex items-center font-urbanist text-base font-bold">
                Cancel
              </div>
            </Button>
            <Button
              onClick={handleRemoveWishList}
              variant="contained"
              className="h-[58px] w-[170px] rounded-bl-3xl border border-solid border-error-100 !bg-error-100"
            >
              <div className="flex items-center font-urbanist text-base font-bold">
                Yes, Remove
              </div>
            </Button>
          </Box>
        </Box>
      </Box>
    </SwipeableDrawer>
  )
}

export default RemoveWishlistModal
