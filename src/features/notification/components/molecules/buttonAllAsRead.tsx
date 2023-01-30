import React from "react"
import { Button } from "@mui/material"
import CheckMarkIcon from "../atoms/icon/checkMarkIcon"

export const ButtonAllAsRead = () => (
  <Button
    variant="outlined"
    startIcon={<CheckMarkIcon />}
  >
    Mark all as read
  </Button>
)
