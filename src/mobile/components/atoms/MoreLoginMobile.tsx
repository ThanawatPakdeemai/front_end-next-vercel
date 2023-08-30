/* eslint-disable max-len */
import React from "react"
import { signIn } from "next-auth/react"
import { Box, Button } from "@mui/material"
import dynamic from "next/dynamic"
import useRegisterTypeStore from "@stores/registerTypes"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const MoreLoginMobile = () => {
  const { setClickRegisterTypes: setRegisterTypes } = useRegisterTypeStore()

  const handleRegister = async (_typeRegister: string) => {
    await setRegisterTypes(_typeRegister)
    await signIn(_typeRegister)
  }

  return (
    <Box
      component="div"
      className="flex justify-center gap-5"
    >
      {/* <Button
        variant="outlined"
        aria-label="Facebook"
        className="h-[60px] !min-w-[88px] rounded-2xl border border-solid border-neutral-690 bg-neutral-800"
      >
        <Icomoon className="icon-Facebook" />
      </Button> */}
      <Button
        variant="outlined"
        aria-label="Google"
        className="h-[60px] !min-w-[88px] rounded-2xl border border-solid border-neutral-690 bg-neutral-800"
        onClick={() => handleRegister("google")}
      >
        <Icomoon className="icon-Google" />
      </Button>
      <Button
        variant="outlined"
        aria-label="Google"
        className="h-[60px] !min-w-[88px] rounded-2xl border border-solid border-neutral-690 bg-neutral-800"
        onClick={() => handleRegister("discord")}
      >
        <Icomoon className="icon-Discord" />
      </Button>
      {/* <Button
        variant="outlined"
        aria-label="Twitter"
        className="h-[60px] !min-w-[88px] rounded-2xl border border-solid border-neutral-690 bg-neutral-800"
      >
        <Icomoon className="icon-twitter text-[#1D9BF0]" />
      </Button> */}
    </Box>
  )
}

export default MoreLoginMobile
