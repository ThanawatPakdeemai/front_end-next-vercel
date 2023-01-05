/* eslint-disable no-console */
import React from "react"
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
  IconButton,
  InputAdornment
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
import ILock from "@components/icons/Lock"
import IRectagle from "./icons/rectagle"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://mui.com/"
      >
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  )
}

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#70727B"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green"
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
      border: "1px solid #232329",
      background: "#18181C",
      borderRadius: "8px",
      color: "#70727B",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "22px",
      flex: "none",
      order: 1,
      flexGrow: 0
    },
    "&:hover fieldset": {
      borderColor: "#7b5be6"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7b5be6"
    }
  }
})

const { theme } = fullConfig

export default function SignInSide() {
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/

  const [showPassword, setShowPassword] = React.useState(false)
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
    console.log("test")
  }

  return (
    <Box>
      <Box className="p-5">
        <Grid
          container
          component="main"
          className="h-screen rounded-3xl border border-solid border-neutral-800 p-2.5"
          // sx={{ height: "100vh", border: "5px solid red", padding: "10px" }}
        >
          {/* <CssBaseline /> */}
          <Box
            component="div"
            className="absolute m-5 items-center justify-between lg:flex"
          >
            <HeadLogo />
          </Box>
          <Grid
            item
            xs={false}
            sm={6}
            md={6}
            className="rounded-[14px] bg-cover bg-no-repeat"
            sx={{
              backgroundImage: "url(/images/home/rectagle.svg)"
            }}
          />
          {/* <IRectagle /> */}
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            component={Paper}
            elevation={6}
            square
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
              <Box
              // style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
              >
                <Grid
                  container
                  spacing={1}
                >
                  <Grid
                    item
                    xs={12}
                  >
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
                  >
                    <TextField
                      className="w-full"
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
                    <Button className="btn-rainbow-theme rounded-lg bg-error-main text-sm text-neutral-300">
                      Get Code
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      className="w-full"
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
                      className="w-full"
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
                            <BeenhereOutlinedIcon />
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
                    <TextField
                      label="Enter your comment"
                      multiline
                      rows={4}
                      placeholder="Enter your comment"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="I agree my submitted data is collected and stored"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <Button
                      size="large"
                      type="submit"
                      variant="contained"
                      fullWidth
                    >
                      Submit
                    </Button>
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
