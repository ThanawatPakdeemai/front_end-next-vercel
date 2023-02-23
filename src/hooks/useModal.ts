import { useCallback, useContext, useEffect } from "react"
import { Context } from "@src/contexts/ModalContext"
import { Handler } from "@src/types/modal"

const useModal = (
  // eslint-disable-next-line no-undef
  modal: React.ReactNode,
  closeOnOverlayClick = true
): [Handler, Handler] => {
  const { onPresent, onDismiss, setCloseOnOverlayClick } = useContext(Context)
  const onPresentCallback = useCallback(() => {
    onPresent(modal)
  }, [modal, onPresent])

  useEffect(() => {
    setCloseOnOverlayClick(closeOnOverlayClick)
  }, [closeOnOverlayClick, setCloseOnOverlayClick])

  return [onPresentCallback, onDismiss]
}

export default useModal
