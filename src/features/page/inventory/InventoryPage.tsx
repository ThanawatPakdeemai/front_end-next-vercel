import SettingIconFilter from "@components/icons/Inventory/SettingIconFilter"
import { Box } from "@mui/material"
import React, { useState } from "react"
import { motion } from "framer-motion"
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded"
import FilterBox from "@feature/marketplace/components/molecules/FilterBox"

const InventoryPage = () => {
  const [open, setOpen] = useState(false)

  const animetionVariants = {
    hidden: {
      opacity: 0,
      ease: "easeOut",
      width: 0
      // onanimationend: {
      //   width: 0
      // }
    },
    shown: {
      opacity: 1,
      // scale: 1,
      // backgroundColor: "#333338",
      //  w-[276px]
      width: "276px"
    }
  }

  return (
    <div className="hidden h-full border-l-[1px] border-l-neutral-700 sm:block">
      <div className="flex ">
        {open && (
          <motion.div
            variants={animetionVariants}
            initial="hidden"
            animate="shown"
            // transition={{ duration: 2, ease: "easeIn" }}
            className="h-full bg-neutral-780 p-4"
          >
            <FilterBox />
          </motion.div>
        )}
        <Box
          component="div"
          // sx={{ backgroundColor }}
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
