/* eslint-disable max-len */
import React from "react"
import { v4 as uuid } from "uuid"
import dynamic from "next/dynamic"
import { INewDataPlayerScore } from "@feature/event/interface/IEventsService"

const Table = dynamic(() => import("@mui/material/Table"), {
  suspense: true,
  ssr: false
})
const TableBody = dynamic(() => import("@mui/material/TableBody"), {
  suspense: true,
  ssr: false
})
const TableContainer = dynamic(() => import("@mui/material/TableContainer"), {
  suspense: true,
  ssr: false
})
const TableRow = dynamic(() => import("@mui/material/TableRow"), {
  suspense: true,
  ssr: false
})
const TableCell = dynamic(() => import("@mui/material/TableCell"), {
  suspense: true,
  ssr: false
})
const TableHead = dynamic(() => import("@mui/material/TableHead"), {
  suspense: true,
  ssr: false
})
const EventCardContent = dynamic(
  () => import("@feature/event/components/EventCardContent"),
  {
    suspense: true,
    ssr: false
  }
)
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IEventShareAndPlayProps {
  users: INewDataPlayerScore[]
  playerCount: number
  transactionCount: number
}
const EventsShareAndPlay = ({
  users,
  playerCount,
  transactionCount
}: IEventShareAndPlayProps) => (
  <div className="w-full">
    <EventCardContent
      title="Share and Play"
      icon={<Icomoon className="icon-twitter" />}
      labels={{
        player_count: playerCount,
        transaction_count: transactionCount
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Score Event</TableCell>
              <TableCell className="w-[125px]">Reward</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <TableRow
                  key={uuid()}
                  className="rounded-xl border-b-[6px] border-neutral-800 bg-primary-main"
                >
                  <TableCell className="w-[300px] rounded-l-xl p-1 text-end font-neue-machina-bold text-xs uppercase">
                    <div className="flex items-center">
                      <div className="mr-2">
                        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[4px] border-[1px] border-[#18181C] bg-[#101013] text-center font-neue-machina-bold text-[10px] text-white-primary">
                          {index + 1}
                        </div>
                      </div>
                      <div>{user.username}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-end font-neue-machina-bold text-xs uppercase">
                    <div className="text-start text-[12px]">
                      {user.score_event}
                    </div>
                  </TableCell>
                  <TableCell className="rounded-r-xl text-end font-neue-machina-bold text-xs uppercase">
                    <div className="text-start text-[12px] text-warning-dark">
                      {user.reward_for_player}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="justify-center rounded-lg border border-neutral-800 bg-neutral-700 py-3 text-center"
                >
                  <NoData />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </EventCardContent>
  </div>
)

export default EventsShareAndPlay
