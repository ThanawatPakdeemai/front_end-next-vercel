import SettingIconFilter from "@components/icons/Inventory/SettingIconFilter"
import { Box } from "@mui/material"
import React, { useState } from "react"
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded"

const InventoryPage = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="h-full border-l-[1px] border-l-neutral-700">
      <div className="flex">
        {open && (
          <div className=" h-[248px] w-[276px] bg-neutral-780 transition-all duration-500 ease-in">
            Filter
          </div>
        )}
        <Box
          className="grid h-[40px] w-[40px] cursor-pointer items-center justify-items-center rounded-r-lg bg-error-main"
          onClick={() => {
            if (open === false) {
              setOpen(true)
            }
            if (open === true) {
              setOpen(false)
            }
          }}
        >
          {open ? (
            <HighlightOffRoundedIcon sx={{ color: "#ffff" }} />
          ) : (
            <SettingIconFilter />
          )}
        </Box>
      </div>
    </div>
  )
}

export default InventoryPage
