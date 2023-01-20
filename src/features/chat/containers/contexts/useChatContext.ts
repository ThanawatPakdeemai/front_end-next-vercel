import { useContext } from "react"
import { ChatContext } from "./ChatProvider"

function useChatContext() {
  const context = useContext(ChatContext)

  return context
}

export default useChatContext
