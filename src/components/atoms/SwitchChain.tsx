import { Typography } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import { useWeb3Provider } from "@providers/Web3Provider"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ButtonToggleIcon = dynamic(
  () => import("@components/molecules/gameSlide/ButtonToggleIcon"),
  {
    suspense: true,
    ssr: false
  }
)

interface ISwitchChainProps {
  variant: "full" | "simple" | "mini" | "text"
  text?: string
  submitText?: string
  chainName?: string
  className?: string
  handleClick: () => void
}
const SwitchChain = ({
  variant = "full",
  chainName = "Polygon",
  submitText = "Switch Chain",
  className = "mt-3 h-[40px] bg-secondary-main text-sm",
  handleClick = () => {}
}: ISwitchChainProps) => {
  const { signer } = useWeb3Provider()
  const { t } = useTranslation()

  const name = signer?.provider?._network?.name.includes("bnb")
    ? "Binance"
    : "Polygon"
  /**
   * @description switch chain content
   */
  const SwitchChainContent = () => {
    switch (variant) {
      case "full":
        return (
          <div className="mt-6">
            <Typography
              variant="h3"
              className="switch-chain--subtitle text-center"
            >
              You are in the
              <span className="mx-2 inline-block rounded-sm bg-neutral-700 px-2 pb-1 pt-2">
                {name ?? chainName}
              </span>
              network, please switch network
            </Typography>
            <ButtonToggleIcon
              startIcon={
                <Icomoon className="icon-Full-Arrow-Right text-[#F1F4F4]" />
              }
              text={submitText}
              type="button"
              className={`${className} switch-chain--label font-neue-machina-semi text-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-600`}
              handleClick={handleClick}
            />
          </div>
        )

      case "simple":
        return (
          <div className="mt-6">
            {chainName && (
              <Typography
                variant="h3"
                className="switch-chain--subtitle text-center"
              >
                You are in the
                <span className="mx-2 inline-block rounded-sm bg-neutral-700 px-2 pb-1 pt-2">
                  {chainName}
                </span>
              </Typography>
            )}

            <ButtonToggleIcon
              startIcon={
                <Icomoon className="icon-Full-Arrow-Right text-[#F1F4F4]" />
              }
              text={submitText}
              type="button"
              className={`${className} switch-chain--label font-neue-machina-semi text-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-600`}
              handleClick={handleClick}
            />
          </div>
        )

      case "mini":
        return (
          <ButtonToggleIcon
            startIcon={
              <Icomoon className="icon-Full-Arrow-Right text-[#F1F4F4]" />
            }
            text={submitText}
            type="button"
            className={`${className} switch-chain--label font-neue-machina-semi text-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-600`}
            handleClick={handleClick}
          />
        )

      case "text":
        return (
          <Typography className="whitespace-nowrap text-xs text-white-primary">
            {t("swap")}
          </Typography>
        )

      default:
        return <></>
    }
  }

  return SwitchChainContent()
}
export default SwitchChain
