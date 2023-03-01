import { Box } from "@mui/material"
import React from "react"

const BuyItemBody = ({ children }: { children: React.ReactNode }) => (
  <Box className="mt-2 flex flex-[1_1_340px] gap-2 md:mt-0 md:flex-none lg:w-[333px]">
    {children}
  </Box>
)

export default BuyItemBody
