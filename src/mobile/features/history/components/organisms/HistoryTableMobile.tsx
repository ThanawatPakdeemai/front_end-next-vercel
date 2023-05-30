/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react"
import { Box, Table, TableContainer } from "@mui/material"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import useHistory from "@feature/history/containers/hook/useHistory"
import dayjs from "dayjs"
import DropdownLimit from "@components/atoms/DropdownLimit"
import useHistoryController from "@feature/history/containers/hook/useHistoryController"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import useTable from "@feature/table/containers/hooks/useTable"
import { IHistory } from "@feature/history/interfaces/IHistoryService"
import NoData from "@components/molecules/NoData"
import { Image } from "@components/atoms/image/index"
import HeaderForWardBackWardMobile from "@mobile/components/atoms/headerMenu/HeaderForWardBackWardMobile"
import { useRouter } from "next/router"

const GameItem = ({ data, onClickView }) => {
  const { game_mode, createdAt, game_detail } = data
  const isPlayToEarn = game_mode === "play-to-earn"

  return (
    <Box
      component="div"
      className="flex border-b-2 border-neutral-800 py-4"
      onClick={() => onClickView(data)}
    >
      <Box
        component="div"
        className="relative"
      >
        <Image
          src={game_detail.image_category_list}
          alt=""
          width={100}
          height={100}
        />
      </Box>
      <Box
        component="div"
        className="ml-2  flex w-full flex-col content-center items-start justify-between uppercase"
      >
        <Box
          component="div"
          className="flex w-full justify-between"
        >
          <Box
            component="div"
            className="flex"
          >
            <p
              className={`mr-2 rounded ${
                isPlayToEarn ? "bg-error-main" : "bg-secondary-main"
              } p-[4px] text-xs text-black-100`}
            >
              {isPlayToEarn ? "play to earn" : "free to play"}
            </p>
          </Box>
          <p className="text-[8px] text-neutral-600">
            LAST PLAYED:
            <br />
            {dayjs(createdAt).format("DD MMM YYYY")}
          </p>
        </Box>
        <p className="text-base text-white-default">{game_detail.name}</p>
        <p className="Properties flex text-xs text-neutral-600">
          PLAY: {game_detail.number_of_played}
          <Box
            component="div"
            className="border-indigo-500 mx-2 border-l"
          />
          WON : {game_detail.reward_item_amount}
        </p>
      </Box>
    </Box>
  )
}

const HistoryTableMobile = () => {
  const profile = useProfileStore((state) => state.profile.data)
  // Hooks
  const { pager, hydrated } = useGlobal()
  const { handleClickView } = useHistoryController()
  const { limit, setLimit } = useTable()
  const { getHistoryData } = useHistory()
  const router = useRouter()

  // States
  const [skip, setSkip] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [hxHistory, setHxHistory] = useState<IHistory[]>([])
  const [playToEarn, setPlayToEarn] = useState<IHistory[]>([])
  const [freeToPlay, setFreeToPlay] = useState<IHistory[]>([])
  const [gameType, setGameType] = useState<string>("playtoearn")

  useEffect(() => {
    let load = false

    if (!load) {
      const fetchHistory = async () => {
        if (profile) {
          const res = await getHistoryData({
            player_id: profile?.id || "",
            limit,
            skip
          })

          if (res.data && res.data.length > 0) {
            setHxHistory(res.data)
            setPlayToEarn(
              res.data.filter((data) => data.game_mode === "play-to-earn")
            )
            setFreeToPlay(
              res.data.filter((data) => data.game_mode === "free-to-play")
            )
          }

          if (res.info) {
            setTotalCount(res.info.totalCount)
          }
        }
      }

      fetchHistory()
    }

    return () => {
      load = true
    }
  }, [limit, skip, profile, getHistoryData])

  const handleGameTypeChange = (type: string) => {
    setGameType(type)
  }

  return (
    <>
      {hydrated && (
        <div className="mx-auto max-w-[678px]">
          <HeaderForWardBackWardMobile
            label="Played History"
            onClickBackWard={() => router.back()}
            showForwardIcon={false}
          />
          <div className="grid h-full w-full grid-cols-2 content-center justify-items-center gap-4">
            <Box
              component="div"
              className={`flex w-full justify-center p-2 ${
                gameType === "playtoearn"
                  ? "bg-black-100 text-white-default"
                  : "bg-neutral-800 text-[#70727B]"
              }`}
              onClick={() => handleGameTypeChange("playtoearn")}
            >
              Play to earn
            </Box>
            <Box
              component="div"
              className={`flex w-full justify-center p-2 ${
                gameType === "freetoplay"
                  ? "bg-black-100 text-white-default"
                  : "bg-neutral-800 text-[#70727B]"
              }`}
              onClick={() => handleGameTypeChange("freetoplay")}
            >
              Free to play
            </Box>
          </div>
          {hxHistory && hxHistory.length > 0 ? (
            gameType === "playtoearn" ? (
              <TableContainer
                sx={{ borderRadius: "14px" }}
                className="mb-10 bg-black-100 p-2"
              >
                <Table className="w-full flex-col">
                  {playToEarn.map((data: IHistory) => (
                    <GameItem
                      key={data._id}
                      data={data}
                      onClickView={handleClickView}
                    />
                  ))}
                </Table>
              </TableContainer>
            ) : (
              <TableContainer
                sx={{ borderRadius: "14px" }}
                className="mb-10 bg-black-100 p-2"
              >
                <Table className="w-full flex-col">
                  {freeToPlay.map((data: IHistory) => (
                    <GameItem
                      key={data._id}
                      data={data}
                      onClickView={handleClickView}
                    />
                  ))}
                </Table>
              </TableContainer>
            )
          ) : (
            <NoData />
          )}

          <div className="y-2·flex·justify-between·md:my-5·md:w-[678px]">
            <PaginationNaka
              totalCount={totalCount}
              limit={limit}
              page={skip}
              setPage={setSkip}
            />
            <DropdownLimit
              className="m-0 w-[160px] flex-row"
              defaultValue={12}
              list={pager}
              onChangeSelect={setLimit}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default HistoryTableMobile
