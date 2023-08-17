import React from "react"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import useEarnRewardController from "@feature/earnReward/containers/hooks/useEarnRewardController"

const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})
const ButtonFilledTemplate = dynamic(
  () => import("../templates/ButtonFilledTemplate"),
  {
    suspense: true,
    ssr: true
  }
)

interface IEarnRewardCardMobile {
  id: string
  image: string
  title: string
  description: string
}

const EarnRewardCardMobile = ({
  id,
  image,
  title,
  description
}: IEarnRewardCardMobile) => {
  const { handleClaimReward } = useEarnRewardController()

  return (
    <Box
      component="div"
      className="earn-reward-card"
    >
      <div className="earn-reward-card__mobile__item flex w-full items-center gap-[20px]">
        <div className="earn-reward-card__mobile__item--image h-[70px] w-[70px] overflow-hidden rounded-xl">
          <ImageCustom
            src={image}
            alt={title}
            width={70}
            height={70}
            className="h-full w-full rounded-sm object-contain object-center"
          />
        </div>
        <div className="earn-reward-card__mobile__item--content text-white-primary">
          <h3 className="font-urbanist text-[18px] font-bold">{title}</h3>
          <p className="font-urbanist">{description}</p>
        </div>
        <div className="earn-reward-card__mobile__item--button ml-auto">
          <ButtonFilledTemplate
            onClick={() => handleClaimReward(id)}
            color="#F32429"
          >
            Claim
          </ButtonFilledTemplate>
        </div>
      </div>
    </Box>
  )
}

export default EarnRewardCardMobile
