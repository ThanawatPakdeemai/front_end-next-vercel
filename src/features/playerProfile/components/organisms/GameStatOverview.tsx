import React, { memo, useEffect, useState } from "react"
import { Card, Chip, InputAdornment, TextField } from "@mui/material"
import NumberRank from "@feature/ranking/components/atoms/NumberRank"
import { Image } from "@components/atoms/image"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import { v4 as uuidv4 } from "uuid"
import SearchIcon from "@components/icons/SearchIcon"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import useGetProfileInfo from "@feature/profile/containers/hook/getProfileInfo"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import TooltipsCustom from "@components/atoms/TooltipsCustom"
import useLoadingStore from "@stores/loading"
import { motion } from "framer-motion"
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
  const { setOpen, setClose } = useLoadingStore()
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
    if (isLoading) {
      setOpen()
    } else {
      setClose()
    }
  }, [isLoading, setClose, setOpen])

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

  return (
    <div className="w-[90%]">
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
                      className="m-0 h-6 w-8 !rounded-[4px]"
                      index={index}
                    />
                    <h1 className="py-5 text-neutral-300">{item.name}</h1>
                    <p className=" text-xs text-neutral-500">
                      <TooltipsCustom
                        className="truncate hover:text-clip"
                        placement="bottom"
                        title={item.story}
                        color="error"
                      >
                        <div>{item.story}</div>
                      </TooltipsCustom>
                      {/* {item.story.substring(0, limitText)}
                      <button
                        className="ml-1 text-green-to"
                        type="button"
                        onClick={toggleBtn}
                      >
                        {isReadMoreShown ? item.story : "...Read More"}
                      </button> */}
                      {/* <TooltipsCustom
                        color="error"
                        title={item.story || "No Item"}
                        children={undefined}
                      /> */}
                    </p>
                  </div>
                  <div className="my-7 mx-10 grid grid-cols-2 grid-rows-2 gap-5">
                    <div>
                      <p className="text-xs text-neutral-600">RANK</p>
                      <Chip
                        label={item.rank}
                        variant="outlined"
                        size="small"
                        className="mt-2 cursor-pointer uppercase"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-600">RANK SCORE</p>
                      <Chip
                        label={Helper.formatNumber(item.rankScore)}
                        variant="outlined"
                        size="small"
                        className="mt-2 cursor-pointer uppercase"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-600">PLAYED</p>
                      <Chip
                        label={Helper.formatNumber(item.played)}
                        variant="outlined"
                        size="small"
                        className="mt-2 cursor-pointer uppercase"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-600">WINRATE</p>
                      <Chip
                        label={item.winrate}
                        variant="outlined"
                        size="small"
                        className="mt-2 cursor-pointer uppercase"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      className="h-40 w-40 rounded-[15px] object-cover"
                      src={item.image}
                      alt={item.name}
                      width={160}
                      height={160}
                    />
                    <div className="flex h-40 w-40 items-center justify-center rounded-[10px] border-[1px] border-solid border-neutral-700 ">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 4
                        }}
                      >
                        <RankIcon
                          width={70}
                          height={70}
                          icon={item.rank}
                        />
                      </motion.div>
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
