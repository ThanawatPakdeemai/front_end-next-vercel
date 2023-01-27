/* eslint-disable no-use-before-define */
import React, { createContext, useState } from "react"
import styled from "styled-components"

export type Handler = () => void
interface ModalsContext {
  // eslint-disable-next-line no-unused-vars
  onPresent: (node: React.ReactNode, key?: string) => void
  onDismiss: Handler
  setCloseOnOverlayClick: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = createContext<ModalsContext>({
  onPresent: () => null,
  onDismiss: () => null,
  setCloseOnOverlayClick: () => true
})

const ModalProvider: React.FC = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalNode, setModalNode] = useState<React.ReactNode>()
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true)

  const handlePresent = (node: React.ReactNode) => {
    setModalNode(node)
    setIsOpen(true)
  }

  const handleDismiss = () => {
    setModalNode(undefined)
    setIsOpen(false)
  }

  const handleOverlayDismiss = () => {
    if (closeOnOverlayClick) {
      handleDismiss()
    }
  }

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        onPresent: handlePresent,
        onDismiss: handleDismiss,
        setCloseOnOverlayClick
      }}
    >
      {isOpen && (
        // eslint-disable-next-line no-use-before-define
        <ModalWrapper>
          <Overlay onClick={handleOverlayDismiss} />
          {/* {React.isValidElement(modalNode) && React.cloneElement(modalNode)} */}
          {React.isValidElement(modalNode) &&
            React.cloneElement(modalNode as React.ReactElement, {
              onDismiss: handleDismiss
            })}
        </ModalWrapper>
      )}
      {children}
    </Context.Provider>
  )
}

const ModalWrapper = styled.div`
  background: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  z-index: 99;
`

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 8;
  top: 0;
  left: 0;
`

export default ModalProvider
