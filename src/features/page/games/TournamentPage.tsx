import { memo } from "react"
import TournamentProfile from "@components/molecules/tournament/TournamentProfile"
import TournamentReward from "@components/molecules/tournament/TournamentReward"
import RoundStatus from "@components/molecules/tournament/RoundStatus"
import StepRound from "@components/molecules/tournament/StepRound"
import QualifyingRound from "@components/molecules/tournament/QualifyingRound"
import TournamentRegister from "@components/molecules/tournament/TournamentRegister"
// import { Trans, useTranslation } from "react-i18next"
// import { ITournamentData, ITournamentRound } from "@src/types/tournament"
// import { IGame } from "@src/types/games"
// import useProfileStore from "@stores/profileStore"
// import {
//   getTournament,
//   checkPlayerTicket
// } from "@feature/tournament/containers/services/tournament.service"
// import { IResponseGameById } from "@src/types/response"
// import { getGameById } from "@feature/game/containers/services/game.service"
// import moment from "moment"

const TournamentPage = () => (
  // const { t } = useTranslation()
  // const [tournament, setTournament] = useState<ITournamentData>()
  // const [statusRegister, setStatusRegister] = useState<boolean>(false)
  // const [loaded, setLoaded] = useState<boolean>(true)
  // const [tournamentStatus, setTournamentStatus] = useState<string>("");
  // const [gameObject, setGameObject] = useState<IGame>()
  // const profile = useProfileStore((state) => state.profile.data)
  // const { profile } = getProfile()

  // const fetchGameById = async () => {
  //   if (tournament && tournament.games._id) {
  //     const game: any = await getGameById(tournament.games._id)
  //     if (game && game.data.length > 0) {
  //       setGameObject(game.data[0])
  //     }
  //   }
  // }

  // useEffect(() => {
  //   getTournament().then((res: any) => {
  //     if (res.data) {
  //       setTournament(res.data)
  //     }
  //   })
  // }, [])

  // useEffect(() => {
  //   if (tournament && tournament._id && profile) {
  //     checkPlayerTicket(tournament._id)
  //       .then((res: any) => {
  //         setTimeout(() => {
  //           setLoaded(false)
  //         }, 500)
  //         if (res) {
  //           if (res.data === true) {
  //             setStatusRegister(true)
  //           } else {
  //             setStatusRegister(false)
  //           }
  //         }
  //       })
  //       .catch(() => {
  //         setTimeout(() => {
  //           setLoaded(false)
  //         }, 500)
  //         setStatusRegister(false)
  //       })
  //   } else if (!profile) {
  //     setTimeout(() => {
  //       setLoaded(false)
  //     }, 500)
  //   }

  //   if (tournament) {
  //     fetchGameById()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [profile, tournament])

  /**
   * Finding round
   * - State
   * - Find current round status from tournament
   */
  // const [currentRound, setCurrentRound] = useState<ITournamentRound>()
  // const [dataRegisterRound, setDataRegiserRound] = useState<ITournamentRound>()
  // useEffect(() => {
  //   const current_round = tournament?.round.find(
  //     (item) => item.status === tournament.status
  //   ) // tournament.status
  //   const register_round = tournament?.round.find(
  //     (item) => item.status === "registration"
  //   )
  //   setCurrentRound(current_round)
  //   setDataRegiserRound(register_round)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [tournament, setCurrentRound])

  // <section className="tournament-wrapper">
  //   {tournament && tournament.status && statusRegister === true && profile ? (
  //     <>
  //       <div className="justify-content-between">
  //         <TournamentProfile
  //           tournament={tournament}
  //           profile={profile}
  //           statusRegister={statusRegister}
  //         />
  //       </div>
  //     </>
  //   ) : (
  //     tournament &&
  //     tournament.status &&
  //     statusRegister === false &&
  //     (currentRound &&
  //     currentRound.status !== "qualifying" &&
  //     moment().unix() <section moment(dataRegisterRound?.date_end).unix() ? (
  //       <>
  //         {tournament && (
  //           <div className="justify-content-between grid-cols-2">
  //             <TournamentProfile
  //               tournament={tournament}
  //               statusRegister={statusRegister}
  //             />
  //             {/* <TournamentRegister
  //               profile={profile || undefined}
  //               tournament={tournament}
  //             /> */}
  //           </div>
  //         )}
  //       </>
  //     ) : (
  //       <></>
  //     ))
  //   )}
  // </section>
  <div className="grid h-full w-full grid-cols-5 gap-4">
    <div className="col-span-5"> </div>
    <div className="col-span-3">
      <TournamentProfile />
      <TournamentReward />
    </div>
    <div className="col-span-2">
      <TournamentRegister />
      <RoundStatus />
    </div>
    <div className="col-span-5">
      <StepRound />
      <QualifyingRound />
    </div>
  </div>
)

export default memo(TournamentPage)
