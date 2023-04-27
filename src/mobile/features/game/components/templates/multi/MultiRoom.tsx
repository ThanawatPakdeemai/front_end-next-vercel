import useRoomMulti from "@feature/game/containers/hooks/useRoomMulti"
import ModalCreateRoom from "@feature/rooms/components/molecules/ModalCreateRoom"
import ListJoinGame from "../../molecules/ListJoinGame"

const MultiRoom = () => {
  const { dataRoom, data, handleJoinRoom, itemSelected } = useRoomMulti()
  return (
    <>
      {data && (
        <>
          <ModalCreateRoom gameData={data} />
          {dataRoom &&
            dataRoom &&
            dataRoom?.map((item) => (
              <ListJoinGame
                key={item._id}
                image={data.image_room}
                name={data.game_type}
                desc={data.name}
                onClick={() => handleJoinRoom(item)}
                textChip={`#${item?.room_number?.toString()}`}
                descChip1={`${itemSelected?.name} / ${itemSelected?.item_size}`}
                descChip2={`${item.amount_played} / ${item.max_players}`}
              />
            ))}
        </>
      )}
    </>
  )
}

export default MultiRoom