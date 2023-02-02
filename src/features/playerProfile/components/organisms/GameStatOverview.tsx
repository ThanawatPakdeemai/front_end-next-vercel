import React, { memo, useEffect, useState } from "react"
import { Card, InputAdornment, TextField } from "@mui/material"
import NumberRank from "@feature/ranking/components/atoms/NumberRank"
import { Image } from "@components/atoms/image"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import { v4 as uuidv4 } from "uuid"
import SearchIcon from "@components/icons/SearchIcon"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import useGetProfileInfo from "@feature/profile/containers/hook/getProfileInfo"
import useProfileStore from "@stores/profileStore"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import Helper from "@utils/helper"
import RankIcon from "../atoms/RankIcon"
import SliderGameStat from "./SliderGameStat"

const GameStatOverview = () => {
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const limit = 20
  const profile = useProfileStore((state) => state.profile)
  // const rankingMock = [
  //   {
  //     rank: 0,
  //     name: "NAKAMOTOWARS",
  //     detail: "THERE ARE PLENTY OF UNKNOWNS IN",
  //     rankName: "PLATINUM",
  //     rankScore: 2345,
  //     played: 1234,
  //     winrate: 99.45,
  //     image: "/images/gameDetails/nakamoto-wars.webp",
  //     imageRank: "/images/gamePage/rank/platinum.svg"
  //   },
  //   {
  //     rank: 1,
  //     name: "NAKAMOTOWARS",
  //     detail: "THERE ARE PLENTY OF UNKNOWNS IN",
  //     rankName: "PLATINUM",
  //     rankScore: 2345,
  //     played: 1234,
  //     winrate: 99.45,
  //     image: "/images/mocks/play2earnGames/duninutss_game.png",
  //     imageRank: "/images/gamePage/rank/platinum.svg"
  //   },
  //   {
  //     rank: 2,
  //     name: "NAKAMOTOWARS",
  //     detail: "THERE ARE PLENTY OF UNKNOWNS IN",
  //     rankName: "PLATINUM",
  //     rankScore: 2345,
  //     played: 1234,
  //     winrate: 99.45,
  //     image: "/images/gameDetails/nakamoto-wars.webp",
  //     imageRank: "/images/gamePage/rank/platinum.svg"
  //   },
  //   {
  //     rank: 3,
  //     name: "NAKAMOTOWARS",
  //     detail: "THERE ARE PLENTY OF UNKNOWNS IN",
  //     rankName: "PLATINUM",
  //     rankScore: 2345,
  //     played: 1234,
  //     winrate: 99.45,
  //     image: "/images/gameDetails/nakamoto-wars.webp",
  //     imageRank: "/images/gamePage/rank/platinum.svg"
  //   }
  // ]

  const [idPlayer, setIdPlayer] = useState<string>("")
  const { getProfileInfo, isLoading } = useGetProfileInfo({
    _limit: 20,
    _playerId: idPlayer,
    _page: page,
    _sort: "id"
  })

  const [openBadges, setOpenBadges] = useState<boolean>(false)

  const handleOnExpandClick = () => {
    setOpenBadges(!openBadges)
  }

  useEffect(() => {
    if (profile && profile.data) {
      setIdPlayer(profile.data.id as string)
    }
  }, [profile])

  // useEffect(() => {
  //   if (profile && profile.length > 0) {
  //     setTotalCount(data.length)
  //   }
  // }, [profile])

  useEffect(() => {
    if (getProfileInfo) {
      setTotalCount(getProfileInfo.data.game_data.length)
    }
  }, [getProfileInfo])

  // console.log("data", getProfileInfo?.data.game_data.length)
  return (
    <div className="w-full">
      <SliderGameStat
        openBadges={openBadges}
        handleOnExpandClick={handleOnExpandClick}
      />
      {openBadges ? null : (
        <>
          <div
            key={uuidv4()}
            className="mb-10 flex w-full flex-col gap-2 rounded-[26px] bg-neutral-800 p-2"
          >
            {isLoading
              ? [...Array(limit)].map(() => <SkeletonCard key={uuidv4()} />)
              : null}
            {getProfileInfo &&
              getProfileInfo.data.game_data.map((item, index) => (
                <Card
                  key={uuidv4()}
                  className="grid grid-cols-3 grid-rows-1 rounded-[18px] "
                  sx={{
                    backgroundImage: "none",
                    backgroundColor: "#010101"
                  }}
                >
                  <div className="py-10 px-10">
                    <NumberRank
                      className="m-0 h-6 w-8 rounded-[5px]"
                      index={index}
                    />
                    <h1 className="py-5 text-neutral-300">{item.name}</h1>
                    {item.story.length > 30 ? (
                      <p className="text-xs text-neutral-500">
                        {item.story.substring(0, 30)}ReadMore
                      </p>
                    ) : (
                      <p className="text-xs text-neutral-500">{item.story}</p>
                    )}
                  </div>
                  <div className="my-7 mx-10 grid grid-cols-2 grid-rows-2 gap-5">
                    <div>
                      <p className="text-xs text-neutral-600">RANK</p>
                      <button
                        type="button"
                        className="mt-2 rounded-[5px] border-2 border-neutral-700 py-1 px-3 text-xs text-neutral-400"
                      >
                        {item.rank}
                      </button>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-600">RANK SCORE</p>
                      <button
                        type="button"
                        className="mt-2 rounded-[5px] border-2 border-neutral-700  py-1 px-3 text-xs text-neutral-400"
                      >
                        {Helper.formatNumber(item.rankScore)}
                      </button>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-600">PLAYED</p>
                      <button
                        type="button"
                        className="mt-2 rounded-[5px] border-2 border-neutral-700 py-1 px-3 text-xs text-neutral-400"
                      >
                        {Helper.formatNumber(item.played)}
                      </button>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-600">WINRATE</p>
                      <button
                        type="button"
                        className="mt-2 rounded-[5px] border-2 border-neutral-700  py-1 px-3 text-xs text-neutral-400"
                      >
                        {item.winrate}
                      </button>
                    </div>
                  </div>
                  <div className="my-[10px] mr-[10px] flex gap-[10px]">
                    <div className="w-full">
                      <Image
                        className="h-full w-full rounded-[15px]"
                        src={item.image}
                        alt={item.name}
                        width={125}
                        height={125}
                      />
                    </div>
                    <div className="flex w-full items-center justify-center rounded-[10px] border-2 border-neutral-700">
                      <RankIcon
                        width={70}
                        height={70}
                        icon={item.rank}
                      />
                    </div>
                  </div>
                </Card>
              ))}
          </div>
          {/* Wait for API Support */}
          <div className="flex w-full justify-between">
            <PaginationNaka
              totalCount={totalCount}
              limit={limit}
              page={page}
              setPage={setPage}
            />
            <div>
              <TextField
                // label="Search Game..."
                sx={{
                  input: {
                    "&[type=text]": {
                      paddingLeft: "15px"
                    }
                  }
                }}
                placeholder="Search Game..."
                size="medium"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                // label="Show 6"
                className="ml-3"
                select
                placeholder="Show 6"
                // value={0}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VisibilityOutlinedIcon />
                    </InputAdornment>
                  )
                }}
              />
            </div>

            {/* {gameData && gameData.type_code === "multi_02" && (
          <TextField
            label="select map"
            select
            placeholder="select map..."
            value={0}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MapOutlined />
                </InputAdornment>
              )
            }}
          >
            {maps &&
              maps.map((option) => (
                <MenuItem
                  sx={{
                    borderRadius: 4
                  }}
                  key={}
                  value={2}
                  onClick={}
                >
                  {option.map_name}
                </MenuItem>
              ))}
          </TextField>
        )} */}
          </div>
        </>
      )}
    </div>
  )
}

export default memo(GameStatOverview)
