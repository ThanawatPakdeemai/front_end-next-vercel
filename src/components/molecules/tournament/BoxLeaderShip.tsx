/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
import React from "react"
import { v4 as uuidv4 } from "uuid"
import BoxPlayer from "./BoxPlayer"

const BoxLeaderShip = ({ data }: any) => (
  <div
    key={uuidv4()}
    className="mb-4 grid w-full grid-cols-1 gap-4 rounded-[26px] px-6"
  >
    <div className="mb-4 grid w-full grid-cols-12 gap-4 uppercase">
      <div className="">
        <p>Rank</p>
      </div>
      <div className="col-span-3">
        <p>Player</p>
      </div>
      <div className="col-span-6">
        <p>Match total 7</p>
      </div>
      <div className="col-span-2">
        <p>sum score</p>
      </div>
    </div>
    {data.listplayer.map((list, index) => (
      <div className="mb-4 grid w-full grid-cols-12 content-center justify-items-start gap-4 uppercase ">
        <div className="flex  w-full rounded-[9px] border-2  border-neutral-700 bg-neutral-800  ">
          <div
            className={`m-1 w-full items-center rounded-[9px] p-2 text-center text-2xl text-neutral-900  ${
              list.player_id === 1
                ? "bg-error-main"
                : list.player_id === 2
                ? "bg-secondary-main"
                : list.player_id === 3
                ? "bg-success-main"
                : "bg-primary-main text-white-primary "
            }
                `}
          >
            <p className="pt-2">{list.player_id}</p>
          </div>
        </div>
        <div className="col-span-3 w-full">
          <BoxPlayer
            data={list}
            index={index}
          />
        </div>
        <div className="col-span-6">
          <div className="custom-scroll flex w-[48%] overflow-x-scroll pr-4 ">
            {list.game.map((game) => (
              <div className="mb-2 mr-2  flex w-[150px] flex-col rounded-[9px] border-2 border-neutral-700 bg-neutral-800  p-2 text-sm ">
                <div className="flex w-full justify-between">
                  <p>#{game.game}</p>
                  <p
                    className={`
                        ${
                          game.status === "win"
                            ? "text-green-lemon "
                            : game.status === "lose"
                            ? "text-error-main "
                            : game.status === "Waiting.."
                            ? "text-[#D5A9FF]"
                            : " text-neutral-600 "
                        }
                        `}
                  >
                    {game.status}
                  </p>
                </div>
                <p className="truncate">M frontend...</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex justify-center rounded-[9px] border-2 border-neutral-700 bg-black-100  p-1 text-base">
            <div className=" flex w-[150px] flex-col rounded-[9px] border-2 border-neutral-700 bg-neutral-800  px-2 py-1">
              <div className="flex w-full justify-between">
                <p className="text-white-primary ">Score</p>
                <p className="text-green-lemon ">{list.score}</p>
              </div>
              <div className="flex w-full justify-between">
                <p className="">Match</p>
                <p className="">
                  5<span className="text-white-primary ">/7</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)
export default BoxLeaderShip
