/* eslint-disable jsx-a11y/alt-text */
import React, { memo } from "react"
import dynamic from "next/dynamic"

// Use dynamic import for the components
const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})
const ArrowDownwardIcon = dynamic(
  () => import("@mui/icons-material/ArrowDownward"),
  {
    suspense: true,
    ssr: true
  }
)

const TournamentProfile = () => (
  // const round = tournament.round.find(
  //   (item) => item.status === tournament.status
  // )

  // const router = useRouter().asPath.split("/")[2]
  // const pathname = location.pathname.split("/")[2]
  // const [gameObject, setGameObject] = useState<IGame>()
  // const [nextRound, setNextRound] = useState<INaxtround>()
  // const [count, setCount] = useState<number>(0)

  // useEffect(() => {
  //   setCount(count + 1)
  //   getGameById(tournament.games._id).then((res: IResponseGameById | any) => {
  //     if (res.data.length > 0) {
  //       setGameObject(res.data[0])
  //     }
  //   })

  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < tournament.round.length; i++) {
  //     if (round?.status === tournament.round[i].status) {
  //       setNextRound(tournament.round[i + 1])
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [nextRound])

  <div className="flex h-auto w-full flex-col rounded-md border border-neutral-780 bg-neutral-800">
    <div className="m-2 grid grid-cols-4 gap-4 rounded-md bg-neutral-900">
      <div className="img-game m-2">
        <Image
          src="/images/gamePage/ThumbnailSqaure.png"
          //  src={gameObject?.image_category_list}
          alt=""
          width={280}
          height={280}
          className="rounded-[9px]"
        />
      </div>
      <div className="text-game col-span-2 my-2 ">
        <h1 className="mb-4 text-xl uppercase text-neutral-300">
          Galactic grail Survival season 2
        </h1>
        {/* <h1 className="mb-4 text-4xl uppercase text-neutral-300">
            {tournament.games.name}
          </h1> */}
        <div className="flex flex-row border-t border-neutral-780 ">
          <div className="mt-4 flex flex-row  items-center ">
            <p className="mr-4 uppercase text-[#4E5057]"> GENRE </p>

            <div className="rounded-[8px]  border-2   border-neutral-700 px-2 py-[4px]  text-neutral-400">
              <p>ACTION</p>
            </div>
          </div>
        </div>
      </div>
      <div className="time-line-game m-2 flex  flex-col items-center justify-center rounded-md border border-neutral-780 bg-neutral-800 text-center  text-sm">
        <h1 className="my-2  uppercase">register Timeline</h1>
        <div className="mb-2 rounded-[8px]  border-2   border-neutral-700 bg-[#010101] px-2  py-[4px] text-neutral-400">
          <p className="uppercase ">29 JAN 2023</p>
          {/* <p className="uppercase">
              {tournament.date_start &&
                moment(tournament.date_start).format("DD MMM YYYY")}
            </p> */}
        </div>
        <ArrowDownwardIcon className="text-sm" />
        <div className="mt-2  rounded-[8px] border-2  border-neutral-700 bg-[#010101] px-2  py-[4px] text-neutral-400">
          <p className="uppercase">29 JAN 2023</p>
          {/* <p className="uppercase">
              {tournament.date_end &&
                moment(tournament.date_end).format("DD MMM YYYY")}
            </p> */}
        </div>
      </div>
    </div>
    <div className="how-to mb-8 p-4 text-neutral-500">
      <p>
        Game a master archer! Apple Shooter is an exciting and challenging
        archery game that tests players` aiming and accuracy skills. In the
        game, players must use their mouse.
      </p>
      {/* <p> {tournament.desc}</p> */}
    </div>
  </div>
)

export default memo(TournamentProfile)
