import useGlobalStaking from "@feature/staking/containers/hook/useStakingController"
import React from "react"
import { v4 as uuid } from "uuid"
import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import useGlobal from "@hooks/useGlobal"
import StakingTitle from "../atoms/StakingTitle"
import StakingDetails from "./StakingDetails"
import RedBanner from "./RedBanner"

const FlexibleAPRContent = () => {
  const { flexibleStaking } = useGlobalStaking()
  const { t } = useTranslation()
  const { hydrated } = useGlobal()

  return (
    <section className="relative w-full overflow-hidden">
      {hydrated && (
        <RedBanner
          message={`Flexible ${t("staking_earn_up_to")} 125% APR`}
          className="mb-12"
        />
      )}
      {flexibleStaking && (
        <Box component="section">
          {flexibleStaking.map((_item) =>
            _item.dataAPI.map((item) => (
              <div key={uuid()}>
                <StakingTitle title={`${item.title}`} />
                <StakingDetails
                  className="mb-10"
                  dataStaking={item}
                />
              </div>
            ))
          )}
        </Box>
      )}
    </section>
  )
}

export default FlexibleAPRContent
