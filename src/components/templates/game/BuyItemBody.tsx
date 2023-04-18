import { Box } from "@mui/material"
import React from "react"

const BuyItemBody = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="div"
    className="mt-2 flex h-full flex-[1_1_340px] flex-wrap gap-2 md:mt-0 lg:w-[333px] lg:flex-none"
  >
    {children}
  </Box>
)

export default BuyItemBody
