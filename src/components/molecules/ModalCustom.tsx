import React from "react"
import { Box, ModalUnstyledOwnProps, Modal } from "@mui/material"

interface IProps extends ModalUnstyledOwnProps {
  bgcolor?: string
  className?: string
}

export const ModalCustom = ({ ...props }: IProps) => {
  const { children, bgcolor, className } = props
  return (
    <Modal {...props}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          width: 400,
          transform: "translate(-50%, -50%)",
          bgcolor: bgcolor || "#01010133"
        }}
        className={className}
      >
        {children}
      </Box>
    </Modal>
  )
}
