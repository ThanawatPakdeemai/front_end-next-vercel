import React from "react"
import { Box } from "@mui/material"

const FullWidthContent = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => (
  <Box
    className={`container mx-auto mb-3 min-h-[567px] w-full gap-3 rounded-2xl border-[1px] border-neutral-700 bg-neutral-780 p-[10px_30px] ${className}`}
  >
    {children}
  </Box>
)

export default FullWidthContent
