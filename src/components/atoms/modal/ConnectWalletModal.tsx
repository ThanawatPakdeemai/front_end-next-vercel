import React from "react"
import { Login } from "@src/types/wallet"
import { Trans, useTranslation } from "next-i18next"
import config from "@src/constants/wallets"
import dynamic from "next/dynamic"

const Modal = dynamic(() => import("@src/components/atoms/modal/ModalBox"), {
  suspense: true,
  ssr: true
})
const WalletCard = dynamic(
  () => import("@src/components/atoms/modal/components/WalletCard"),
  {
    suspense: true,
    ssr: true
  }
)

interface Props {
  login: Login
  onDismiss?: () => void
}

const ConnectWalletModal: React.FC<Props> = ({
  login,
  onDismiss = () => null
}) => {
  const { t } = useTranslation()
  return (
    <Trans>
      <Modal
        title={t("connected_your_wallet") ?? ""}
        desc={t("connected_your_wallet_desc") ?? ""}
        footer={t("connected_your_wallet_footer") ?? ""}
        onDismiss={onDismiss}
      >
        {config.map((entry) => (
          <WalletCard
            key={entry.title}
            login={login}
            walletConfig={entry}
            onDismiss={onDismiss}
          />
        ))}
      </Modal>
    </Trans>
  )
}

export default ConnectWalletModal
