/* eslint-disable no-unused-vars */
import useGlobalStaking from "@feature/staking/containers/hook/useStakingController"
import React, { useEffect, useRef, useState } from "react"
import { v4 as uuid } from "uuid"
import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import useGlobal from "@hooks/useGlobal"
import StakingTitle from "../atoms/StakingTitle"
import StakingDetails from "./StakingDetails"
import RedBanner from "./RedBanner"

const FlexibleAPRContent = () => {
  // TODO: Refactor this component
  const [stakingStatus, setStakingStatus] = useState<boolean | undefined>(false)
  const fetchRef = useRef(false)
  const { flexibleStaking, userStakedInfo, fetchStakingInfo } =
    useGlobalStaking()
  const { t } = useTranslation()
  const { hydrated } = useGlobal()

  useEffect(() => {
    let load = false

    if (!load) {
      if (!fetchRef.current && flexibleStaking) {
        setStakingStatus(
          flexibleStaking.some((_item) =>
            _item.dataAPI.some((item) => {
              fetchStakingInfo(item.contract_address, item.type)
              return userStakedInfo?.comInterest && userStakedInfo.stakeAmount
            })
          )
        )
      }
      fetchRef.current = true
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flexibleStaking])

  return (
    <section className="relative w-full overflow-hidden">
      {hydrated && (
        // <RedBanner
        //   message={`Flexible ${t("staking_earn_up_to")} 125% APR`}
        //   className="mb-12"
        // />
        <div>
          <RedBanner
            message={`${t("staking_not_available")}`}
            className="mb-12"
          />
          <Typography className="mb-12 flex max-w-full justify-center text-center font-bold uppercase text-neutral-500">
            {t("staking_not_avaliable_desc")}
          </Typography>
        </div>
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
