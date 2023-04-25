import React, { memo } from "react"
import { Box, Stack } from "@mui/material"
import ButtonBuyItem from "@feature/gameItem/atoms/ButtonBuyItem"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import FormBuyItem from "@feature/buyItem/components/FormBuyItem"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"

interface IProp {
  disabled: boolean
  classNameBtn?: string
}

const RightMenuBuyItem = ({ disabled, classNameBtn }: IProp) => {
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
          className={classNameBtn}
        />
      </Box>
      <ModalCustom
        open={openForm}
        onClose={handleClose}
        className="w-full gap-3 rounded-[34px] p-[10px] md:m-auto md:w-[550px] lg:min-w-[515px]"
        width={400}
      >
        <Stack
          spacing={3}
          className="md:p-5"
        >
          <div className="rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-2">
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
