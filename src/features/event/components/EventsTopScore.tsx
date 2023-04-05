import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  TableHead
} from "@mui/material"
import CardContent from "@feature/referral/components/CardContent"
import { IResponseTopScoreSummaryDataData } from "@feature/event/interface/IEventsService"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import { v4 as uuid } from "uuid"
import Image from "next/image"
import NoData from "@components/molecules/NoData"

interface IEventTopScoreProps {
  users: IResponseTopScoreSummaryDataData
}

const EventsTopScore = ({ users }: IEventTopScoreProps) => (
  <div className="md:w-4/6">
    <CardContent
      title="Top Score"
      icon={<TwitterIcon />}
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
            {users && users.data.length > 0 ? (
              users.data.map((user, index) => (
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
                      {user.amount_play}
                    </div>
                  </TableCell>
                  <TableCell className="rounded-r-xl text-end font-neue-machina-bold text-xs uppercase">
                    <div className="text-start text-[12px] text-varidian-default">
                      {user.max_score}
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
    </CardContent>
  </div>
)

export default EventsTopScore
