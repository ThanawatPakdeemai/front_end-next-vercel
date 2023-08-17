import React from "react"
import { useTranslation } from "next-i18next"
import dynamic from "next/dynamic"

import Box from "@mui/material/Box"
import { ILandMap } from "@feature/land/interfaces/ILandService"

const Typography = dynamic(() => import("@mui/material/Typography"), {
  suspense: true,
  ssr: false
})
const IconButton = dynamic(() => import("@mui/material/IconButton"), {
  suspense: true,
  ssr: false
})
const CancelIcon = dynamic(() => import("@mui/icons-material/Cancel"), {
  suspense: true,
  ssr: false
})
const FmdGoodIcon = dynamic(() => import("@mui/icons-material/FmdGood"), {
  suspense: true,
  ssr: false
})
const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: false
})
const CopyButton = dynamic(() => import("@components/atoms/CopyButton"), {
  suspense: true,
  ssr: false
})

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

      <Image
        src={land.image}
        alt={`_img-card-map-${land.image.trim().toLowerCase()}`}
        layout="fill"
        width={232}
        height={152}
        loading="lazy"
        className="object-cover object-center"
      />
    </Box>
  )
}

export default CardLandMap
