import useRoomMulti from "@feature/game/containers/hooks/useRoomMulti"
import Preload from "@src/mobile/components/atoms/Preload"
import ListJoinGame from "../../molecules/ListJoinGame"

const MultiRoom = () => {
  const { dataRoom, data, handleJoinRoom, itemSelected } = useRoomMulti()
  return (
    <>
      {data && (
        <>
          {dataRoom && dataRoom?.length > 0 ? (
            dataRoom?.map((item) => (
              <ListJoinGame
                time={item.end_time as unknown as string}
                key={item._id}
                image={data.image_room}
                name={data.game_type}
                desc={data.name}
                onClick={() => handleJoinRoom(item)}
                textChip={`#${item?.create_room_detail?.no_room?.toString()}`}
                descChip1={`${itemSelected?.name} / ${itemSelected?.item_size}`}
                descChip2={`${item.amount_current_player} / ${item.max_players}`}
              />
            ))
          ) : (
            <Preload />
          )}
        </>
      )}
    </>
  )
}

export default MultiRoom
