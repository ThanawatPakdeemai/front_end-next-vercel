import React from "react"
import { Box, Button } from "@mui/material"
import dynamic from "next/dynamic"
import useFormRegisterController from "@feature/authentication/containers/hooks/useFormRegisterController"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const MoreLoginMobile = () => {
  const { googleRegister } = useFormRegisterController()

  return (
    <Box
      component="div"
      className="flex justify-center gap-5"
    >
      <Button
        variant="outlined"
        aria-label="Facebook"
        className="h-[60px] !min-w-[88px] rounded-2xl border border-solid border-neutral-690 bg-neutral-800"
      >
        <Icomoon className="icon-Facebook" />
      </Button>
      <Button
        variant="outlined"
        aria-label="Google"
        className="h-[60px] !min-w-[88px] rounded-2xl border border-solid border-neutral-690 bg-neutral-800"
        onClick={() => googleRegister("")}
      >
        <Icomoon className="icon-Google" />
      </Button>
      <Button
        variant="outlined"
        aria-label="Twitter"
        className="h-[60px] !min-w-[88px] rounded-2xl border border-solid border-neutral-690 bg-neutral-800"
      >
        <Icomoon className="icon-twitter text-[#1D9BF0]" />
      </Button>
    </Box>
  )
}

export default MoreLoginMobile
