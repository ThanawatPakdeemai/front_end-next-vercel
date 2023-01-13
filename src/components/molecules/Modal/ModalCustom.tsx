import React from "react"
import { Box, ModalUnstyledOwnProps, Modal } from "@mui/material"

interface IProps extends ModalUnstyledOwnProps {
  bgcolor?: string
  className?: string
  width?: string | number
}

export const ModalCustom = ({ ...props }: IProps) => {
  const { children, bgcolor, className, width } = props
  return (
    <Modal {...props}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          width: width || "auto",
          transform: "translate(-50%, -50%)",
          bgcolor: bgcolor || "#01010133"
        }}
        className={className}
      >
        <Box className="rounded-md bg-neutral-900 p-4">{children}</Box>
      </Box>
    </Modal>
  )
}