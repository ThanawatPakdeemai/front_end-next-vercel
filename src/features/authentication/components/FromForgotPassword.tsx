import React, { memo, useState } from "react"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import {
  Box,
  ButtonGroup,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import { useToast } from "@feature/toast/containers"
import { useForm } from "react-hook-form"
import { MESSAGES } from "@constants/messages"
import ButtonLink from "@components/atoms/button/ButtonLink"
import useResetPassword from "../containers/hooks/useResetPassword"

const FromForgotPassword = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { errorToast, successToast } = useToast()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      _email: ""
    }
  })
  const { mutateForgotPassword, isLoading } = useResetPassword()

  const onSubmit = (data) => {
    mutateForgotPassword(data._email)
      .then((_data) => {
        if (_data && _data.status) {
          successToast(MESSAGES.reset_password_success)
          handleClose()
        }
      })
      .catch((_error) => {
        errorToast(_error.data.message)
      })
  }
  const onError = () => {
    errorToast(MESSAGES.please_fill)
  }

  return (
    <>
      <Typography
        className="cursor-pointer text-right text-sm text-neutral-500"
        onClick={handleOpen}
      >
        Forget Password?
      </Typography>
      <Box className="m-auto w-max rounded-xl bg-neutral-700 p-1">
        <Box className="xs:flex-col items-center justify-between gap-1 lg:flex">
          {/* <ButtonLogin handleButton={handleOpen} /> */}
        </Box>
        <ModalCustom
          open={open}
          onClose={handleClose}
          className="w-auto gap-3 rounded-[34px] p-[10px]"
          width={400}
        >
          <Stack
            spacing={3}
            className="md:p-5"
          >
            <ModalHeader
              handleClose={handleClose}
              title="Forget Password"
            />
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <Box>
                <Typography className="mb-2 font-neue-machina text-sm uppercase  text-neutral-500">
                  Email Address
                </Typography>
                <TextField
                  className="w-full"
                  required
                  type="email"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      width: "100%"
                    }
                  }}
                  {...register("_email")}
                  id="email-login"
                  placeholder="Email"
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
              <ButtonGroup className="mt-10  gap-3">
                <ButtonLink
                  className="h-[40px] !min-w-[150px] text-sm"
                  href=""
                  onClick={handleClose}
                  text="Back"
                  size="medium"
                />
                <ButtonLink
                  icon={<></>}
                  size="medium"
                  color="secondary"
                  disabled={isLoading}
                  className="h-[40px] !min-w-[200px]  text-sm"
                  href=""
                  onClick={() => {}}
                  text={
                    <>
                      {isLoading ? (
                        <CircularProgress
                          color="primary"
                          className="ml-4"
                          size={20}
                        />
                      ) : (
                        "Reset Password"
                      )}
                    </>
                  }
                  type="submit"
                  variant="contained"
                />
              </ButtonGroup>
            </form>
          </Stack>
        </ModalCustom>
      </Box>
    </>
  )
}

export default memo(FromForgotPassword)
