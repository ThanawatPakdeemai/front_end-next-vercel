import { memo } from "react"
import { Image } from "@components/atoms/image"
import { Box } from "@mui/material"
import { Trans } from "react-i18next"

interface IProp {
  handleButton: () => void
  title: string
}
const ButtonWallet = ({ handleButton, title }: IProp) => (
  <>
    <Box
      component="button"
      sx={{
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.05), inset 0px -1px 1px rgba(0, 0, 0, 0.25)"
      }}
      type="button"
      className={`flex rounded-3xl p-3 text-primary-main sm:ml-2 ${
        title === "withdraw" ? "bg-error-main" : "bg-varidian-default"
      }`}
      onClick={() => handleButton()}
    >
      <Image
        src={`${
          title === "withdraw"
            ? "/images/Profile/Wallet/icon-withdeaw.png"
            : "/images/Profile/Wallet/icon-deposit.png"
        }`}
        alt=""
        width={20}
        height={20}
      />
      <p className="ml-4 mr-2 font-bold uppercase">
        <Trans i18nKey={title} />
      </p>
    </Box>
  </>
)

export default memo(ButtonWallet)
