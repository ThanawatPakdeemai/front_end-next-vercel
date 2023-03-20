import ButtonIcon from "@components/atoms/button/ButtonIcon"
import SaveIcon from "@components/icons/SaveIcon"
import TableIcon from "@components/icons/TableIcon"
import Tagline from "@components/molecules/tagline/Tagline"
import { SOCIAL_SHARE_SUMMARY } from "@configs/socialShare"
import { Link, Typography } from "@mui/material"
import React from "react"
import { Image } from "@components/atoms/image"
import LogoIcon from "@components/icons/LogoIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import ArrowDownIcon from "@components/icons/ArrowDownIcon"
import IconArrowRight from "@components/icons/arrowRightIcon"
import { useRouter } from "next/router"
import Helper from "@utils/helper"
import { IGameSummary } from "@feature/game/interfaces/IGameService"
import useProfileStore from "@stores/profileStore"
import dayjs from "dayjs"
import useGameStore from "@stores/game"
import SummaryGameDetail from "../molecules/SummaryGameDetail"

interface IProp {
  summaryData: IGameSummary[]
}

const SummaryMain = ({ summaryData }: IProp) => {
  const router = useRouter()
  const { profile } = useProfileStore()

  const { data: gameData } = useGameStore()

  const playerSummary = summaryData.find(
    (data) => data.player_id === profile.data?.id
  )

  return playerSummary ? (
    <div className="flex-[1_1_100%] overflow-hidden rounded-[14px] bg-neutral-900 sm:flex-[1_1_50%] lg:w-[605px] lg:flex-none">
      <Tagline
        icon={null}
        bgColor="bg-error-main"
        textColor="text-error-contrastText font-bold text-[12px]"
        text="Thanks for playing Nanamoto.games with us. It was a lot of fun!"
        className="left-[200px] top-10 !my-0 hidden rotate-[30deg] overflow-hidden lg:block"
      />
      <div className="m-[10px] flex flex-row lg:mt-[-23px]">
        <Typography
          className="relative flex h-[328px] rotate-180 items-center justify-between rounded border border-neutral-800 bg-transparent"
          sx={{
            textOrientation: "sideways",
            writingMode: "vertical-rl"
          }}
        >
          <span className="pt-20 text-sm font-bold uppercase text-error-main">
            {dayjs(playerSummary.end_time).format("DD MMM YYYY h:mm a")}
          </span>
          <SaveIcon />
        </Typography>
        <div className="flex w-full flex-col items-center justify-center text-error-main">
          <TableIcon className="absolute z-[1] hidden sm:block" />
          <span className="mb-11 text-sm font-bold uppercase">
            YOUR SCORE IS
          </span>
          <span className="font-mondwest text-[100px]">
            {Helper.formatNumber(playerSummary.current_score)} ✨
          </span>
          <span className="mb-1 text-sm font-bold uppercase">
            Send to friends
          </span>
          <div className="flex">
            {SOCIAL_SHARE_SUMMARY.map((item, index) => (
              <Link
                key={Number(index)}
                href={item.href !== "" ? item.href : undefined}
                target="_blank"
              >
                <ButtonIcon
                  whileHover="hover"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 4
                  }}
                  icon={item.icon}
                  onClick={item.label === "link" ? () => {} : undefined}
                  className="m-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-error-main border-opacity-40"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-[10px] p-[10px] lg:flex-nowrap">
        <div className="flex w-full items-center justify-center rounded border border-neutral-800 p-2 px-[14px] sm:flex-[1_1_100%]">
          <Image
            width={264}
            height={288}
            src={
              gameData
                ? gameData.image_category_list
                : "/images/gamePage/game1.png"
            }
            alt="img-profile"
          />
        </div>
        <div className="flex flex-[1_1_100%] flex-col gap-[10px]">
          <div className="flex w-full flex-col items-center justify-center rounded border border-neutral-800 px-[26px] py-5 text-sm">
            <SummaryGameDetail
              title="game:"
              value={gameData ? gameData.name : ""}
            />
            <SummaryGameDetail
              title="asset:"
              value={`${playerSummary.detail_used_items.name}  ${playerSummary.detail_used_items.item_size}`}
            />
            <SummaryGameDetail
              title="game reward:"
              value={`${playerSummary.naka_for_player} Naka`}
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-[10px] rounded border border-neutral-800 bg-neutral-800 p-[10px] text-sm">
            <div className="flex w-full items-center bg-primary-main px-6 py-5">
              <span className="flex-1 uppercase text-neutral-500">
                MY Reward:
              </span>
              <span className="mr-3 text-lg uppercase text-green-lemon">
                {playerSummary.naka_for_player}
              </span>
              <LogoIcon fill="#A0ED61" />
            </div>
            <ButtonToggleIcon
              startIcon={<ArrowDownIcon />}
              endIcon={<IconArrowRight stroke="#010101" />}
              text="Withdraw"
              className="btn-green-rainbow bg-green-lemon font-bold text-neutral-900"
              // wait for wallet page then chnage to path/wallet
              handleClick={() => router.push("/")}
              type="button"
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>Loading...</>
  )
}

export default SummaryMain
