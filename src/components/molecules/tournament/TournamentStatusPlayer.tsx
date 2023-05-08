/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unreachable */
/* eslint-disable no-lone-blocks */
import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { PaginationNaka } from "@components/atoms/pagination"
import DropdownTournament from "@components/atoms/DropdownTournament"
import DropdownLimit from "@components/atoms/DropdownLimit"
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined"
import { listplays } from "@constants/listplayers"
import SearchIcon from "@components/icons/SearchIcon"
import { TextField } from "@mui/material"
import BoxPlayer from "./BoxPlayer"
import BoxLeaderShip from "./BoxLeaderShip"

const TournamentStatusPlayer = () => {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(20)
  const round: any = listplays[3]
  const roundshow = false
  return (
    <div className="my-4 flex w-full flex-col rounded-[9px]  border-2 border-neutral-700 p-2">
      <div
        className={`mb-4  flex w-full items-center
            justify-between rounded-[15px] border border-neutral-830  bg-neutral-800 text-center  text-neutral-300 `}
      >
        <div className="flex items-center pl-2 uppercase">
          <LanguageOutlinedIcon />
          <p className="px-2 ">{round.round}</p>
          <div className=" rounded-[8px]   border-2 border-neutral-700 bg-primary-main  px-2 py-[2px]  text-neutral-400">
            <p className="text-xs ">{round.player} PLAYERS</p>
          </div>
        </div>
        <div className="flex content-center items-center">
          <DropdownTournament
            className="mr-2 mt-[4px]"
            defaultValue="Current Round"
            list={["1", "2", "3"]}
          />
          {round.player === 7 ? null : (
            <TextField
              className="md:px-2"
              placeholder="Search player"
              InputProps={{
                style: {
                  fontSize: "14px",
                  fontFamily: "neueMachina",
                  width: "174px"
                },
                startAdornment: <SearchIcon className="mr-4" />
              }}
              onChange={(_event) => {
                const search = _event?.target?.value
              }}
            />
          )}
        </div>
      </div>
      {round.round === "LeaderShip" ? (
        <BoxLeaderShip data={round} />
      ) : round.round === "tree" ? (
        <div className="h-full w-full">
          <div className="grid grid-cols-4 justify-items-center uppercase">
            <div
              className={`flex h-2/3 w-3/4 items-center justify-center rounded-[8px] border border-neutral-830 ${
                roundshow
                  ? "bg-secondary-main text-primary-main "
                  : "bg-neutral-700 text-neutral-600"
              } p-2  text-center `}
            >
              <p>round 2</p>
            </div>
            <div
              className={`flex h-2/3 w-3/4 items-center justify-center rounded-[8px] border border-neutral-830 ${
                roundshow
                  ? "bg-secondary-main text-primary-main "
                  : "bg-neutral-700 text-neutral-600"
              } p-2  text-center `}
            >
              <p>round 3</p>
            </div>
            <div
              className={`flex h-2/3 w-3/4 items-center justify-center rounded-[8px] border border-neutral-830 ${
                roundshow
                  ? "bg-secondary-main text-primary-main "
                  : "bg-neutral-700 text-neutral-600"
              } p-2  text-center `}
            >
              <p>QUARTERFINALS</p>
            </div>
            <div
              className={`flex h-2/3 w-3/4 items-center justify-center rounded-[8px] border border-neutral-830 ${
                roundshow
                  ? "bg-secondary-main text-primary-main "
                  : "bg-neutral-700 text-neutral-600"
              } p-2  text-center `}
            >
              <p>SEMI FINAL</p>
            </div>

            <div className="flex w-full flex-col justify-around">
              {round.treeround[0].listplayer.map((data, index) => (
                <div className="mb-[2px] flex items-center justify-center">
                  <div className="my-4 flex  flex-col">
                    {data.player.map((player, index) => (
                      <div
                        className="flex flex-col items-center
            justify-center"
                      >
                        <BoxPlayer
                          data={player}
                          index={index}
                        />
                        {index === 0 && (
                          <p className="h-[10px] w-[2px] border border-neutral-700" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <p
                      className={`h-[2px] w-[22px] border ${
                        data.player[0].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />
                    <p
                      className={`ml-5 h-[40px] w-[2px] border ${
                        data.player[0].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />

                    <p
                      className={`ml-5 h-[40px] w-[2px] border ${
                        data.player[1].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />
                    <p
                      className={`h-[2px] w-[22px] border ${
                        data.player[1].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p
                      className={`h-[2px] w-[22px] border ${
                        data.player[0].status === "win" ||
                        data.player[1].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col justify-around ">
              {round.treeround[1].listplayer.map((data, index) => (
                <div className="relative flex items-center">
                  <p
                    className={`h-[185px] w-[2px] border ${
                      data.player ? "border-green-lemon" : "border-neutral-700"
                    }`}
                  />
                  <div className="flex flex-col">
                    <p
                      className={`h-[2px] w-[22px] border ${
                        data.player
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />
                  </div>
                  <div className="my-4 flex  flex-col">
                    {data.player.map((player, index) => (
                      <div
                        className="flex flex-col items-center
            justify-center"
                      >
                        <BoxPlayer
                          data={player}
                          index={index}
                        />
                        {index === 0 && (
                          <p className="h-[10px] w-[2px] border border-neutral-700" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <p
                      className={`h-[2px] w-[22px] border ${
                        data.player[0].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />
                    <p
                      className={`ml-5 h-[40px] w-[2px] border ${
                        data.player[0].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />

                    <p
                      className={`ml-5 h-[40px] w-[2px] border ${
                        data.player[1].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />
                    <p
                      className={`h-[2px] w-[22px] border ${
                        data.player[1].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p
                      className={`h-[2px] w-[22px] border ${
                        data.player[0].status === "win" ||
                        data.player[1].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />
                  </div>
                  <div className="absolute left-6 top-[-30px] mb-2 w-auto rounded-[8px]  border-2 border-neutral-700  bg-primary-main  px-2 py-[4px]  text-center text-neutral-400">
                    <p className="uppercase ">{round.treeround[1].roundname}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col justify-around">
              {round.treeround[2].listplayer.map((data, index) => (
                <div className="relative flex items-center ">
                  <p
                    className={`h-[371px] w-[2px] border ${
                      data.player ? "border-green-lemon" : "border-neutral-700"
                    }`}
                  />
                  <div className="flex flex-col">
                    <p
                      className={`h-[2px] w-[22px] border ${
                        data.player
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />
                  </div>
                  <div className="my-4 flex  flex-col">
                    {data.player.map((player, index) => (
                      <div
                        className="flex flex-col items-center
            justify-center"
                      >
                        <BoxPlayer
                          data={player}
                          index={index}
                        />
                        {index === 0 && (
                          <p className="h-[10px] w-[2px] border border-neutral-700" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <p
                      className={`h-[2px] w-[22px] border ${
                        data.player[0].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />
                    <p
                      className={`ml-5 h-[40px] w-[2px] border ${
                        data.player[0].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />

                    <p
                      className={`ml-5 h-[40px] w-[2px] border ${
                        data.player[1].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />
                    <p
                      className={`h-[2px] w-[22px] border ${
                        data.player[1].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p
                      className={`h-[2px] w-[22px] border ${
                        data.player[0].status === "win" ||
                        data.player[1].status === "win"
                          ? "border-green-lemon"
                          : "border-neutral-700"
                      }`}
                    />
                  </div>
                  <div className="absolute left-6 top-16 mb-2 w-auto rounded-[8px]  border-2 border-neutral-700  bg-primary-main  px-2 py-[4px]  text-center text-neutral-400">
                    <p className="uppercase ">{round.treeround[2].roundname}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col justify-around">
              {round.treeround[3].listplayer.map((data, index) => (
                <div className="relative flex items-center ">
                  <p
                    className={`h-[740px] w-[2px] border ${
                      data.player ? "border-green-lemon" : "border-neutral-700"
                    }`}
                  />
                  <p
                    className={`h-[2px] w-[22px] border ${
                      data.player ? "border-green-lemon" : "border-neutral-700"
                    }`}
                  />
                  <div className="static">
                    <div className="my-4 flex  flex-col">
                      {data.player.map((player, index) => (
                        <div
                          className="flex flex-col items-center
            justify-center"
                        >
                          <BoxPlayer
                            data={player}
                            index={index}
                          />
                          {index === 0 && (
                            <p className="h-[10px] w-[2px] border border-neutral-700" />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="absolute left-6 top-60 mb-2 w-auto rounded-[8px]  border-2 border-neutral-700  bg-green-lemon px-2 py-[4px]  text-center text-primary-main ">
                      <p className="uppercase ">Grand finAl</p>
                    </div>
                    <div className="absolute ">
                      <div className="absolute left-0 top-0 mb-2 w-auto rounded-[8px]  border-2 border-neutral-700  bg-info-main px-2 py-[4px]  text-center text-primary-main ">
                        <p className="uppercase ">3rd PLACE MATH</p>
                      </div>
                      <div className="my-4 mt-12  flex flex-col">
                        {data.player.map((player, index) => (
                          <div
                            className="flex flex-col items-center
            justify-center"
                          >
                            <BoxPlayer
                              data={player}
                              index={index}
                            />
                            {index === 0 && (
                              <p className="h-[10px] w-[2px] border border-neutral-700" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          key={uuidv4()}
          className="mb-4 grid w-full grid-cols-4 gap-4 rounded-[26px] px-6"
        >
          {round.listplayer.map((item, index) =>
            round.round === "List of qualifying round" ? (
              <BoxPlayer
                data={item}
                index={index}
              />
            ) : (
              <div className="flex flex-col items-center justify-center ">
                {item.player.map((player, index) => (
                  <>
                    <BoxPlayer
                      data={player}
                      index={index}
                    />
                    {index === 0 && (
                      <p className="h-[10px] border border-neutral-700" />
                    )}
                  </>
                ))}
              </div>
            )
          )}
        </div>
      )}
      {round.round === "tree" ? null : (
        <div className="mb-4 flex w-full justify-between px-6">
          <PaginationNaka
            totalCount={round?.listplayer.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
          <div className="flex">
            <DropdownLimit
              className=""
              defaultValue={limit}
              list={[20, 40, 80]}
              onChangeSelect={setLimit}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TournamentStatusPlayer
