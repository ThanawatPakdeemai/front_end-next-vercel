import TitleWithChip from "@components/atoms/TitleWithChip"
import TooltipsCustom from "@components/atoms/TooltipsCustom"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { IPlayToEarnRewardData } from "@src/types/games"
import Helper from "@utils/helper"
import Image from "next/image"
import React from "react"

interface IProp {
  rewardData: IPlayToEarnRewardData
  onClaim: () => void
}

const ItemRewardDetails = ({ rewardData, onClaim }: IProp) =>
  rewardData ? (
    <div className="flex w-full flex-row justify-between rounded-[14px] border border-neutral-800 bg-neutral-780 p-2">
      {/* left */}
      <div className="flex items-center">
        {rewardData.game_image && rewardData.game_name ? (
          <Image
            src={rewardData.game_image}
            alt={rewardData.game_name}
            width={75}
            height={75}
            className="rounded-[6px] object-cover"
          />
        ) : (
          <>No Image</>
        )}
      </div>
      {/* data */}
      <div className="ml-2 grid w-[336px] grid-cols-3 items-center justify-center gap-[22px] px-5 uppercase">
        <TitleWithChip
          title="Game"
          label={rewardData.game_name || ""}
          color="primary"
          className="!bg-primary-main"
        />
        <TitleWithChip
          title="Score"
          label={Helper.formatNumber(rewardData.score) || 0}
          color="primary"
          className="!bg-primary-main"
        />
        <TitleWithChip
          title="Items"
          label={rewardData.game_item_name || "No Item"}
          color="primary"
          className="!bg-primary-main"
        />
      </div>
      {/* right */}
      <div className="flex flex-row gap-2">
        <TooltipsCustom
          title={rewardData.game_item_name || "No Item"}
          color="error"
        >
          <div className="flex h-[75px] w-[75px] items-center justify-center rounded-[6px] border border-neutral-700 bg-primary-main text-center text-xs ">
            {rewardData.game_item_image && rewardData.game_item_name ? (
              <Image
                src={rewardData.game_item_image}
                alt={rewardData.game_item_name}
                width={50}
                height={50}
                className="rounded-[6px]"
              />
            ) : (
              <>No Image</>
            )}
          </div>
        </TooltipsCustom>
        <div className="flex w-[130px] flex-col gap-[10px]">
          <div className="flex h-[30px] items-center rounded-[6px] border border-neutral-700 bg-neutral-800 py-[9px] px-[10px] text-xs uppercase text-neutral-500">
            amount{" "}
            <span className="ml-2 !text-sm !text-neutral-300">
              {rewardData.item_amount}
            </span>
          </div>
          <ButtonToggleIcon
            startIcon={null}
            text="Claim"
            className="btn-rainbow-theme !h-[30px] bg-secondary-main text-white-primary"
            handleClick={onClaim}
          />
        </div>
      </div>
    </div>
  ) : (
    <>Loading...</>
  )

export default ItemRewardDetails
