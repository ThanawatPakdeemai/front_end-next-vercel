import React from "react"
import dynamic from "next/dynamic"
import {
  ModalClose,
  ModalContent,
  ModalDesc,
  ModalFooter,
  ModalHeader,
  ModalMain,
  ModalTitle,
  ModalWrapper
} from "@src/styles/themes/partial/modal"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface Props {
  title?: string
  titleSize?: "small" | "medium"
  desc?: string
  footer?: string
  closeable?: boolean
  children: React.ReactNode
  onDismiss?: () => void
  isFooter?: boolean
  style?: React.CSSProperties
}

const ModalBox: React.FC<Props> = ({
  title,
  desc,
  footer,
  onDismiss,
  children,
  closeable = true,
  isFooter = true
}) => (
  <ModalWrapper>
    <ModalMain className="modal-box">
      <ModalHeader>
        {title === "Buy NAKA" ? (
          <ModalTitle className="flex items-center">
            {title}{" "}
            <Image
              src="/assets/images/icons/icon-naka.svg"
              alt="Paris"
              className="iconnaka"
              width={32}
              height={15}
            />
          </ModalTitle>
        ) : (
          <ModalTitle>{title} </ModalTitle>
        )}
        <ModalDesc dangerouslySetInnerHTML={{ __html: desc || "" }} />
      </ModalHeader>
      <ModalContent>{children}</ModalContent>
      {isFooter && (
        <ModalFooter dangerouslySetInnerHTML={{ __html: footer || "" }} />
      )}
      {closeable && (
        <ModalClose
          onClick={onDismiss}
          className="button-close"
        >
          <Icomoon className="icon-Close" />
        </ModalClose>
      )}
    </ModalMain>
  </ModalWrapper>
)

export default ModalBox
