import useRoomSingle from "@feature/game/containers/hooks/useRoomSingle"
import Preload from "@src/mobile/components/atoms/Preload"
import ListJoinGame from "../../molecules/ListJoinGame"

const SingleRoom = () => {
  const { roomData, gameData, itemSelected, handleJoinRoom, loadRoom } =
    useRoomSingle()

  return (
    <>
      {!loadRoom ? (
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
                descChip2={`${item.amount_current_player} / ${item.max_players}`}
              />
            ))}
        </>
      ) : (
        <Preload />
      )}
    </>
  )
}

export default SingleRoom
