import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import { Box } from "@mui/material"

interface IProps {
  open?: boolean
  setClose?: () => void
}
const OrionTrade = ({ open, setClose }: IProps) => (
  <ModalCustom
    title="orion trade"
    open={open || false}
    onClose={setClose}
    width="500px"
  >
    <Box
      component="div"
      className="orion-trade--block rounded-xl p-5"
    >
      <div className="orion-trade--iframe relative min-h-[270px] overflow-hidden rounded-3xl">
        <iframe
          id="orion-widget"
          title="orion-widget"
          scrolling="no"
          height={389}
          width={314}
          className="w-full"
          allow="clipboard-write"
          src="https://trade.orionprotocol.io/widget?partnerId=71&defaultTheme=dark&assetFrom=usdt&assetTo=naka"
        />
      </div>
    </Box>
  </ModalCustom>
)

export default OrionTrade
