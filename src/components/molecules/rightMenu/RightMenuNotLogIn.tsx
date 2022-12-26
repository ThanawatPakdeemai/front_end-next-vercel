import ButtonLink from "@components/atoms/button/ButtonLink"
import React, { memo, useState } from "react"
import LoginIcon from "@mui/icons-material/Login"
import { Box, Typography } from "@mui/material"
import { ModalCustom } from "../ModalCustom"

const RightMenuNotLogIn = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Box className="m-auto w-max rounded-xl bg-neutral-700 p-1">
        <Box className="xs:flex-col items-center justify-between gap-1 lg:flex">
          <ButtonLink
            onClick={() => handleOpen()}
            href="/"
            text="Login with username"
            icon={<LoginIcon />}
            variant="contained"
            size="small"
            // size="medium"
            className=" m-auto rounded-xl"
          />
          <Typography className="mx-3 text-center">or</Typography>
          <ButtonLink
            onClick={() => handleOpen()}
            href="/"
            text="Login with matamask"
            icon={<LoginIcon />}
            color="secondary"
            variant="contained"
            size="small"
            className=" m-auto rounded-xl"
          />
        </Box>
        <ModalCustom
          open={open}
          onClose={handleClose}
          className="gap-3 rounded-[34px] p-[10px]"
          width={400}
        >
          <>ddd</>
        </ModalCustom>
      </Box>
    </>
  )
}
export default memo(RightMenuNotLogIn)
