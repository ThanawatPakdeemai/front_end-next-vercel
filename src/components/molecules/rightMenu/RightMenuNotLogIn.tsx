import React, { memo, useState } from "react"
import { Box, Stack } from "@mui/material"
import { ModalCustom } from "../Modal/ModalCustom"
import ButtonLogin from "./ButtonLogin"
import FormLogin from "../../../features/authentication/components/FormLogin"
import ModalHeader from "../Modal/ModalHeader"

const RightMenuNotLogIn = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Box className="w-max rounded-xl bg-neutral-700 p-1">
        <Box className="xs:flex-col items-center justify-between gap-1 lg:flex">
          <ButtonLogin handleButton={handleOpen} />
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
            <ModalHeader
              handleClose={handleClose}
              title="Login"
            />

            <FormLogin />
          </Stack>
        </ModalCustom>
      </Box>
    </>
  )
}
export default memo(RightMenuNotLogIn)
