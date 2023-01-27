import ButtonClose from "@components/atoms/button/ButtonClose"
import FormEditProfile from "@feature/profile/components/FormEditProfile"
import { Stack, Typography } from "@mui/material"
import React from "react"
import { ModalCustom } from "../Modal/ModalCustom"

interface IProp {
  openEdit: any
  handleClose: any
}

const EditProfileModal = ({ openEdit, handleClose }: IProp) => (
  <>
    <ModalCustom
      open={openEdit}
      onClose={handleClose}
      className="min-w-[350px] gap-3 rounded-[34px] p-[10px]"
      width={400}
    >
      <Stack
        spacing={3}
        className=""
      >
        <div className="flex rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-2">
          <div className="flex flex-1 flex-row items-center">
            <Typography className="pl-[22px] uppercase text-neutral-300">
              Edit Profile
            </Typography>
          </div>
          <ButtonClose onClick={handleClose} />
        </div>
        <FormEditProfile />
      </Stack>
    </ModalCustom>
  </>
)
export default EditProfileModal
