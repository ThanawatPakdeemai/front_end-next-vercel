import TitleWithChip from "@components/atoms/TitleWithChip"
import TooltipsCustom from "@components/atoms/TooltipsCustom"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { IPlayToEarnRewardData } from "@src/types/games"
import Helper from "@utils/helper"
import { Image } from "@components/atoms/image"
import React from "react"
import { Box } from "@mui/material"

interface IProp {
  rewardData: IPlayToEarnRewardData
  onClaim: () => void
}

const ItemRewardDetails = ({ rewardData, onClaim }: IProp) =>
  rewardData ? (
    <div className="flex w-full flex-row justify-between rounded-[14px] border border-neutral-800 bg-neutral-780 p-2">
      {/* left */}
      <Box
        component="div"
        className="flex items-center"
        sx={{
          width: "75px",
          height: "75px",
          "picture": {
            width: "100%",
            height: "100%",
            img: {
              width: "100%",
              height: "100%"
            }
          }
        }}
      >
        {rewardData.game_id && rewardData.game_id.image_list ? (
          <Image
            src={rewardData.game_id.image_list}
            alt={rewardData.game_id.name}
            width={75}
            height={75}
            className="rounded-[6px] object-cover"
          />
        ) : (
          <>No Image</>
        )}
      </Box>
      {/* data */}
      <div className="ml-2 grid w-[336px] grid-cols-3 items-center justify-center gap-[22px] px-5 uppercase">
        <TitleWithChip
          title="Game"
          label={rewardData.game_id.name || ""}
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
          label={
            `${rewardData.item_id.name} ${rewardData.item_id.item_size}` ||
            "No Item"
          }
          color="primary"
          className="!bg-primary-main"
        />
      </div>
      {/* right */}
      <div className="flex flex-row gap-2">
        <TooltipsCustom
          title={rewardData.item_id.name || "No Item"}
          color="error"
        >
          <div className="flex h-[75px] w-[75px] items-center justify-center rounded-[6px] border border-neutral-700 bg-primary-main text-center text-xs ">
            {rewardData.item_id.image ? (
              <Image
                src={rewardData.item_id.image}
                alt={rewardData.item_id.name}
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
          <div className="flex h-[30px] items-center rounded-[6px] border border-neutral-700 bg-neutral-800 px-[10px] py-[9px] text-xs uppercase text-neutral-500">
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
