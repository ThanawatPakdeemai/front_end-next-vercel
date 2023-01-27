import React, { memo, useState } from "react"
import { Card, Divider, InputAdornment, TextField } from "@mui/material"
import NumberRank from "@feature/ranking/components/atoms/NumberRank"
import { Image } from "@components/atoms/image"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import { v4 as uuidv4 } from "uuid"
import CrumbCustom from "@components/atoms/CrumbCustom"
import SearchIcon from "@components/icons/SearchIcon"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"

const GameStatOverview = () => {
  const [page, setPage] = useState<number>(1)
  const rankingMock = [
    {
      rank: 0,
      name: "NAKAMOTOWARS",
      detail: "THERE ARE PLENTY OF UNKNOWNS IN",
      rankName: "PLATINUM",
      rankScore: 2345,
      played: 1234,
      winrate: 99.45,
      image: "/images/gameDetails/nakamoto-wars.webp",
      imageRank: "/images/gamePage/rank/platinum.svg"
    },
    {
      rank: 1,
      name: "NAKAMOTOWARS",
      detail: "THERE ARE PLENTY OF UNKNOWNS IN",
      rankName: "PLATINUM",
      rankScore: 2345,
      played: 1234,
      winrate: 99.45,
      image: "/images/mocks/play2earnGames/duninutss_game.png",
      imageRank: "/images/gamePage/rank/platinum.svg"
    },
    {
      rank: 2,
      name: "NAKAMOTOWARS",
      detail: "THERE ARE PLENTY OF UNKNOWNS IN",
      rankName: "PLATINUM",
      rankScore: 2345,
      played: 1234,
      winrate: 99.45,
      image: "/images/gameDetails/nakamoto-wars.webp",
      imageRank: "/images/gamePage/rank/platinum.svg"
    },
    {
      rank: 3,
      name: "NAKAMOTOWARS",
      detail: "THERE ARE PLENTY OF UNKNOWNS IN",
      rankName: "PLATINUM",
      rankScore: 2345,
      played: 1234,
      winrate: 99.45,
      image: "/images/gameDetails/nakamoto-wars.webp",
      imageRank: "/images/gamePage/rank/platinum.svg"
    }
  ]

  return (
    <div className="w-full">
      <div className="my-[50px] flex items-center justify-between">
        <div className="flex">
          <CrumbCustom
            text="My GAME STATS OVERVIEW"
            background="text-neutral-400 border border-solid border-neutral-700 p-[20px] mr-0"
          />
        </div>
        {/* <div className="mx-4 border-t border-neutral-700 border-opacity-80" /> */}
        <Divider className="w-[40%]" />
        <div className="flex">
          <div className="mr-4 self-center text-xs uppercase">
            HIDE MY GAME STATS
          </div>
          <CrumbCustom
            text="View Emblems info"
            background="bg-purple-primary"
          />
        </div>
      </div>

      <div className="mb-10 flex w-full flex-col gap-2 rounded-[26px] bg-neutral-800 p-2">
        {rankingMock.map((item) => (
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
                index={item.rank}
              />
              <h1 className="py-5 text-neutral-300">{item.name}</h1>
              <p className="text-xs text-neutral-500">{item.detail}</p>
            </div>
            <div className="my-7 mx-10 grid grid-cols-2 grid-rows-2 gap-5">
              <div>
                <p className="text-xs text-neutral-600">RANK</p>
                <button
                  type="button"
                  className="mt-2 rounded-[5px] border-2 border-neutral-700 py-1 px-3 text-xs text-neutral-400"
                >
                  {item.rankName}
                </button>
              </div>
              <div>
                <p className="text-xs text-neutral-600">RANK SCORE</p>
                <button
                  type="button"
                  className="mt-2 rounded-[5px] border-2 border-neutral-700  py-1 px-3 text-xs text-neutral-400"
                >
                  {item.rankScore}
                </button>
              </div>
              <div>
                <p className="text-xs text-neutral-600">PLAYED</p>
                <button
                  type="button"
                  className="mt-2 rounded-[5px] border-2 border-neutral-700 py-1 px-3 text-xs text-neutral-400"
                >
                  {item.played}
                </button>
              </div>
              <div>
                <p className="text-xs text-neutral-600">WINRATE</p>
                <button
                  type="button"
                  className="mt-2 rounded-[5px] border-2 border-neutral-700  py-1 px-3 text-xs text-neutral-400"
                >
                  {item.winrate}%
                </button>
              </div>
            </div>
            <div className="flex">
              <div className="my-[10px] w-full">
                <Image
                  className="h-full w-full rounded-[15px]"
                  src={item.image}
                  alt=""
                />
              </div>
              <div className="my-[10px] mx-[10px] w-full rounded-[10px] border-2 border-neutral-700">
                <Image
                  className="ml-[10px] h-full w-full p-6"
                  src={item.imageRank}
                  alt=""
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex w-full justify-between">
        <PaginationNaka
          totalCount={rankingMock.length}
          limit={2}
          page={page}
          setPage={setPage}
        />
        <div>
          <TextField
            // label="Search Game..."
            sx={{
              input: {
                "&::placeholder": {
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

        {/* <TextField
          label="Room Name"
          placeholder="Room Name..."
          size="medium"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VisibilityOutlinedIcon />
              </InputAdornment>
            )
          }}
        /> */}

        {/* <div className="w-[20%] rounded-[10px] bg-[#18181C]">
          <button
            className="py-2 pl-5 text-[#70727B]"
            type="button"
          >
            Search Game...
            <SearchIcon />
          </button>
        </div>
        <div className="ml-2 w-[15%] rounded-[10px] bg-[#18181C]">
          <button
            className="flex py-2 pl-5 text-[#70727B]"
            type="button"
          >
            <VisibilityOutlinedIcon />
            Show
            <p className="ml-2 text-[#E1E2E2]">6</p>
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default memo(GameStatOverview)
