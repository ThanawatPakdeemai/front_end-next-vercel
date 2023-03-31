import React from "react"
import { Box, Stack } from "@mui/material"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import FormLogin from "@feature/authentication/components/FormLogin"

const RightMenuNotLogInTemplate = ({
  children,
  open,
  handleClose
}: {
  children: React.ReactNode
  open: boolean
  handleClose: () => void
}) => (
  <Box
    component="div"
    className="right-menu-noLogin__template"
  >
    {children}
    <ModalCustom
      open={open}
      onClose={handleClose}
      className="w-full gap-3 rounded-[34px] p-[10px] md:w-auto"
      width="auto"
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
)

export default RightMenuNotLogInTemplate
