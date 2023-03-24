/* eslint-disable no-nested-ternary */
import React from "react"
import { Alert, Typography } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import { IMAGES } from "@constants/images"
import { Image } from "@components/atoms/image"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

interface IToastProps {
  text: string
  status: "error" | "success" | "info" | "warning" | "inherit"
  width?: string
  className?: string
  onClose: () => void
}

function BaseToastComponent({
  text,
  status,
  width,
  className,
  onClose
}: IToastProps) {
  return (
    <Alert
      variant="outlined"
      className={`flex items-center rounded-sm bg-primary-main ${className}`}
      severity={status !== "inherit" ? status : "info"}
      sx={{
        width: width ?? "max-content",
        borderColor:
          status === "inherit"
            ? "#01010118"
            : status === "info"
            ? "#7B5BE6"
            : ""
      }}
      action={
        <HighlightOffIcon
          onClick={onClose}
          className={`cursor-pointer ${
            status === "inherit"
              ? "text-white-primary"
              : status === "info"
              ? "text-secondary-main"
              : ""
          }`}
        />
      }
      iconMapping={{
        success: <CheckIcon fontSize="inherit" />,
        warning: <WarningAmberIcon fontSize="inherit" />,
        error: (
          <Image
            src={IMAGES.radiation.src}
            width={IMAGES.radiation.width}
            height={IMAGES.radiation.height}
            alt={IMAGES.radiation.alt}
          />
        ),
        info:
          status === "inherit" ? (
            <Image
              src={IMAGES.nakaIconWhite.src}
              width={IMAGES.nakaIconWhite.width}
              height={IMAGES.nakaIconWhite.height}
              alt={IMAGES.nakaIconWhite.alt}
            />
          ) : (
            <Image
              src={IMAGES.flagIcon.src}
              width={IMAGES.flagIcon.width}
              height={IMAGES.flagIcon.height}
              alt={IMAGES.flagIcon.alt}
            />
          )
      }}
    >
      <Typography
        className={`hide-scroll w-[500px] break-words font-neue-machina ${
          status === "inherit"
            ? "text-white-primary"
            : status === "info"
            ? "text-secondary-main"
            : ""
        }`}
      >
        {text}
      </Typography>
    </Alert>
  )
}

export default BaseToastComponent
