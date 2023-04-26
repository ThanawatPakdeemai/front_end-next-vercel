import useRoomSingle from "@feature/game/containers/hooks/useRoomSingle"
import ListJoinGame from "../../molecules/ListJoinGame"

const SingleRoom = () => {
  const { roomData, gameData, itemSelected, handleJoinRoom } = useRoomSingle()
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
            onClick={() => handleJoinRoom(item)}
            textChip={`#${item?.room_number?.toString()}`}
            descChip1={`${itemSelected?.name} / ${itemSelected?.item_size}`}
            descChip2={`${item.amount_played} / ${item.max_players}`}
          />
        ))}
    </>
  )
}

export default SingleRoom
