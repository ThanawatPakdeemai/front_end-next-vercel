import * as React from "react"
import { styled } from "@mui/material/styles"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"

interface ExpandMoreProps extends IconButtonProps {
  expand?: boolean
  hover?: boolean
}

const IconButtonCustom = styled((props: ExpandMoreProps) => {
  const { ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  /* animation for expand */
  transform: !expand ? "rotate(0deg)" : "rotate(45deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}))

export default IconButtonCustom
