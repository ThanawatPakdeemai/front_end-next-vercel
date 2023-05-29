import { Box } from "@mui/material"
import { memo } from "react"

export const styleIcon = {
  fontSize: "20px !important"
}
const HeadMenuMobile = () => (
  <header className="header fixed inset-x-0 bottom-4 z-[999] ">
    <Box
      component="div"
      className="flex content-center items-center justify-center "
    >
      <Box
        component="div"
        className="bg-white/30 border-slate-50 w-full rounded-full border border-neutral-800 text-white-default backdrop-blur-md"
      />
    </Box>
  </header>
)

export default memo(HeadMenuMobile)
