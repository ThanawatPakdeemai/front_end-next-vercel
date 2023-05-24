import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import GameCarousel from "@components/molecules/gameSlide/GameCarousel"
import { onPlayingHeaderMenu } from "@constants/gameSlide"
import { IGetType } from "@feature/game/interfaces/IGameService"
import useGetRoomAvailable from "@feature/home/containers/hook/useGetRoomAvailable"
import {
  IRoomAvaliableData,
  IRoomAvaliableDataChannel
} from "@feature/home/interfaces/IHomeService"
import { useMemo, useState } from "react"

const OnPlaying = () => {
  const { gamesAvailble, isLoading } = useGetRoomAvailable()
  const [p2eCurType, setP2ECurType] = useState<IGetType>("all")

  const game = useMemo(() => {
    let load = false
    if (!load) {
      if (gamesAvailble) {
        const data = gamesAvailble?.filter((ele) => ele?.data?.length > 0)
        const combline: IRoomAvaliableData[] = []
        if (p2eCurType === "free-to-play") {
          data
            .filter((ele) => ele.chanel_type === "free2play")
            .map((elem) => combline.push(...elem.data))
        } else if (p2eCurType === "all") {
          data.map((elem: IRoomAvaliableDataChannel) =>
            combline.push(...elem.data)
          )
        } else {
          data
            .filter((ele) => ele.chanel_type !== "free2play")
            .map((elem) => combline.push(...elem.data))
        }
        const finalData = combline as unknown as IRoomAvaliableData[]
        return finalData
      }
      return []
    }
    return () => {
      load = true
    }
  }, [gamesAvailble, p2eCurType])

  return (
    <>
      <div className="my-2 h-full w-full lg:my-20">
        {game && !isLoading ? (
          <>
            <GameCarousel
              menu={onPlayingHeaderMenu}
              list={game as unknown as IRoomAvaliableData[]}
              curType={p2eCurType}
              setCurType={setP2ECurType}
              onPlaying
              showSlideCurrent={game?.length < 6 ? game?.length : 6}
            />
          </>
        ) : (
          <div className="flex gap-x-3">
            {[...Array(6)].map((ele) => (
              <SkeletonCard key={ele} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
export default OnPlaying
