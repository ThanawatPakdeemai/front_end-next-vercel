import { IMenu } from "@interfaces/IMenu"
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import React from "react"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"
import { useRouter } from "next/router"
import Link from "next/link"
import { Trans } from "react-i18next"

interface IProp extends IMenu {
  active?: boolean
  endIcon?: boolean
  icon: string | React.ReactElement
  onClick?: () => void
  endText?: string | React.ReactElement
}

/**
 * @description In case use more type please add type in array prop
 */

const MenuItemCustom = ({
  active,
  endIcon,
  icon,
  onClick,
  endText,
  ...props
}: IProp) => {
  const router = useRouter()
  return (
    <MenuItem
      aria-label={props.id}
      onClick={() => {
        if (props.href && props.href !== "") {
          router.push(props.href)
        } else if (onClick) {
          onClick()
        }
      }}
      sx={{
        color: active ? "#E1E2E2" : null,
        backgroundColor: active ? "#010101" : null
      }}
    >
      <Link
        href={props.href ?? ""}
        className="flex w-full items-center"
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <div className="flex w-full items-center justify-between">
          <ListItemText className="w-full">
            <Trans i18nKey={props.label as string}>
              {props.label as string}
            </Trans>
          </ListItemText>
          <ListItemText className="mr-3">{endText}</ListItemText>
        </div>
        {endIcon && <ArrowOutwardOutlinedIcon sx={{ height: 14 }} />}
      </Link>
    </MenuItem>
  )
}

export default MenuItemCustom
