import { Stack } from "@mui/material"
import { memo } from "react"
import dynamic from "next/dynamic"

const ModalCustom = dynamic(
  () => import("@components/molecules/Modal/ModalCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const ModalHeader = dynamic(
  () => import("@components/molecules/Modal/ModalHeader"),
  {
    suspense: true,
    ssr: false
  }
)

export interface IModalProps {
  open: boolean
  handleClose: () => void
}

const StakingModal = ({ open, handleClose }: IModalProps) => (
  <ModalCustom
    open={open}
    onClose={handleClose}
    className="mx-auto h-auto w-full gap-3 rounded-[34px] bg-[rgba[1,1,1,0.2]] p-[10px] md:w-[712px]"
  >
    <Stack
      spacing={3}
      className="md:p-5"
    >
      <ModalHeader
        handleClose={handleClose}
        title="STAKING"
      />
    </Stack>
  </ModalCustom>
)
export default memo(StakingModal)
