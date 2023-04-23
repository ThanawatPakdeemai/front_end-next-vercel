import { Box, Typography, IconButton } from "@mui/material"
import React from "react"
import CancelIcon from "@mui/icons-material/Cancel"
import FmdGoodIcon from "@mui/icons-material/FmdGood"
import Image from "next/image"
import { ILandMap } from "@feature/land/interfaces/ILandService"
import { useTranslation } from "next-i18next"
import CopyButton from "@components/atoms/CopyButton"

interface ICardLandMap {
  land: ILandMap
  onClose: () => void
}

const CardLandMap = ({ land, onClose }: ICardLandMap) => {
  const { t } = useTranslation()

  return (
    <Box
      component="div"
      className="card-land-panel-wrapper"
    >
      <div className="flex items-center justify-between">
        <Typography
          id="_card-land-map-name"
          variant="h5"
          sx={{
            fontSize: { xs: "14px", sm: "16px" },
            color: "#27F1EC !important"
          }}
        >
          {t(land.name)}
        </Typography>
        <IconButton
          id="_card-land-map-btn-close"
          className="right-[-10px]"
          onClick={onClose}
          disableRipple
        >
          <CancelIcon sx={{ color: "#7B5BE6" }} />
        </IconButton>
      </div>
      <div className="flex items-center justify-start">
        <div className="flex">
          <Typography
            id="_card-land-map-tokenid-title"
            className="uppercase"
            sx={{
              fontSize: { xs: "10px", sm: "12px" },
              marginRight: "4px",
              color: "#7B5BE6 !important"
            }}
          >
            Token Id :
          </Typography>
          <Typography
            id="_card-land-map-tokenid-value"
            sx={{ fontSize: { xs: "10px", sm: "12px" } }}
          >
            {land.land_id}
          </Typography>
        </div>
        <CopyButton text={land.land_id} />
      </div>
      <div className="flex items-center justify-start">
        <IconButton
          id="_card-land-map-location"
          sx={{ cursor: "auto" }}
          disableRipple
        >
          <FmdGoodIcon sx={{ color: "#F42728" }} />
        </IconButton>
        <Typography
          id="_card-land-map-position"
          sx={{ fontSize: { xs: "12px", sm: "14px" } }}
        >
          : {land.position.x}, {land.position.y}
        </Typography>
      </div>
      <div className="relative mt-4 flex w-full items-center justify-center overflow-hidden rounded-md bg-white-primary pt-[68%]">
        <Image
          src={land.image}
          alt={`_img-card-map-${land.image.trim().toLowerCase()}`}
          layout="fill"
          loading="lazy"
          className="object-cover object-center"
        />
      </div>
    </Box>
  )
}

export default CardLandMap
