import { Box } from "@mui/material"
import React from "react"
import dynamic from "next/dynamic"
import CONFIGS from "@configs/index"

const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: true
  }
)

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
    <span>{`Looks like your inventory is empty! To enhance your gaming experience, tap on 'Open in Metamask' to purchase the items you need.`}</span>
    <ButtonLink
      icon={<></>}
      text="Open in Metamask"
      size="large"
      color="error"
      variant="contained"
      className="w-full !p-[8px_20px] font-urbanist !text-white-primary"
      href={`${CONFIGS.BASE_URL.METAMASK}/dapp/${url}`}
    />
  </Box>
)

export default OpenMetamask
