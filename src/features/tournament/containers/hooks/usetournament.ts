/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import useProfileStore from "@stores/profileStore"

const usetournament = () => {
  // State
  const profile = useProfileStore((state) => state.profile.data)
  const [openForm, setOpenForm] = useState<boolean>(false)
  const { errorToast } = useToast()

  const handleClose = () => {
    setOpenForm(false)
  }

  const handleOpen = () => {
    if (!profile) {
      errorToast(MESSAGES.please_login)
    } else {
      setOpenForm(true)
    }
  }

  return {
    setOpenForm,
    openForm,
    handleClose,
    handleOpen
  }
}

export default usetournament
