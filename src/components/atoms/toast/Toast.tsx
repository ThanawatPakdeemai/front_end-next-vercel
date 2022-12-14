/* eslint-disable no-nested-ternary */
import React from "react"
import { Alert, Snackbar, Typography } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import { IMAGES } from "@constants/images"
import { Image } from "@components/atoms/image"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

interface IProp {
  text: string
  status: "error" | "success" | "info" | "warning" | "inherit"
  width?: string
  className?: string
}

export default function Toast({ text, status, width, className }: IProp) {
  const [open, setOpen] = React.useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
    >
      <Alert
        variant="outlined"
        className={`mb-3 flex items-center rounded-sm bg-primary-main ${className}`}
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
            onClick={handleClose}
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
          className={`font-neue-machina ${
            status === "inherit"
              ? "text-white-primary"
              : status === "info"
              ? "text-secondary-main"
              : ""
          }`}
        >
          {text ?? `This is an ${status} alert — check it out!`}
        </Typography>
      </Alert>
    </Snackbar>
  )
}
