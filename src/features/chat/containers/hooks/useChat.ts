import useSocketWaitingRoom from "@feature/game/containers/hooks/useSocketWaitingRoom"

const useChat = () => {
  const handleInputChat = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      // onSend()
    }
  }

  return {
    handleInputChat
  }
}

export default useChat
