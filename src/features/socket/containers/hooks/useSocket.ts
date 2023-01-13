import { useCallback, useEffect, useRef, useState } from "react"
import { Manager, Socket } from "socket.io-client"
import {
  IUseSocket,
  dataSetupSocketRoomList
} from "@feature/socket/containers/socketSetup"
import useProfileStore from "@stores/profileStore"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import helper from "@utils/helper"
import CONFIGS from "@configs/index"

export function useSocket({ path, query }: IUseSocket) {
  const [isConnected, setIsConnected] = useState(false)

  const dataSetup = {
    query,
    extraHeaders: {
      Authorization: `Bearer ${helper.getLocalStorage("token")}`
    }
  }

  const setUp = new Manager(`${CONFIGS.BASE_URL.API}`, {
    ...dataSetupSocketRoomList,
    ...dataSetup
  })

  const socketInit = useRef<Socket>(setUp.socket(`/${path}`))

  const profile = useProfileStore((state) => state.profile.data)
  const { errorToast } = useToast()

  const onSetConnectedSocket = useCallback((_status: boolean) => {
    setIsConnected(_status)
  }, [])

  useEffect(() => {
    socketInit.current.on("connect_error", (err) => {
      if (err && err.message === "jwt expired") {
        errorToast(MESSAGES["error-socket"])
      }
    })

    return () => {}
  }, [errorToast, profile, socketInit])

  useEffect(() => {
    socketInit.current.on("connect", () => {
      if (socketInit.current.connected) {
        setIsConnected(true)
      }
    })

    return () => {
      setIsConnected(false)
    }
  }, [socketInit])

  return {
    socketInit: socketInit.current,
    isConnected,
    onSetConnectedSocket,
    setUp
  }
}
