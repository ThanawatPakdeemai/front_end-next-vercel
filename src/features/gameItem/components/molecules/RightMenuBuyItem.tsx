import React, { memo } from "react"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import { IButtonBuyItemProps } from "@feature/gameItem/style"

const ButtonBuyItem = dynamic(() => import("../atoms/ButtonBuyItem"), {
  suspense: true,
  ssr: false
})
const Stack = dynamic(() => import("@mui/material/Stack"), {
  suspense: true,
  ssr: false
})
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
const FormBuyItem = dynamic(
  () => import("@feature/buyItem/components/FormBuyItem"),
  {
    suspense: true,
    ssr: false
  }
)

interface IProp extends IButtonBuyItemProps {
  disabled: boolean
}

const RightMenuBuyItem = ({ disabled, ...props }: IProp) => {
  const { handleClose, handleOpen, openForm } = useBuyGameItemController()

  return (
    <>
      <Box
        component="div"
        className="xs:flex-col items-center justify-between gap-1 lg:flex"
      >
        <ButtonBuyItem
          handleButton={handleOpen}
          disabled={disabled}
          {...props}
        />
      </Box>
      <ModalCustom
        open={openForm}
        onClose={handleClose}
        // className="w-full gap-3 rounded-[34px] p-[10px] md:m-auto md:w-[550px] lg:min-w-[515px]"
        className="w-full gap-3 rounded-3xl md:m-auto md:max-w-[333px]"
      >
        <Stack
          spacing={3}
          className="p-0"
        >
          <div className="h-full w-full rounded-lg border-[1px] border-neutral-700 bg-neutral-800 p-[5px_7px_5px_22px]">
            <ModalHeader
              handleClose={handleClose}
              title="Buy Assets"
            />
          </div>
          <Box
            component="div"
            className="hide-scroll h-[480px] w-full overflow-y-scroll "
          >
            <FormBuyItem />
          </Box>
        </Stack>
      </ModalCustom>
    </>
  )
}
export default memo(RightMenuBuyItem)
