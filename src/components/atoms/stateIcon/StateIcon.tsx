import React from "react"
import MenuIcon from "@mui/icons-material/Menu"
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule"

interface IProps {
  expanded: boolean
  hover: boolean
}

const StateIcon = ({ expanded, hover }: IProps) => {
  if (!hover && !expanded) {
    return (
      <MenuIcon
        className="!rotate-0 text-white-primary "
        fontSize="small"
      />
    )
  }
  if (!hover && expanded) {
    return (
      <HorizontalRuleIcon
        className="!rotate-45 text-white-primary"
        fontSize="small"
      />
    )
  }
  if (hover) {
    return (
      <HorizontalRuleIcon
        className="text-white-primary"
        fontSize="small"
      />
    )
  }
  return (
    <MenuIcon
      className="!rotate-0 text-white-primary"
      fontSize="small"
    />
  )
}

export default StateIcon
