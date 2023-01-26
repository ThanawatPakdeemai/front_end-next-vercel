import React from "react"
import useModal from "@src/hooks/useModal"
import ConnectWalletModal from "@src/components/atoms/modal/ConnectWalletModal"
import { Login } from "@src/types/wallet"

interface ReturnType {
  onPresentConnectModal: () => void
}

// eslint-disable-next-line no-unused-vars
const useWalletModal = (login: Login, logout: () => void): ReturnType => {
  const [onPresentConnectModal] = useModal(<ConnectWalletModal login={login} />)
  return { onPresentConnectModal }
}

export default useWalletModal
