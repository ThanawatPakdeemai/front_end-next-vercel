import ButtonLink from "@components/atoms/button/ButtonLink"
import CONFIGS from "@configs/index"
import { Box } from "@mui/material"
import React from "react"

interface IOpenMetamask {
  url: string
}

const OpenMetamask = ({ url }: IOpenMetamask) => (
  <Box
    component="div"
    sx={{
      background: "#18181C",
      border: "0.7px solid #35383F",
      borderRadius: "16px",
      padding: "10px 20px",
      textAlign: "center"
    }}
    className="flex flex-col items-center justify-center gap-2"
  >
    <span>{`Your don't have items to play. Please click the "Open with Metamask" to buy items.`}</span>
    <ButtonLink
      icon={<></>}
      text="Open with Metamask"
      size="large"
      color="error"
      variant="contained"
      className="w-full !p-[8px_20px] font-urbanist !text-white-primary"
      href={`${CONFIGS.BASE_URL.METAMASK}/dapp/${url}`}
    />
  </Box>
)

export default OpenMetamask
