import React from "react"
import GasCard from "@components/atoms/GasCard"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
// import { useTranslation } from "react-i18next"
import GasIcon from "./tagline/GasIcon"

const Gas = () => (
  <Box className="p-2 xl:p-4">
    <div className="grid h-full w-full gap-2 !rounded-[14px]">
      <Box className="flex justify-center">
        <Card className="Cardtext h-full w-full !rounded-lg bg-black-100">
          <div className="mx-auto flex items-center justify-between p-3">
            <div>
              <p className="p-2 text-[14px] uppercase text-neutral-600">
                Gas Now
              </p>
            </div>
            <div>
              <GasIcon />
            </div>
          </div>
        </Card>
      </Box>

      <GasCard
        title="STANDARD"
        gwei={44.9}
        color="text-green-lemon"
        second="30-60"
      />
      <GasCard
        title="FAST"
        gwei={46.5}
        color="text-secondary-main"
        second="10-30"
      />
      <GasCard
        title="RAPID"
        gwei={51.6}
        color="text-error-main"
        second="5-10"
      />
    </div>
  </Box>
)

export default Gas
