import useRoomSingle from "@feature/game/containers/hooks/useRoomSingle"
import ListJoinGame from "@mobile/features/game/components/molecules/ListJoinGame"
import { v4 as uuid } from "uuid"
import SkeletonEarnRewardMobile from "@mobile/components/atoms/skeleton/SkeletonEarnRewardMobile"
import { Box } from "@mui/material"

const SingleRoom = () => {
  const {
    roomData,
    gameData,
    itemSelected,
    handleJoinRoom,
    loadRoom,
    textJoin
  } = useRoomSingle()

  return (
    <Box
      component="div"
      className="roomlist-section grid grid-cols-1 gap-5"
    >
      {!loadRoom
        ? roomData &&
          gameData &&
          roomData.length > 0 &&
          roomData.map((_room) => (
            <ListJoinGame
              text={textJoin(_room)}
              time={_room.end_time as unknown as string}
              key={_room._id}
              image={gameData.image_room}
              name={gameData.game_type}
              desc={gameData.name}
              onClick={() => handleJoinRoom(_room)}
              textChip={`${_room?.room_number?.toString()}`}
              descChip1={
                gameData?.play_to_earn_status === "free" ||
                gameData.game_mode === "free-to-earn"
                  ? ""
                  : `${itemSelected?.name || ""} ${
                      `/${itemSelected?.item_size}` || ""
                    }`
              }
              descChip2={`${_room.amount_current_player} / ${_room.max_players}`}
            />
          ))
        : [...Array(10)].map(() => <SkeletonEarnRewardMobile key={uuid()} />)}
    </Box>
  )
}

export default SingleRoom
