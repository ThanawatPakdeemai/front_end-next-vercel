import React, { memo, useState, useEffect } from "react"
import { Stack } from "@mui/material"
import dynamic from "next/dynamic"
import useProfileStore from "@stores/profileStore"

const FormCreateProfile = dynamic(() => import("./FormCreateProfile"), {
  suspense: true,
  ssr: true
})
const ModalCustom = dynamic(
  () => import("@components/molecules/Modal/ModalCustom"),
  {
    suspense: true,
    ssr: true
  }
)
const ModalHeader = dynamic(
  () => import("@components/molecules/Modal/ModalHeader"),
  {
    suspense: true,
    ssr: true
  }
)

const CreateProfile = () => {
  const [open, setOpen] = useState<boolean>(false)
  const profile = useProfileStore((state) => state.profile.data)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    let load = false

    if (!load) {
      // TODO YUI uncomment
      if (profile && !profile.avatar && !profile.username) {
        handleOpen()
      } else if (profile && profile.avatar && profile.username) {
        handleClose()
      }
    }

    return () => {
      load = true
    }
  }, [profile, open])

  return (
    <>
      {/* TODO YUI OPEN WHEN TEST CREATE PROFILE */}
      {/* <button onClick={handleOpen}>open</button> */}
      <ModalCustom
        open={open}
        onClose={handleClose}
        className="w-auto gap-3 rounded-[34px] p-[10px]"
        width={400}
      >
        <Stack
          spacing={3}
          className="md:p-5"
        >
          <ModalHeader
            handleClose={handleClose}
            title="Create Profile"
          />
          <FormCreateProfile />
        </Stack>
      </ModalCustom>
    </>
  )
}
export default memo(CreateProfile)
