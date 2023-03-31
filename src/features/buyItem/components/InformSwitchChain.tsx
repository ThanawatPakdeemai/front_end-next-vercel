import SwitchChain from "@components/atoms/SwitchChain"
import { BaseToastComponent } from "@feature/toast/components"
import { Box } from "@mui/material"

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
