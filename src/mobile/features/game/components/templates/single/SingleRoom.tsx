import useRoomSingle from "@feature/game/containers/hooks/useRoomSingle"
// import Preload from "@src/mobile/components/atoms/Preload"
import RoomListSkeleton from "@mobile/components/atoms/skelaton/RoomListSkeleton"
import ListJoinGame from "../../molecules/ListJoinGame"

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
    <>
      {!loadRoom ? (
        <>
          {roomData &&
            gameData &&
            roomData?.map((item) => (
              <ListJoinGame
                text={textJoin(item)}
                time={item.end_time as unknown as string}
                key={item._id}
                image={gameData.image_room}
                name={gameData.game_type}
                desc={gameData.name}
                onClick={() => handleJoinRoom(item)}
                textChip={`#${item?.room_number?.toString()}`}
                descChip1={
                  gameData?.play_to_earn_status === "free" ||
                  gameData.game_mode === "free-to-earn"
                    ? ""
                    : `${itemSelected?.name || ""} ${
                        `/ ${itemSelected?.item_size}` || ""
                      }`
                }
                descChip2={`${item.amount_current_player} / ${item.max_players}`}
              />
            ))}
        </>
      ) : (
        <RoomListSkeleton />
      )}
    </>
  )
}

export default SingleRoom
