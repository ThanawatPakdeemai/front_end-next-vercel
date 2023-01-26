import React from "react"
import { Login } from "@src/types/wallet"
import { Trans, useTranslation } from "next-i18next"
import Modal from "@src/components/atoms/modal/ModalBox"
import WalletCard from "@src/components/atoms/modal/components/WalletCard"
import config from "@src/constants/wallets"

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
        title={t("connected_your_wallet")}
        desc={t("connected_your_wallet_desc")}
        footer={t("connected_your_wallet_footer")}
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
