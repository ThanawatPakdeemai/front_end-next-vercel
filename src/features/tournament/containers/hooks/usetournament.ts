/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"

const usetournament = () => {
  // State
  const [openForm, setOpenForm] = useState<boolean>(false)

  const handleClose = () => {
    setOpenForm(false)
  }

  const handleOpen = () => {
    setOpenForm(true)
  }

  return {
    setOpenForm,
    openForm,
    handleClose,
    handleOpen
  }
}

export default usetournament
