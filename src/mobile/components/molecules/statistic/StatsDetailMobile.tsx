import { Box } from "@mui/material"
import Helper from "@utils/helper"
import React from "react"

interface IProp {
  icon: React.ReactNode
  title: string
  amount: number | string
  unit: string
  type: "normal" | "range"
}

const StatsDetailMobile = ({ icon, title, type, amount, unit }: IProp) => (
  <Box
    component="div"
    sx={{
      position: "relative",
      "&:first-child": {
        "&::before": {
          display: "none"
        }
      },
      "&::before": {
        content: "''",
        position: "absolute",
        left: 0,
        width: "1px",
        height: "40%",
        backgroundColor: "#A19F9D",
        borderRadius: "2px"
      }
    }}
    className="game-section__analytics--item flex flex-col justify-center gap-1 font-neue-machina text-[12px] uppercase text-white-primary"
  >
    <i className="mb-2 flex justify-center">{icon}</i>
    <p className="text-center">{title}</p>
    <div className="flex items-end justify-center gap-2 text-[#A19F9D]">
      <p>
        {type === "normal"
          ? Helper.formatNumber(amount as number)
          : `${amount}`}
      </p>
      <p>{unit}</p>
    </div>
  </Box>
)

export default StatsDetailMobile
