import React from "react"
import dynamic from "next/dynamic"
import { Box } from "@mui/material"

const SwitchChain = dynamic(() => import("@components/atoms/SwitchChain"), {
  suspense: true,
  ssr: false
})
const BaseToastComponent = dynamic(
  () =>
    import("@feature/toast/components").then((mod) => mod.BaseToastComponent),
  {
    suspense: true,
    ssr: false
  }
)

interface IInformSwitchChainProps {
  message: string
  tokenName: string
  handleClick: () => void
}

const InformSwitchChain = ({
  message,
  tokenName,
  handleClick
}: IInformSwitchChainProps) => (
  <Box
    component="div"
    sx={{
      ".MuiTypography-root": {
        fontSize: "90%"
      },
      ".MuiAlert-action": {
        display: "none"
      },
      ".switch-chain--subtitle": {
        fontSize: "80%"
      }
    }}
  >
    <BaseToastComponent
      text={message}
      status="info"
      onClose={() => {}}
      className="mt-10 w-full"
    />
    <div className="m-2 flex flex-col items-center justify-center md:col-span-5">
      <SwitchChain
        variant="simple"
        chainName={tokenName}
        handleClick={handleClick}
      />
    </div>
  </Box>
)

export default InformSwitchChain
