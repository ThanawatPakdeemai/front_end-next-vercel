import React, { useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import { pink } from "@mui/material/colors"
import {
  createTheme,
  styled,
  ThemeProvider,
  unstable_createMuiStrictModeTheme
} from "@mui/material/styles"
import {
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel
} from "@mui/material"
import HeadLogo from "@components/molecules/HeadLogo"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import ButtonClose from "@components/atoms/button/ButtonClose"
import CircleNakaIcon from "@components/icons/CircleNakaIcon"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import type { Palette } from "@mui/material/styles"
import fullConfig from "tailwindResolver"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"

import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined"
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined"
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined"
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined"

import Beenhere from "@components/icons/Beenhere"
import ILock from "@components/icons/Lock"
import ICheckMark from "@components/icons/CheckMark"
import { Padding } from "@mui/icons-material"
import IEdit from "@components/icons/Edit"
import { SOCIAL } from "@configs/socialShare"
import ButtonIcon from "@components/atoms/button/ButtonIcon"

import { SocialRegister } from "@configs/socialRegister"
import Tagline from "@components/molecules/tagline/Tagline"
import MetaMarkIcon from "@components/icons/SocialIcon/Metamask"
import VectorIcon from "@components/icons/VectorIcon"
import IRectagle from "./icons/rectagle"

export default function SignInSide() {
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/

  const [showPassword, setShowPassword] = useState(false)
  const [hoverCheckBox, setHoverCheckBox] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password")
    // })
  }

  const handleClose = () => {
    // eslint-disable-next-line no-console
    console.log("test")
  }

  return (
    <Box>
      <Box className="p-5">
        <Grid
          container
          component="main"
          className="h-screen rounded-3xl border border-solid border-neutral-800 p-2.5"
        >
          {/* <Box
            component="div"
            className="absolute m-5 items-center justify-between lg:flex"
          >
            <HeadLogo />
          </Box> */}
          <Grid
            item
            xs={false}
            sm={6}
            md={6}
            className="rounded-[14px] bg-cover bg-no-repeat"
            sx={{
              backgroundImage: "url(/images/home/rectagle.svg)"
            }}
          >
            <div>
              <Box
                component="div"
                className="absolute m-5 items-center justify-between lg:flex"
              >
                <HeadLogo />
              </Box>
              <Box>
                <Tagline
                  bgColor="bg-neutral-800"
                  textColor="text-neutral-500"
                  text="Secue. fun. simple. earn $naka AND enjoy "
                  icon={<VectorIcon />}
                />
              </Box>
            </div>
          </Grid>
          {/* <Box
            component="div"
            className="absolute z-10"
          > */}
          {/* </Box> */}
          {/* <Box
            component="div"
            className="absolute m-5 items-center justify-between lg:flex"
          >
            <HeadLogo />
          </Box> */}
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            component={Paper}
            elevation={6}
            square
            sx={{
              background: "#050505"
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              {/* <Box
              // style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
              > */}
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
                      <ButtonClose onClick={handleClose} />
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
                      className="mt-2.5 w-full"
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
                          textTransform: "uppercase"
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
                    {/* <Checkbox
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
                    /> */}
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    justifyContent="space-between"
                    // md={12}
                  >
                    <Grid item>
                      <Button
                        size="large"
                        type="submit"
                        variant="outlined"
                        className="h-[40px] !min-w-[108px]"
                      >
                        Submit
                      </Button>
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
