import React, { useState } from "react"
import { Image } from "@components/atoms/image/index"
import { IMAGES } from "@constants/images"
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  styled,
  TextField,
  Typography
} from "@mui/material"
import HeadLogo from "@components/molecules/HeadLogo"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import ButtonClose from "@components/atoms/button/ButtonClose"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined"
import Beenhere from "@components/icons/Beenhere"
import ILock from "@components/icons/Lock"
import ICheckMark from "@components/icons/CheckMark"
import IEdit from "@components/icons/Edit"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import { SocialRegister } from "@configs/socialRegister"
import Tagline from "@components/molecules/tagline/Tagline"
import VectorIcon from "@components/icons/VectorIcon"

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

export default function SignInSide() {
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <Box>
      <Box className="p-5">
        <Grid
          container
          component="main"
          className="h-screen rounded-3xl border border-solid border-neutral-800 p-2.5"
        >
          <Box
            component="div"
            className="absolute z-[1] m-5 items-center justify-between lg:flex"
          >
            <HeadLogo />
          </Box>
          <Grid
            item
            xs={0}
            sm={0}
            md={6}
            className="rounded-[14px] bg-cover bg-no-repeat"
            sx={{
              backgroundImage: `url(${IMAGES.rectagle.src})`
            }}
          >
            <Box
              component="div"
              className="relative bottom-[-45rem]"
            >
              <Tagline
                bgColor="bg-neutral-800"
                textColor="text-neutral-500"
                text="Secue. fun. simple. earn $naka AND enjoy "
                icon={<VectorIcon />}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            component={Paper}
            elevation={6}
            square
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
              <Box style={{ width: 333, height: 638 }}>
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
                          Register
                        </Typography>
                      </div>
                      <ButtonClose onClick={() => {}} />
                    </Box>
                    <Divider className="mx-0 mt-5 mb-8" />
                    <TextField
                      className="w-full"
                      type="email"
                      placeholder="Email"
                      label="Email Address"
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
                      id="email"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    // justifyContent="center"
                    // alignItems="center"
                  >
                    <Grid
                      item
                      // md={6}
                    >
                      <TextField
                        className="mr-2 w-[235px]"
                        type="text"
                        placeholder="Verification code"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            width: "100%",
                            fontWeight: 400,
                            fontSize: 14,
                            fontWight: 700,
                            fontFamily: "neueMachina",
                            padding: "0px 16px"
                          }
                        }}
                        id="code"
                        size="medium"
                      />
                    </Grid>
                    <Grid
                      item
                      // md={2}
                    >
                      <Button className="btn-rainbow-theme h-[40px] !min-w-[90px] rounded-lg bg-error-main text-sm text-neutral-300">
                        Get Code
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      className="w-full pt-3.5"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      label="Password"
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
                      id="email"
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
                    <TextField
                      className="mt-[5px] w-full"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      label="A Number or Symbol, Atleast 6 Characters"
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
                      id="email"
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
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            "&:hover": { bgcolor: "transparent" },
                            ":hover": {
                              "& .MuiSvgIcon-root": {
                                background: "transparent",
                                border: "2px solid #7a5be6 !important"
                              }
                            }
                          }}
                          icon={
                            <CheckBoxOutlineBlankOutlinedIcon
                              className="border-2 border-solid border-neutral-600 text-transparent"
                              sx={{
                                borderRadius: "8.5px"
                              }}
                            />
                          }
                          checkedIcon={
                            <ICheckMark
                              className="border-2 border-solid border-purple-primary bg-neutral-800 p-1 text-purple-primary"
                              style={{
                                borderRadius: "8.5px"
                              }}
                            />
                          }
                        />
                      }
                      label="Would you like to subscribe to Nakamoto Games Newsletter?"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 10,
                          color: "#70727B",
                          textTransform: "uppercase"
                        }
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    justifyContent="space-between"
                    // md={12}
                  >
                    <Grid item>
                      <Link href="/login">
                        <Button
                          size="large"
                          type="submit"
                          variant="outlined"
                          className="h-[40px] !min-w-[108px]"
                        >
                          Login
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item>
                      <ButtonToggleIcon
                        handleClick={() => {}}
                        startIcon={<IEdit />}
                        text="Regiter"
                        className="btn-rainbow-theme h-[40px] w-[209px] bg-secondary-main font-bold capitalize text-white-default"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    className="mt-8 mb-8"
                  >
                    <Grid item>
                      <p className="text-xs uppercase">OR join us with</p>
                    </Grid>
                    <Grid item>
                      <Divider className="w-[208px]" />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                  >
                    <div className="flex flex-wrap">
                      {SocialRegister?.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          target="_blank"
                        >
                          <ButtonIcon
                            // variants={iconmotion}
                            whileHover="hover"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 4
                            }}
                            icon={item.icon}
                            className="m-1 flex h-[40px] w-[75px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                          />
                        </Link>
                      ))}
                    </div>
                  </Grid>
                </Grid>
              </Box>
              <Grid
                item
                container
                // direction="row"
                // justifyContent="space-between"
                justifyContent="center"
                alignItems="center"
                className="absolute bottom-0.5"
              >
                <Typography className="text-sm uppercase text-neutral-700">
                  Copyright 2022 © Nakamoto Games
                </Typography>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
