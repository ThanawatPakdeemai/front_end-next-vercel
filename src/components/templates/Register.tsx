import React, { useEffect } from "react"
import _ from "lodash"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Grid } from "@mui/material"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { useSession } from "next-auth/react"
import dynamic from "next/dynamic"
import useRegisterAvatarStore from "@stores/registerAvater"
import { isMobile } from "@hooks/useGlobal"
import useRegisterTypeStore from "@stores/registerTypes"
import { IMAGES } from "@constants/images"
import useFormRegisterController from "@feature/authentication/containers/hooks/useFormRegisterController"

const CreateProfile = dynamic(
  () => import("@feature/profile/components/createProfile/CreateProfile"),
  {
    suspense: true,
    ssr: false
  }
)
const FormRegister = dynamic(
  () => import("@feature/authentication/components/FormRegister"),
  {
    suspense: true,
    ssr: false
  }
)
const HeadLogo = dynamic(() => import("@components/molecules/HeadLogo"), {
  suspense: true,
  ssr: false
})
const Tagline = dynamic(() => import("@components/molecules/tagline/Tagline"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface TFormData {
  email: string
  password: string
  confirmPassword: string
  code: number
  subscription: boolean
  referralId: string | string[]
}

const SignUpSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
    code: yup.number().required().positive().integer(),
    subscription: yup.boolean().defined(),
    referralId: yup.string().defined()
  })
  .required()

const RegisterLayout = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { referral } = router.query
  const { data: session, status } = useSession()
  const { googleRegister, discordRegister, twitterRegister } =
    useFormRegisterController()

  // eslint-disable-next-line no-unused-vars
  const { formState } = useForm<TFormData>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      referralId: referral || ""
    }
  })

  const { getClickRegisterTypes: registerTypes } = useRegisterTypeStore()

  const { getSubmitClickRegister: submitRegisterForm } =
    useRegisterAvatarStore()

  const handleLogin = () => {
    if (session && status === "authenticated" && registerTypes !== "") {
      switch (registerTypes) {
        case "google":
          googleRegister(referral as string)
          break
        case "discord":
          discordRegister(referral as string)
          break
        case "twitter":
          twitterRegister(referral as string)
          break
        default:
          // Handle unknown login type
          break
      }
    }
  }

  useEffect(() => {
    let load = false
    if (!load) {
      handleLogin()
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status, registerTypes])

  return (
    <Box component="div">
      <Box
        component="div"
        className="p-5"
      >
        {isMobile ? (
          <Grid
            item
            container
            component="div"
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              className="relative rounded-[14px] bg-cover bg-center bg-no-repeat"
              sx={{
                background: "#050505"
              }}
            >
              <Box
                component="div"
                sx={{
                  height: "auto",
                  width: { xs: "100%", lg: "auto" },
                  my: { xs: 2, lg: 8 },
                  mx: { xs: 0, lg: 0, xl: 4 },
                  px: { md: 2, xl: 0 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <FormRegister />
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid
            item
            container
            component="div"
            className={`min-h-[790px] rounded-3xl border border-solid border-neutral-800 p-[20px] md:p-[50px] lg:p-2.5 ${
              submitRegisterForm ? "h-[135vh]" : "h-[95vh]"
            }`}
          >
            <Grid
              item
              xs={0}
              sm={0}
              md={6}
              className="relative rounded-[14px] bg-cover bg-center bg-no-repeat"
              sx={{
                backgroundImage: `url(${IMAGES.rectagle.src})`
              }}
            >
              <Box
                component="div"
                className="absolute z-[1] m-5 items-center justify-between lg:flex"
              >
                <HeadLogo />
              </Box>
              <Box
                component="div"
                className="container absolute bottom-0 overflow-hidden"
              >
                <Tagline
                  bgColor="bg-neutral-800"
                  textColor="text-neutral-500"
                  text={t("main_tagline")}
                  icon={<Icomoon className="icon-require" />}
                  className="!my-[2.938rem]"
                  show={false}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              className="relative rounded-[14px] bg-cover bg-center bg-no-repeat"
              sx={{
                background: "#050505"
              }}
            >
              {/* Remove this because CPU usage is too high */}
              {/* <CircleSphereAnimation /> */}
              <Box
                component="div"
                sx={{
                  height: "auto",
                  width: { xs: "100%", lg: "auto" },
                  my: { xs: 2, lg: 8 },
                  mx: { xs: 0, lg: 0, xl: 4 },
                  px: { md: 2, xl: 0 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <FormRegister />
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
      <CreateProfile />
    </Box>
  )
}

export default RegisterLayout
