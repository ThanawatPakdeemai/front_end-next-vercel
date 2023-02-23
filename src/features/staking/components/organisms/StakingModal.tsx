import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import { Stack } from "@mui/material"
import { memo } from "react"
import FormStaking from "../molecules/FormStaking"

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

      <FormStaking />
    </Stack>
  </ModalCustom>
)
export default memo(StakingModal)
