import React from "react"
import GasCard from "@components/atoms/GasCard"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import { useTranslation } from "react-i18next"
import GasIcon from "./tagline/GasIcon"

const Gas = () => {
  const { t } = useTranslation()
  return (
    <Box className="p-4">
      <div className="grid h-fit w-[103px] gap-2 !rounded-[14px] bg-neutral-800 p-2">
        <Box className="flex justify-center">
          <Card className="h-fit w-fit !rounded-lg bg-primary-main">
            <div className="mx-auto flex items-center justify-between p-3">
              <div>
                <p className="text-[10px] uppercase text-[#4E5057]">
                  {t("gas_now")}
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
}

export default Gas
