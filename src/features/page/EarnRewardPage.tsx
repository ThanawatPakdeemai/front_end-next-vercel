import React from "react"
import { Trans, useTranslation } from "react-i18next"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import useEarnRewardController from "@feature/earnReward/containers/hooks/useEarnRewardController"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ButtonToggleIcon = dynamic(
  () => import("@components/molecules/gameSlide/ButtonToggleIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const ItemRewardDetails = dynamic(
  () => import("@feature/game/components/molecules/ItemRewardDetails"),
  {
    suspense: true,
    ssr: false
  }
)
const SkeletonDetails = dynamic(
  () => import("@feature/game/components/molecules/SkeletonDetails"),
  {
    suspense: true,
    ssr: false
  }
)
const Chip = dynamic(() => import("@mui/material/Chip"), {
  suspense: true,
  ssr: false
})
const Typography = dynamic(() => import("@mui/material/Typography"), {
  suspense: true,
  ssr: false
})
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: false
})

const EarnRewardPage = () => {
  const {
    isLoadingReward,
    earnReward,
    handleClaimReward,
    countUnClaim,
    onClaimAll
  } = useEarnRewardController()

  const { t } = useTranslation()
  let content: React.ReactElement | React.ReactElement[]

  if (isLoadingReward) {
    content = <SkeletonDetails />
  } else if (earnReward && earnReward.length > 0) {
    content = earnReward.map((data) => (
      <ItemRewardDetails
        key={uuidv4()}
        rewardData={data}
        onClaim={() => handleClaimReward(data._id)}
      />
    ))
  } else {
    content = (
      <div className="flex w-full justify-center rounded-lg border border-neutral-800 bg-neutral-700 py-3 text-center">
        <NoData />
      </div>
    )
  }
  return (
    <div className="grid max-w-[678px] gap-10">
      <div className="mt-6 flex items-center justify-end md:mt-0">
        <Typography className="flex-1 text-[22px] uppercase text-neutral-400">
          <Trans i18nKey="item_rewards" />
        </Typography>
        {countUnClaim > 0 && (
          <>
            <Chip
              label={`${t("unclaimed")} ${countUnClaim}`}
              color="error"
              size="small"
            />
            {/* for claim all */}
            <ButtonToggleIcon
              text={t("claim_all")}
              className="ml-4 h-[50px] !w-[135px] !rounded-[24px] border border-neutral-700 bg-primary-main font-bold capitalize text-white-primary md:ml-[30px]"
              startIcon={<Icomoon className="icon-Check-in-a-Circle" />}
              handleClick={onClaimAll}
            />
          </>
        )}
      </div>
      <Box
        component="div"
        className="flex h-[100px] w-full items-center justify-center rounded-[13px] text-center text-[26px] uppercase"
        sx={{
          backgroundColor: "#2C0909",
          backgroundImage:
            "repeating-linear-gradient(0deg, #e1e2e20A 4%, #2c0909 8%)",
          backdropFilter: "blur(2.5px)"
        }}
      >
        <Typography className="text-shadow-red px-4 font-digital-7 text-[26px] text-error-main">
          {t("earn_banner_message")}
        </Typography>
      </Box>
      <div className="grid max-w-[678px] gap-[10px] !overflow-x-auto md:flex md:flex-col">
        {content}
      </div>
    </div>
  )
}

export default EarnRewardPage
