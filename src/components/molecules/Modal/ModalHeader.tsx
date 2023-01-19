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
      <div
        className={`${
          title === "Buy Assets"
            ? "rounded-xl border border-[#232329] py-2 "
            : ""
        }`}
      >
        <ButtonClose onClick={() => handleClose()} />
      </div>
    </Box>
    {title === "Buy Assets" ? <></> : <Divider />}
  </>
)
export default memo(ModalHeader)
