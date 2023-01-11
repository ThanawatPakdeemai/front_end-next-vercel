import ButtonClose from "@components/atoms/button/ButtonClose"
import { Box, Divider, Typography } from "@mui/material"
import React, { memo } from "react"

interface IProp {
  handleClose: () => void
  title: string
}
const ModalHeader = ({ handleClose, title }: IProp) => (
  <>
    <Box className="flex items-center justify-between">
      <Typography className="text-lg text-neutral-300">{title}</Typography>
      <ButtonClose onClick={() => handleClose()} />
    </Box>
    <Divider />
  </>
)
export default memo(ModalHeader)
