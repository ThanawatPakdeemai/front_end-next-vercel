import { Box } from "@mui/material"
import React from "react"
import ArrowBackIcon from "../atoms/icons/ArrowBackIcon"

interface IGamePageDefaultMobileProps {
  component: React.ReactNode
  component2?: React.ReactNode
}

const GamePageDefaultMobile = ({
  component,
  component2
}: IGamePageDefaultMobileProps) => (
  <Box
    component="div"
    className="categories-list flex flex-col p-[8px_24px_36px]"
    sx={{
      width: "100%",
      maxHeight: "calc(100vh - 240px)"
    }}
  >
    <h2 className="flex items-center justify-between gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary">
      <ArrowBackIcon />
    </h2>
    {component}
    {component2 && <div className="mt-12">{component2}</div>}
  </Box>
)
export default GamePageDefaultMobile
