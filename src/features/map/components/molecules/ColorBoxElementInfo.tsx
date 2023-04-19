import { Box, IconButton, Popover, Typography } from "@mui/material"
import { colorMap } from "@constants/map"
import React from "react"
import { v4 as uuidv4 } from "uuid"
import { Trans } from "next-i18next"
import IconInfo from "@components/icons/IconInfo"

const ColorBoxElementInfo = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const open = Boolean(anchorEl)
  const id = open ? "_helperinfo-id" : undefined
  const helperInfo = [
    { title: "land", color: colorMap.land },
    { title: "owned", color: colorMap.owned },
    { title: "occupied", color: colorMap.occupied },
    { title: "current land", color: colorMap.currentLand },
    { title: "available for sale", color: colorMap.availableForSale }
  ]

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box component="div">
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        disableRipple
        className="h-[46px] w-[46px] rounded-full bg-[#202025] opacity-100"
      >
        <IconInfo />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        className="land-type-content"
        sx={{
          "& .MuiPaper-root ": {
            backgroundColor: "#010101",
            padding: "10px",
            backgroundImage: "none",
            borderRadius: "14px"
          }
        }}
      >
        {helperInfo.map((item, _index) => (
          <Box
            key={uuidv4()}
            component="div"
            className="land-type-item my-2 flex rounded-md p-0 shadow-none"
          >
            <Box
              component="div"
              sx={{
                backgroundColor: item.color
              }}
              className="land-type-item-wrapper h-[25px] w-[25px] rounded"
            />
            <Typography
              className="rounded border border-neutral-700 px-[10px] py-[5px] text-xs text-neutral-400"
              sx={{
                marginLeft: "8px",
                textTransform: "uppercase",
                fontWeight: "bold"
              }}
            >
              <Trans>{item.title}</Trans>
            </Typography>
          </Box>
        ))}
      </Popover>
    </Box>
  )
}

export default ColorBoxElementInfo
