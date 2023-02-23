import React, { useEffect, useState } from "react"
import {
  Alert,
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  styled,
  TextField,
  Typography
} from "@mui/material"
import { IMAGES } from "@constants/images"
import { Image } from "@components/atoms/image/index"
import Tagline from "@components/molecules/tagline/Tagline"
import HeadLogo from "@components/molecules/HeadLogo"
import VectorIcon from "@components/icons/VectorIcon"
import CreateProfile from "@feature/profile/components/createProfile/CreateProfile"
import ButtonClose from "@components/atoms/button/ButtonClose"
import ButtonLink from "@components/atoms/button/ButtonLink"
import ILock from "@components/icons/Lock"
import { motion } from "framer-motion"
import { Beenhere } from "@mui/icons-material"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { useForm } from "react-hook-form"
import IEdit from "@components/icons/Edit"

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

interface IProp {
  email: string
  token: string
  // handleClose?: () => void
}

const FromCreatePassword = ({ email, token }: IProp) => {
  const [showPassword, setShowPassword] = useState(false)
  const [characterUppercase, setCharacterUppercase] = useState(true)
  const [characterPasswordLength, setCharacterPasswordLength] = useState(true)
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      confirmPassword: "",
      password: ""
    }
  })
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordCorrect, setPasswordCorrect] = useState(false)
  const patternPasswordUppercase = /[A-Z]/
  const [formSubmitErrors, setFormSubmitErrors] = useState(false)
  const [createPassword, setCreatePassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show)
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const isCharacters = (_characters: string) => {
    if (_characters.length >= 6) {
      setCharacterPasswordLength(true)
      if (patternPasswordUppercase.test(_characters)) {
        setCharacterUppercase(true)
      } else {
        setCharacterUppercase(false)
      }
    } else {
      setCharacterPasswordLength(false)
    }
  }

  const onSubmitConfirm = () => {
    setFormSubmitErrors(true)
    // console.log("Hollo", createPassword, confirmPassword)
  }

  const isConfirmPassword = (_password: string, _confirmPassword: string) => {
    if (_password === _confirmPassword) {
      setPasswordCorrect(true)
    } else {
      setPasswordCorrect(false)
    }
  }

  useEffect(() => {
    isConfirmPassword(watch("password"), watch("confirmPassword"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("password"), watch("confirmPassword")])

  return (
    <Box>
      <div>
        {createPassword},{confirmPassword},{email},{token}
      </div>
      <Box className="py-5">
        <Grid
          item
          container
          component="div"
          className="rounded-3xl border border-solid border-neutral-800 p-2.5"
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
              <form
                className="h-full"
                onSubmit={handleSubmit(onSubmitConfirm)}
              >
                <Box className="flex h-[600px] w-[333px] items-center">
                  <Grid
                    container
                    spacing={2.25}
                  >
                    <Grid
                      item
                      xs={12}
                    >
                      <Box
                        className="flex items-center rounded-lg"
                        sx={{ height: "54px" }}
                      >
                        <div className="flex flex-1 flex-row items-center">
                          <Typography className="text-lg uppercase text-neutral-300">
                            Confirm Password
                          </Typography>
                        </div>
                        <Link href="/">
                          <ButtonClose onClick={() => {}} />
                        </Link>
                      </Box>
                      <Divider className="mx-0 mt-5 mb-8" />
                      <>
                        {formSubmitErrors && (
                          <motion.div
                            animate={{
                              opacity: 1,
                              marginTop: -20,
                              marginBottom: 2
                            }}
                          >
                            <Alert
                              severity="error"
                              className="rounded-lg"
                            >
                              The form is filled with incorrect information.
                            </Alert>
                          </motion.div>
                        )}
                      </>
                      <TextField
                        className="w-full pt-3.5"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        label="Password"
                        autoComplete="new-password'"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = e.target.value.slice(0, 128)
                          isCharacters(e.target.value)
                          // console.log("value", e.target.value)
                          setCreatePassword(e.target.value)
                        }}
                        {...register("password")}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            width: "100%",
                            fontWeight: 400,
                            fontSize: 14,
                            fontWight: 700,
                            fontFamily: "neueMachina"
                          },
                          "& .MuiInputLabel-root": {
                            color: "#70727B",
                            fontFamily: "neueMachina",
                            textTransform: "uppercase"
                          }
                        }}
                        id="password"
                        size="medium"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ILock />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOffOutlinedIcon className="text-neutral-300" />
                                ) : (
                                  <VisibilityOutlinedIcon className="text-neutral-300" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      {errors.password && (
                        <motion.div
                          initial={{ opacity: 0, marginBottom: 0 }}
                          animate={{
                            opacity: 1,
                            marginTop: 10
                          }}
                        >
                          <Alert
                            severity="warning"
                            className="rounded-lg"
                          >
                            Password is a required field
                          </Alert>
                        </motion.div>
                      )}
                      {characterPasswordLength === false && (
                        <motion.div
                          initial={{ opacity: 0, marginBottom: 0 }}
                          animate={{
                            opacity: 1,
                            marginTop: 10
                          }}
                        >
                          <Alert
                            severity="warning"
                            className="rounded-lg"
                          >
                            The password must contain at least 6 characters.
                          </Alert>
                        </motion.div>
                      )}
                      {characterUppercase === false && (
                        <motion.div
                          initial={{ opacity: 0, marginBottom: 0 }}
                          animate={{
                            opacity: 1,
                            marginTop: 10
                          }}
                        >
                          <Alert
                            severity="warning"
                            className="rounded-lg"
                          >
                            The password must contain at least one uppercase
                            letter.
                          </Alert>
                        </motion.div>
                      )}
                      <TextField
                        className="mt-[5px] w-full"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        label="A Number or Symbol, Atleast 6 Characters"
                        autoComplete="new-password'"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = e.target.value.slice(0, 128)
                          isCharacters(e.target.value)
                          // console.log("value", e.target.value)
                          setConfirmPassword(e.target.value)
                        }}
                        {...register("confirmPassword")}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            width: "100%",
                            fontWeight: 400,
                            fontSize: 14,
                            fontWight: 700,
                            fontFamily: "neueMachina"
                          },
                          "& .MuiInputLabel-root": {
                            width: "max-content",
                            color: "#70727B",
                            fontFamily: "neueMachina",
                            textTransform: "uppercase",
                            paddingTop: "0.5rem",
                            paddingBottom: "0.5rem"
                          }
                        }}
                        id="confirmPassword"
                        size="medium"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Beenhere />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownConfirmPassword}
                                edge="end"
                              >
                                {showConfirmPassword ? (
                                  <VisibilityOffOutlinedIcon className="text-neutral-300" />
                                ) : (
                                  <VisibilityOutlinedIcon className="text-neutral-300" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      {errors.confirmPassword && (
                        <motion.div
                          initial={{ opacity: 0, marginBottom: 0 }}
                          animate={{
                            opacity: 1,
                            marginTop: 10
                          }}
                        >
                          <Alert
                            severity="warning"
                            className="rounded-lg"
                          >
                            ConfirmPassword is a required field
                          </Alert>
                        </motion.div>
                      )}
                      {!passwordCorrect && (
                        <motion.div
                          initial={{ opacity: 0, marginBottom: 0 }}
                          animate={{
                            opacity: 1,
                            marginTop: 10
                          }}
                        >
                          <Alert
                            severity="warning"
                            className="rounded-lg"
                          >
                            Password is incorrect
                          </Alert>
                        </motion.div>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    />
                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <ButtonLink
                          href="/"
                          text="Back"
                          icon={null}
                          size="medium"
                          disabledEndIcon
                          className="h-[40px] !min-w-[108px] border border-solid border-neutral-700 text-sm hover:h-[45px]"
                        />
                      </Grid>
                      <Grid item>
                        <ButtonToggleIcon
                          // handleClick={() => onSubmitRegisterForm(true)}
                          type="submit"
                          startIcon={<IEdit />}
                          text="Confirm"
                          className="btn-rainbow-theme h-[40px] w-[209px] bg-secondary-main font-bold capitalize text-white-default"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </form>
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                className="absolute bottom-32"
              >
                <Typography className="text-sm uppercase text-neutral-700">
                  Copyright 2022 © Nakamoto Games
                </Typography>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <CreateProfile />
    </Box>
  )
}

export default FromCreatePassword
