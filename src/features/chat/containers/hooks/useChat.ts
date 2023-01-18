import useSocketWaitingRoom from "@feature/game/containers/hooks/useSocketWaitingRoom"

const useChat = () => {
  const { onSend } = useSocketWaitingRoom({
    "_path": "8ballpool-f2p",
    "_roomId": "63c78f2170cf8168ab354508",
    "_profileId": "615d8646ef28627d2ff3da0d",
    "_gameId": "63636fb5c81000f1fbb2c0b2",
    _itemId: undefined
  })
  const handleInputChat = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onSend()
    }
  }

  return {
    handleInputChat
  }
}

export default useChat
