import React from "react"
import { Box, ModalUnstyledOwnProps, Modal, Typography } from "@mui/material"
import CircleNakaIcon from "@components/icons/CircleNakaIcon"
import ButtonClose from "@components/atoms/button/ButtonClose"

interface IProps extends ModalUnstyledOwnProps {
  bgcolor?: string
  className?: string
  width?: string | number
  title?: string
  onClose?: () => void
}

export const ModalCustom = ({ title, onClose, ...props }: IProps) => {
  const { children, bgcolor, className, width } = props
  return (
    <Modal
      {...props}
      onClose={onClose}
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          width: width || "auto",
          transform: "translate(-50%, -50%)",
          bgcolor: bgcolor || "#01010133"
        }}
        className={`${className} rounded-md p-[10px] focus:border-none focus:outline-none focus-visible:outline-none`}
      >
        {title && (
          <Box
            className="flex items-center rounded-lg rounded-b-none bg-neutral-800 pl-5"
            sx={{ height: "54px" }}
          >
            <div className="flex flex-1 flex-row items-center">
              <CircleNakaIcon />
              <Typography className="pl-[15px] uppercase text-neutral-300">
                {title}
              </Typography>
            </div>
            <ButtonClose onClick={onClose || (() => {})} />
          </Box>
        )}

        <Box
          className={`rounded-md ${
            title === "orion trade" ? "rounded-t-none" : ""
          }  bg-neutral-900 p-4  focus:border-none focus:outline-none focus-visible:outline-none`}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  )
}
