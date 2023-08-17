import React, { memo } from "react"
import dynamic from "next/dynamic"
import useGlobal from "@hooks/useGlobal"

const TournamentProfile = dynamic(
  () => import("@components/molecules/tournament/TournamentProfile")
)
const TournamentReward = dynamic(
  () => import("@components/molecules/tournament/TournamentReward")
)
const RoundStatus = dynamic(
  () => import("@components/molecules/tournament/RoundStatus")
)
const StepRound = dynamic(
  () => import("@components/molecules/tournament/StepRound")
)
const QualifyingRound = dynamic(
  () => import("@components/molecules/tournament/QualifyingRound")
)
const TournamentRegister = dynamic(
  () => import("@components/molecules/tournament/TournamentRegister")
)
const TournamentNewsSlide = dynamic(
  () => import("@feature/slider/components/templates/TournamentNewsSlide")
)
const CardTournamentSlider = dynamic(
  () => import("@feature/slider/components/molecules/CardTournamentSlider")
)
const TournamentList = dynamic(
  () => import("@feature/tournament/components/organisms/TournamentList")
)
const TournamentStatusPlayer = dynamic(
  () => import("@components/molecules/tournament/TournamentStatusPlayer")
)

const TournamentPage = () => {
  const { stateProfile } = useGlobal()

  // TODO: This is a temporary solution to hide the tournament page for non-admin users
  return stateProfile && stateProfile.role === "ADMIN" ? (
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
      <div className="col-span-5">
        <CardTournamentSlider />
      </div>
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
        <TournamentNewsSlide />
        <TournamentList />
        <TournamentStatusPlayer />
      </div>
    </div>
  ) : (
    <>Coming Soon...</>
  )
}

export default memo(TournamentPage)
