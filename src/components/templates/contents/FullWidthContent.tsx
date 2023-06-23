import React from "react"
import { Box, SxProps, Theme } from "@mui/material"

const FullWidthContent = ({
  children,
  className,
  sxCustomStyled = {}
}: {
  children: React.ReactNode
  className?: string
  sxCustomStyled?: SxProps<Theme>
}) => (
  <Box
    component="div"
    sx={sxCustomStyled}
    id="full-width-content"
    className={`container-fullWidth container mx-auto mb-3 min-h-[567px] w-full gap-3 rounded-2xl border-[1px] border-neutral-700 bg-neutral-780 p-[10px_30px] ${className}`}
  >
    {children}
  </Box>
)

export default FullWidthContent
