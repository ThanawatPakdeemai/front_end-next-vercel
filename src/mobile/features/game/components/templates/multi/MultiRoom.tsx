import useRoomMulti from "@feature/game/containers/hooks/useRoomMulti"
import { v4 as uuid } from "uuid"
import ListJoinGame from "../../molecules/ListJoinGame"
import SkeletonEarnRewardMobile from "@mobile/components/atoms/skeleton/SkeletonEarnRewardMobile"
import { Box } from "@mui/material"

const MultiRoom = () => {
  const { dataRoom, data, handleJoinRoom, itemSelected } = useRoomMulti()
  return (
    <Box
      component={"div"}
      className="roomlist-multi__wrapper"
    >
      {data && (
        <Box
          component={"div"}
          className="roomlist-multi__content"
        >
          {dataRoom && dataRoom.length > 0 ? (
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
              />
            ))
          ) : (
            <div className="flex flex-col gap-3">
              {[...Array(10)].map(() => (
                <SkeletonEarnRewardMobile key={uuid()} />
              ))}
            </div>
          )}
        </Box>
      )}
    </Box>
  )
}

export default MultiRoom
