import React from "react"
import _ from "lodash"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Image } from "@components/atoms/image/index"
import { IMAGES } from "@constants/images"
import { Box, Grid, styled, Typography } from "@mui/material"
import HeadLogo from "@components/molecules/HeadLogo"
import Tagline from "@components/molecules/tagline/Tagline"
import VectorIcon from "@components/icons/VectorIcon"
import { useRouter } from "next/router"
import useRegisterAvatarStore from "@stores/registerAvater"

const KeyFramesClockwise = styled("div")({
  "@keyframes rotation": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(359deg)"
    }
  },
  animation: "rotation 10s infinite linear"
})

const KeyFramesAnticlockwise = styled("div")({
  "@keyframes rotation": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(359deg)"
    }
  },
  animation: "rotation 10s infinite linear"
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

interface IRegisterTemplate {
  children: React.ReactNode
  background?: string
}

const RegisterTemplate = ({ children, background }: IRegisterTemplate) => {
  const router = useRouter()
  const { referral } = router.query

  const {
    formState: { errors }
  } = useForm<TFormData>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      referralId: referral || ""
    }
  })

  const { getSubmitClickRegister: submitRegisterForm } =
    useRegisterAvatarStore()

  return (
    <Box>
      <Box className="p-5">
        <Grid
          item
          container
          component="div"
          className={`rounded-3xl border border-solid border-neutral-800 p-2.5 ${
            !_.isEmpty({ errors }.errors) && submitRegisterForm
              ? "h-[135vh]"
              : "h-[95vh]"
          }`}
        >
          <Grid
            item
            xs={0}
            sm={0}
            md={6}
            className="relative rounded-[14px] bg-cover bg-center bg-no-repeat"
            sx={{
              backgroundImage: background || `url(${IMAGES.rectagle.src})`
            }}
          >
            <Box
              component="div"
              className="absolute z-[1] m-5 items-center justify-between lg:flex"
            >
              <HeadLogo />
            </Box>
            <Box className="container absolute bottom-0 overflow-hidden">
              <Tagline
                bgColor="bg-neutral-800"
                textColor="text-neutral-500"
                text="Secue. fun. simple. earn $naka AND enjoy "
                icon={<VectorIcon />}
                className="!my-[2.938rem]"
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
            <Box
              component="div"
              className="flex justify-end"
            >
              <div className="absolute">
                <KeyFramesClockwise>
                  <Image
                    src={IMAGES.ro.src}
                    alt={IMAGES.ro.alt}
                    className="h-full w-full"
                  />
                </KeyFramesClockwise>
              </div>
              <div className="absolute">
                <KeyFramesAnticlockwise>
                  <Image
                    src={IMAGES.vectorWorld.src}
                    alt={IMAGES.vectorWorld.alt}
                    className="relative h-full w-full p-[5px]"
                  />
                </KeyFramesAnticlockwise>
              </div>
            </Box>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              {children}
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                className="absolute bottom-4"
              >
                <Typography className="text-sm uppercase text-neutral-700">
                  Copyright 2022 © Nakamoto Games
                </Typography>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* <CreateProfile /> */}
    </Box>
  )
}

export default RegisterTemplate
