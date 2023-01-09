import React, { memo, useState } from "react"
import { Box, Divider, Stack, Typography } from "@mui/material"
import ButtonClose from "@components/atoms/button/ButtonClose"
import { ModalCustom } from "../ModalCustom"
import ButtonLogin from "./ButtonLogin"
import FormLogin from "../../../features/authentication/components/FromLogin"

const RightMenuNotLogIn = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Box className="m-auto w-max rounded-xl bg-neutral-700 p-1">
        <Box className="xs:flex-col items-center justify-between gap-1 lg:flex">
          <ButtonLogin handleButton={handleOpen} />
          {/* <Typography className="mx-3 text-center">or</Typography> */}
          {/* <ButtonMetamask handleButton={handleOpen} /> */}
        </Box>
        <ModalCustom
          open={open}
          onClose={handleClose}
          className="w-auto gap-3 rounded-[34px] p-[10px]"
          width={400}
        >
          <Stack
            spacing={3}
            className="md:p-5"
          >
            <Box className="flex items-center justify-between">
              <Typography className="text-lg text-neutral-300">
                Login
              </Typography>
              <ButtonClose onClick={() => handleClose()} />
            </Box>
            <Divider />
            <FormLogin />
          </Stack>
        </ModalCustom>
      </Box>
    </>
  )
}
export default memo(RightMenuNotLogIn)
