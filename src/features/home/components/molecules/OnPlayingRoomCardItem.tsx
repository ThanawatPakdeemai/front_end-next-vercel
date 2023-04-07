import React from "react"
import { Box, SxProps, Theme } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Link from "next/link"
import { useTranslation } from "react-i18next"

interface IOnPlayingRoomCardItemProps {
  href: string
  itemSize: string
  roomCount: number
  className?: string
  sxCustomStyled?: SxProps<Theme>
  onClick?: () => void
}

const OnPlayingRoomCardItem = ({
  href,
  itemSize,
  roomCount,
  className = "",
  sxCustomStyled
}: IOnPlayingRoomCardItemProps) => {
  const { t } = useTranslation()
  return (
    <Box
      component="li"
      sx={sxCustomStyled}
    >
      <Link
        href={href}
        className={`flex h-[24px] w-full items-center gap-2 whitespace-nowrap rounded-[6px] border-[1px] border-neutral-800 bg-neutral-800 px-[2px] py-[2px] pr-2 font-neue-machina-semi text-xs uppercase text-neutral-400 transition-all hover:border-purple-primary ${className}`}
      >
        <span className="flex h-full w-[46px] items-center justify-center rounded-[4px] bg-neutral-780">
          {itemSize}
        </span>
        <Box
          component="div"
          className="flex items-center text-neutral-500"
        >
          <span>{`${t("room")} : `}</span>
          <span className="ml-[8px] text-neutral-300">{roomCount}</span>
        </Box>
        <Box
          component="i"
          className="ml-auto flex w-3 items-center justify-center"
          sx={{
            ".MuiSvgIcon-root": {
              width: "12px"
            }
          }}
        >
          <ArrowForwardIcon />
        </Box>
      </Link>
    </Box>
  )
}

export default OnPlayingRoomCardItem
