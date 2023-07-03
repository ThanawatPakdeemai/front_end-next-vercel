import React from "react"
import { Box, Button, SwipeableDrawer, Typography } from "@mui/material"
import { useRouter } from "next/router"
import useGlobal from "@hooks/useGlobal"

interface ICategoriesModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LogoutModal = ({ open, setOpen }: ICategoriesModalProps) => {
  const router = useRouter()
  const { onClickLogout } = useGlobal()

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
        <h2 className="py-[30px] text-center font-urbanist text-[24px] font-bold text-warning-100">
          Log out
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
          <Typography className="py-6 font-urbanist font-bold text-white-default">
            Are you sure you want to log out?
          </Typography>
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
              variant="contained"
              className="h-[58px] w-[170px] rounded-bl-3xl border border-solid border-error-100 !bg-error-100"
              onClick={() => {
                onClickLogout()
                router.push("/")
              }}
            >
              <div className="flex items-center font-urbanist text-base font-bold">
                Yes, log out
              </div>
            </Button>
          </Box>
        </Box>
      </Box>
    </SwipeableDrawer>
  )
}

export default LogoutModal
