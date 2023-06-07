import React from "react"
import { Box, ModalProps, Modal, Typography } from "@mui/material"
import CircleNakaIcon from "@components/icons/CircleNakaIcon"
import ButtonClose from "@components/atoms/button/ButtonClose"
import { Trans } from "next-i18next"

interface IProps extends ModalProps {
  bgcolor?: string
  className?: string
  width?: string | number
  title?: string
  titleNode?: React.ReactNode
  rounded?: boolean
  onClose?: () => void
  boderChide?: string
  hideNakaIcon?: boolean
}

export const ModalCustom = ({
  title,
  titleNode,
  onClose,
  hideNakaIcon = false,
  ...props
}: IProps) => {
  const { children, bgcolor, className, width, boderChide } = props
  return (
    <Modal
      onClose={onClose}
      {...props}
    >
      <Box
        component="div"
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
        <Box
          component="div"
          className={`${boderChide || "rounded-md "}${
            title === "orion trade" ? "rounded-t-none" : ""
          }min-w-[280px] border-[1px] border-neutral-800 bg-neutral-900 p-4 focus:border-none focus:outline-none focus-visible:outline-none`}
        >
          {title ||
            (titleNode && (
              <Box
                component="div"
                className="flex items-center rounded-lg border-[1px] border-neutral-700 bg-neutral-800 pl-5"
                sx={{ height: "54px" }}
              >
                <div className="flex flex-1 flex-row items-center">
                  {!hideNakaIcon && <CircleNakaIcon />}
                  {titleNode || (
                    <Typography className="pl-[15px] uppercase text-neutral-300">
                      <Trans i18nKey={title} />
                    </Typography>
                  )}
                </div>
                <ButtonClose onClick={onClose || (() => {})} />
              </Box>
            ))}
          {children}
        </Box>
      </Box>
    </Modal>
  )
}
