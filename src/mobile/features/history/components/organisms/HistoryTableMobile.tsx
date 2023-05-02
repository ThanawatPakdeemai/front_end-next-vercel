/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react"
import { Table, TableContainer } from "@mui/material"
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
import Headerbackpage from "@src/mobile/features/Headerbackpage"

const HistoryTableMobile = () => {
  const profile = useProfileStore((state) => state.profile.data)
  // Hooks
  const { pager, hydrated } = useGlobal()
  const { handleClickView } = useHistoryController()
  const { limit, setLimit } = useTable()
  const { getHistoryData } = useHistory()

  // States
  const [skip, setSkip] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [hxHistory, setHxHistory] = useState<IHistory[]>([])
  const [playtoearn, setPlaytoearn] = useState<any[]>([])
  const [freetoplay, setFreetoplay] = useState<any[]>([])
  const [gametype, setGametype] = useState<string>("playtoearn")

  useEffect(() => {
    let load = false

    if (!load) {
      const fetchHistory = async () => {
        if (profile) {
          await getHistoryData({
            player_id: profile && profile.id ? profile.id : "",
            limit,
            skip
          }).then((res: any) => {
            if (res.data && res.data.length > 0) {
              // res.status === 200 -> ok
              setHxHistory(res.data)
              setPlaytoearn(
                res.data.filter(
                  (data: any) => data.game_mode === "play-to-earn"
                )
              )
              setFreetoplay(
                res.data.filter(
                  (data: IHistory) => data.game_mode === "free-to-play"
                )
              )
            }
            if (res.info) {
              setTotalCount(res.info.totalCount)
            }
          })
        }
      }
      fetchHistory()
    }

    return () => {
      load = true
    }
  }, [limit, skip, profile, getHistoryData])

  return (
    <>
      {hydrated && (
        <div className="mx-auto max-w-[678px]">
          <Headerbackpage text="Played History" />
          <div className="grid h-full w-full grid-cols-2 content-center justify-items-center gap-4">
            <div
              className={`flex w-full justify-center p-2 ${
                gametype === "playtoearn"
                  ? "bg-black-100 text-white-default"
                  : "bg-neutral-800 text-[#70727B]"
              }`}
              onClick={() => {
                setGametype("playtoearn")
              }}
            >
              Play to earn
            </div>
            <div
              className={`flex w-full justify-center p-2 ${
                gametype === "freetoplay"
                  ? "bg-black-100 text-white-default"
                  : "bg-neutral-800 text-[#70727B]"
              }`}
              onClick={() => {
                setGametype("freetoplay")
              }}
            >
              Free to play
            </div>
          </div>
          {hxHistory && hxHistory.length > 0 ? (
            gametype === "playtoearn" ? (
              <TableContainer
                sx={{
                  borderRadius: "14px"
                }}
                className="mb-10 bg-black-100 p-2"
              >
                <Table className="w-full flex-col">
                  {playtoearn.map((data: any) => (
                    <div
                      className="flex border-b-2 border-neutral-800 py-4"
                      onClick={() => handleClickView(data)}
                    >
                      <div className="relative">
                        <Image
                          src={data.game_detail.image_category_list}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="ml-2  flex w-full flex-col content-center items-start justify-between uppercase">
                        <div className="flex w-full justify-between">
                          <div className="flex">
                            <p className="mr-2 rounded bg-error-main p-[4px] text-xs text-black-100">
                              play to earn
                            </p>
                          </div>
                          <p className="text-[8px] text-neutral-600">
                            LAST PLAYED:
                            <br />
                            {dayjs(data.createdAt).format("DD MMM YYYY")}
                          </p>
                        </div>
                        <p className="text-base text-white-default">
                          {data.game_detail.name}
                        </p>
                        <p className="Properties flex text-xs text-neutral-600">
                          PLAY: {data.game_detail.number_of_played}
                          <div className="border-indigo-500 mx-2 border-l" />
                          WON : {data.game_detail.reward_item_amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </Table>
              </TableContainer>
            ) : (
              <TableContainer
                sx={{
                  borderRadius: "14px"
                }}
                className="mb-10 bg-black-100 p-2"
              >
                <Table className="w-full flex-col">
                  {freetoplay.map((data: any) => (
                    <div
                      className="flex border-b-2 border-neutral-800 py-4"
                      onClick={() => handleClickView(data)}
                    >
                      <div className="relative">
                        <Image
                          src={data.game_detail.image_category_list}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="ml-2  flex w-full flex-col content-center items-start justify-between uppercase">
                        <div className="flex w-full justify-between">
                          <div className="flex">
                            <p className="mr-2 rounded bg-secondary-main p-[4px] text-xs text-black-100">
                              free to play
                            </p>
                          </div>
                          <p className="text-[8px] text-neutral-600">
                            LAST PLAYED:
                            <br />
                            {dayjs(data.createdAt).format("DD MMM YYYY")}
                          </p>
                        </div>
                        <p className="text-base text-white-default">
                          {data.game_detail.name}
                        </p>
                        <p className="Class Properties flex text-xs text-neutral-600">
                          PLAY: {data.game_detail.number_of_played}
                          <div className="border-indigo-500 mx-2 border-l" />
                          WON : {data.game_detail.reward_item_amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </Table>
              </TableContainer>
            )
          ) : (
            <NoData />
          )}

          <div className="my-2 flex justify-between md:my-5 md:w-[678px]">
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
