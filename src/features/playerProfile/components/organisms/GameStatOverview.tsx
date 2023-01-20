import React, { useMemo, useState } from "react"
import {
  Card,
  CardContent,
  Divider,
  Pagination,
  PaginationItem,
  Stack
} from "@mui/material"
import NumberRank from "@feature/ranking/components/atoms/NumberRank"
import { Image } from "@components/atoms/image"

const GameStatOverview = () => {
  const [data, setData] = useState<string>("")
  useMemo(() => {
    setData("This is test setting state")
  }, [])
  return (
    <div className="ml-20 w-full">
      <div className="mb-8 flex items-center">
        <p className="w-40 rounded-[5px] border-2 border-[#232329] py-1 text-center text-xs">
          MY GAME STATS OVERVIEW
        </p>
        <Divider className="mx-10 w-[40%]" />
      </div>
      <Card className="w-full rounded-[30px] bg-[#18181C] p-[12px]">
        <div className="grid grid-cols-3 grid-rows-1 rounded-[13px] bg-[#010101]">
          <div className="py-10 px-10">
            <NumberRank
              className="m-0 h-6 w-8 rounded-[5px]"
              index={0}
            />
            <h1 className="py-5 text-[#E1E2E2]">NAKAMOTOWARS</h1>
            <p className="text-xs text-[#70727B]">
              THERE ARE PLENTY OF UNKNOWNS IN
            </p>
          </div>
          <div className="my-8 mx-10 grid grid-cols-2 grid-rows-2 gap-5">
            <div>
              <p className="text-xs text-[#4E5057]">RANK</p>
              <button
                type="button"
                className="mt-2 rounded-[5px] border-2 border-[#232329] py-1 px-3 text-xs text-[#A6A9AE]"
              >
                PLATINUM
              </button>
            </div>
            <div>
              <p className="text-xs text-[#4E5057]">RANK SCORE</p>
              <button
                type="button"
                className="mt-2 rounded-[5px] border-2 border-[#232329] py-1 px-3 text-xs text-[#A6A9AE]"
              >
                2,345
              </button>
            </div>
            <div>
              <p className="text-xs text-[#4E5057]">PLAYED</p>
              <button
                type="button"
                className="mt-2 rounded-[5px] border-2 border-[#232329] py-1 px-3 text-xs text-[#A6A9AE]"
              >
                1,234
              </button>
            </div>
            <div>
              <p className="text-xs text-[#4E5057]">WINRATE</p>
              <button
                type="button"
                className="mt-2 rounded-[5px] border-2 border-[#232329] py-1 px-3 text-xs text-[#A6A9AE]"
              >
                99.45 %
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-1">
            <div className="my-3 w-36 ">
              <Image
                className="h-full w-full rounded-lg"
                src="/images/gameDetails/nakamoto-wars.webp"
                alt=""
              />
            </div>
            <div className="my-3 w-36">
              <Image
                className="h-full w-full rounded-[10px] border-2 border-[#232329] p-5"
                src="/images/gamePage/rank/platinum.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </Card>

      {/* <Stack spacing={2}>
        <Pagination
          count={Math.ceil(totalCount / limit)}
          hideNextButton
          hidePrevButton
          defaultPage={defaultPage ?? 1}
          page={page}
          variant="outlined"
          shape="rounded"
          size="large"
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: KeyboardArrowRightIcon,
                next: KeyboardArrowLeftIcon
              }}
              {...item}
            />
          )}
        />
      </Stack> */}
    </div>
  )
}

export default GameStatOverview
