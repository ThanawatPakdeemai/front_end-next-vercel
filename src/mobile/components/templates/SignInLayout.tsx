import React, { useState } from "react"
import { Box, Button, Divider, Typography } from "@mui/material"
import CardNoReward from "@feature/game/containers/components/atoms/CardNoReward"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import LogoNakaBigIcon from "@components/icons/LogoNakaBigIcon"
import GoogleColorIcon from "@components/icons/SocialIcon/GoogleColorIcon"
import useFormLoginController from "@feature/authentication/containers/hooks/useFormLoginController"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import FacebookColorIcon from "@components/icons/SocialIcon/FacebookColorIcon"
import { signIn } from "next-auth/react"
import useLoginTypeStore from "@stores/loginTypes"
import LoginModal from "../organisms/modal/LoginModal"
import CreateAccountModal from "../organisms/modal/CreateAccountModal"

const SignInLayout = () => {
  const { googleLogin, twitterLogin } = useFormLoginController()
  const { setClickLoginTypes: setLoginTypes } = useLoginTypeStore()

  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false)
  const [openModalCreateAccount, setOpenModalCreateAccount] =
    useState<boolean>(false)

  const handleLogin = (_typeLogin: string) => {
    // setLoginTypes(_typeLogin)
    signIn(_typeLogin)
  }

  return (
    <>
      <Box
        component="div"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
      >
        <Box
          component="div"
          className="mb-20 flex justify-center"
        >
          <LogoNakaBigIcon />
        </Box>
        <Typography className="my-8 text-center font-urbanist text-3xl font-bold uppercase text-red-card">
          Welcome Back
        </Typography>
        <Box component="div">
          <Button
            variant="contained"
            className="mb-[1.125rem] h-[50px] w-[293px] rounded-2xl border border-solid border-neutral-690 !bg-neutral-800"
            // onClick={googleLogin}
          >
            <div className="flex items-center font-urbanist text-base font-medium">
              <span className="pr-2">
                <FacebookColorIcon />
              </span>
              <span>Sign in with Facebook</span>
            </div>
          </Button>
        </Box>
        <Box component="div">
          <Button
            variant="contained"
            className="mb-[1.125rem] h-[50px] w-[293px] rounded-2xl border border-solid border-neutral-690 !bg-neutral-800"
            onClick={() => handleLogin("google")}
          >
            <div className="flex items-center font-urbanist text-base font-medium">
              <span className="pr-2">
                <GoogleColorIcon />
              </span>
              <span>Sign in with Google</span>
            </div>
          </Button>
        </Box>
        <Box component="div">
          <Button
            variant="contained"
            className="h-[50px] w-[293px] rounded-2xl border border-solid border-neutral-690 !bg-neutral-800"
            onClick={twitterLogin}
          >
            <div className="flex items-center font-urbanist text-base font-medium">
              <span className="pr-2">
                <TwitterIcon
                  fill="#1D9BF0"
                  width={30}
                  height={30}
                />
              </span>
              <span>Sign in with Twitter</span>
            </div>
          </Button>
        </Box>

        <Box
          component="div"
          className="py-4"
        >
          <Divider className="font-urbanist font-medium text-white-default">
            or
          </Divider>
        </Box>
        <Box component="div">
          <Button
            variant="contained"
            className="mb-6 h-[50px] w-[293px] rounded-bl-3xl border border-solid border-error-100 !bg-error-100"
            onClick={() => setOpenModalLogin(!openModalLogin)}
          >
            <div className="flex items-center font-urbanist text-base font-bold">
              Sign in with Email
            </div>
          </Button>
        </Box>
        <Box
          component="div"
          className="flex justify-center text-center"
        >
          <p className="pr-2 text-sm font-normal text-[#fff]">
            Don’t have an account?
          </p>
          <Typography
            onClick={() => setOpenModalCreateAccount(!openModalCreateAccount)}
            className="text-sm font-normal text-warning-100"
          >
            Sign up
          </Typography>
        </Box>
        <CardNoReward
          className="!rounded-none !border-none !bg-transparent !p-5"
          showIconTM={false}
        />
      </Box>
      {/* Modal Login */}
      <LoginModal
        open={openModalLogin}
        setOpenLogin={(_toggle) => setOpenModalLogin(_toggle)}
      />
      {/* Modal CreateNewAccountModal */}
      {openModalCreateAccount && (
        <GoogleReCaptchaProvider
          reCaptchaKey={`${process.env.NEXT_PUBLIC_KEY_RECAPTCHA}`}
          scriptProps={{
            async: true,
            defer: false,
            appendTo: "head",
            nonce: undefined
          }}
        >
          <CreateAccountModal
            open={openModalCreateAccount}
            setOpenLogin={(_toggle) => setOpenModalCreateAccount(_toggle)}
          />
        </GoogleReCaptchaProvider>
      )}
    </>
  )
}

export default SignInLayout
