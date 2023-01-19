import ButtonIcon from "@components/atoms/button/ButtonIcon"
import SaveIcon from "@components/icons/SaveIcon"
import TableIcon from "@components/icons/TableIcon"
import Tagline from "@components/molecules/tagline/Tagline"
import { SOCIAL_SHARE_SUMMARY } from "@configs/socialShare"
import { Link, Typography } from "@mui/material"
import React from "react"
import Image from "next/image"
import LogoIcon from "@components/icons/LogoIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import ArrowDownIcon from "@components/icons/ArrowDownIcon"
import IconArrowRight from "@components/icons/arrowRightIcon"
import { useRouter } from "next/router"
import SummaryGameDetail from "../molecules/SummaryGameDetail"

const SummaryMain = () => {
  const router = useRouter()
  const { GameHome } = router.query

  return (
    <div className="w-[605px] overflow-hidden rounded-[14px] bg-neutral-900">
      <Tagline
        icon={undefined}
        bgColor="bg-error-main"
        textColor="text-error-contrastText font-bold text-[12px]"
        text="Thanks for playing Nanamoto.games with us. It was a lot of fun!"
        className="left-[200px] top-10 !my-0 rotate-[30deg] overflow-hidden"
      />
      <div className="m-[10px] mt-[-23px] flex flex-row">
        <Typography
          className="relative flex h-[328px] rotate-180 items-center justify-between rounded border border-neutral-800 bg-transparent"
          sx={{
            textOrientation: "sideways",
            writingMode: "vertical-rl"
          }}
        >
          <span className="pt-20 text-sm font-bold uppercase text-error-main">{`${20} SEP 2023 6:30 PM`}</span>
          <SaveIcon />
        </Typography>
        <div className="flex w-full flex-col items-center justify-center text-error-main">
          <TableIcon className="absolute z-[1]" />
          <span className="mb-11 text-sm font-bold uppercase">
            YOUR SCORE IS
          </span>
          <span className="font-mondwest text-[100px]">1,246 ✨</span>
          <span className="mb-1 text-sm font-bold uppercase">
            Send to friends
          </span>
          <div className="flex">
            {SOCIAL_SHARE_SUMMARY.map((item) => (
              <Link
                key={item.label}
                href={item.href}
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
      <div className="flex gap-[10px] p-[10px]">
        <div className="rounded border border-neutral-800 px-[14px]">
          <Image
            width={264}
            height={288}
            src="/images/gamePage/game1.png"
            alt="img-profile"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex w-full flex-col items-center justify-center rounded border border-neutral-800 px-[26px] py-5 text-sm">
            <SummaryGameDetail
              title="game:"
              value={GameHome as string}
            />
            <SummaryGameDetail
              title="asset:"
              value="skull"
            />
            <SummaryGameDetail
              title="game reward:"
              value={`${54.56} Naka`}
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-[10px] rounded border border-neutral-800 bg-neutral-800 p-[10px] text-sm">
            <div className="flex w-full items-center bg-primary-main px-6 py-5">
              <span className="flex-1 uppercase text-neutral-500">
                MY Reward:
              </span>
              <span className="mr-3 text-lg uppercase text-green-lemon">
                54.56
              </span>
              <LogoIcon fill="#A0ED61" />
            </div>
            <ButtonToggleIcon
              startIcon={<ArrowDownIcon />}
              endIcon={<IconArrowRight stroke="#010101" />}
              text="Withdraw"
              className="btn-green-rainbow bg-green-lemon font-bold text-neutral-900"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryMain
