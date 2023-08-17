import { v4 as uuid } from "uuid"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import useRoomMulti from "@feature/game/containers/hooks/useRoomMulti"

const SkeletonEarnRewardMobile = dynamic(
  () => import("@mobile/components/atoms/skeleton/SkeletonEarnRewardMobile"),
  {
    suspense: true,
    ssr: true
  }
)
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: true
})
const ListJoinGame = dynamic(() => import("../../molecules/ListJoinGame"), {
  suspense: true,
  ssr: true
})

const MultiRoom = () => {
  const { dataRoom, data, handleJoinRoom, itemSelected, getRoomStatus } =
    useRoomMulti()
  return (
    <Box
      component="div"
      className="roomlist-multi__wrapper"
    >
      {data && (
        <Box
          component="div"
          className="roomlist-multi__content"
        >
          {!dataRoom && (
            <div className="flex flex-col gap-3">
              {[...Array(10)].map(() => (
                <SkeletonEarnRewardMobile key={uuid()} />
              ))}
            </div>
          )}

          {dataRoom && dataRoom.length === 0 && <NoData />}

          {dataRoom &&
            dataRoom.length > 0 &&
            dataRoom.map((item) => (
              <ListJoinGame
                time={item.end_time as unknown as string}
                key={item._id}
                image={data.image_room}
                name={data.game_type}
                desc={data.name}
                onClick={() => handleJoinRoom(item)}
                textChip={`#${item?.create_room_detail?.no_room?.toString()}`}
                descChip1={
                  data?.play_to_earn_status === "free"
                    ? ""
                    : `${itemSelected?.name || ""} ${
                        `/${itemSelected?.item_size}` || ""
                      }`
                }
                descChip2={`${item.amount_current_player} / ${item.max_players}`}
                btnText={getRoomStatus(item)}
              />
            ))}
        </Box>
      )}
    </Box>
  )
}

export default MultiRoom
