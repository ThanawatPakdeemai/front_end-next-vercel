import ButtonIcon from "@components/atoms/button/ButtonIcon"
import MessageIcon from "@components/icons/MessageIcon"
import SendIcon from "@components/icons/SendIcon"
import { Box, InputAdornment, TextField } from "@mui/material"
import { motion } from "framer-motion"
import React, { useState } from "react"
import MessageBox from "../molecules/MessageBody"
import MessageFooter from "../molecules/MessageFooter"
import MessageHeader from "../molecules/MessageHeader"
import Chat from "../organisms/Chat"

function ChatTemplate() {
  /**
   * trigger Scroll Position
   */
  // const { ref: msgElement, inView: msgInView } = useInView({ threshold: 0 })

  /**
   * set profile address of user
   */
  // const [selectedProfileAddress, setSelectedProfileAddress] = useState<string>()
  // const onSelectedProfileAddress = (userAddress: string) => {
  //   setSelectedProfileAddress(userAddress)
  //   onVisibleProfileModal()
  // }

  /**
   * typeing effect
   */
  // const [keyup, setKeyup] = useState<boolean>(false)
  // const handleKeyup = (event) => {
  //   if (event) {
  //     setKeyup(true)
  //     refMessageElementDiv.current?.scrollTo(
  //       0,
  //       refMessageElementDiv.current?.scrollHeight
  //     )
  //   } else {
  //     setKeyup(false)
  //   }
  // }

  return <Chat />
}

export default ChatTemplate
