import useRoomSingle from "@feature/game/containers/hooks/useRoomSingle"
import { useMemo } from "react"
import ListJoinGame from "../../molecules/ListJoinGame"

const SingleRoom = () => {
  const { allGameRooms, allGameRoomsById, profile, gameData, itemSelected } =
    useRoomSingle()

  const roomData = useMemo(() => {
    if (profile) {
      return allGameRooms
    }
    return allGameRoomsById
  }, [allGameRooms, allGameRoomsById, profile])

  return (
    <>
      {roomData &&
        gameData &&
        roomData?.map((item) => (
          <ListJoinGame
            key={item._id}
            image={gameData.image_room}
            name={gameData.game_type}
            desc={gameData.name}
            onClick={() => {}}
            textChip={item._id}
            descChip1={
              itemSelected?._id === item.item_id ? itemSelected.item_size : ""
            }
            descChip2={`${item.amount_played} / ${item.max_players}`}
          />
        ))}
    </>
  )
}

export default SingleRoom
