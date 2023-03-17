import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  TableHead
} from "@mui/material"
import EventCardContent from "@feature/event/components/EventCardContent"
import { IResponseLeaderBoardData } from "@feature/event/interface/IEventsService"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import { v4 as uuid } from "uuid"
import Image from "next/image"

interface IEventShareAndPlayProps {
  users: IResponseLeaderBoardData
}
const EventsShareAndPlay = ({ users }: IEventShareAndPlayProps) => (
  <div className="md:w-4/6">
    <EventCardContent
      title="Share and Play"
      icon={<TwitterIcon />}
      labels={{
        player_count: users?.player_count,
        transaction_count: users?.transaction_count
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Score Event</TableCell>
              <TableCell>Reward</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.new_data_player_score.length > 0 ? (
              users.new_data_player_score.map((user, index) => (
                <TableRow
                  key={uuid()}
                  className="rounded-xl border-b-[6px] border-neutral-800 bg-primary-main"
                >
                  <TableCell className="w-[300px] rounded-l-xl p-1 text-end font-neue-machina-bold text-xs uppercase">
                    <div className="flex items-center">
                      <div className="mr-2 flex h-[50px] w-[50px] items-center rounded-xl bg-neutral-800">
                        <div className="w-[50px] text-center font-neue-machina-bold text-[16px] text-white-primary">
                          {index + 1}
                        </div>
                      </div>
                      {user.country && (
                        <div className="mr-2 flex items-center rounded-xl bg-neutral-800">
                          <Image
                            src={`/assets/flags/4x3/${user.country}.svg`}
                            alt={user.country}
                            width={50}
                            height={50}
                            title={user.country && user.country.toUpperCase()}
                          />
                        </div>
                      )}
                      <div>{user.username}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-end font-neue-machina-bold text-xs uppercase">
                    <div className="text-start text-[12px] text-varidian-default">
                      {user.score_event}
                    </div>
                  </TableCell>
                  <TableCell className="rounded-r-xl text-end font-neue-machina-bold text-xs uppercase">
                    <div className="text-start text-[12px] text-varidian-default">
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
                  No Data
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
