import React, { memo, useRef, useState } from "react"

import { Box, InputAdornment, TextField, Typography } from "@mui/material"
import AvatarProfile from "@components/atoms/avatar/AvatarProfile"
import ButtonLink from "@components/atoms/button/ButtonLink"
import SelectAllIcon from "@mui/icons-material/SelectAll"
import {
  getGeoInfo,
  updateProfile
} from "@feature/profile/containers/services/profile.service"
import { useForm } from "react-hook-form"
import useProfileStore from "@stores/profileStore"
import { useToast } from "@feature/toast/containers"
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined"
import CheckBoxNaka from "@components/atoms/checkBox/CheckBoxNaka"
import { IGeoProfile } from "@feature/profile/interfaces/IProfileService"
import SlideAvatar from "@feature/avatar/components/molecules/SlideAvatar"
import useGetAvatar from "@feature/avatar/containers/hook/useGetAvatar"

const FormCreateProfile = () => {
  const profile = useProfileStore((state) => state.profile.data)

  const [defaultAvatar, setDefaultAvatar] = useState<string>(
    profile ? profile?.avatar : ""
  )
  const { errorToast } = useToast()
  const { avatar } = useGetAvatar()

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      _email: profile?.email,
      _username: profile?.username,
      _avatar: profile?.avatar,
      _subscription: Boolean(profile?.subscription),
      _country: profile?.country,
      _user_ip_address: profile?.user_ip_address
    }
  })

  const onSubmit = (data) => {
    if (data && profile) {
      getGeoInfo()
        .then((res: unknown) => {
          const geo = res as unknown as IGeoProfile
          if (res) {
            updateProfile({
              _email: data._email,
              _username: data._username,
              _avatar: data._avatar,
              _subscription: data._subscription,
              _country: geo.country,
              _user_ip_address: geo.ip
            })
          }
        })
        .catch(() => {
          errorToast("Can't update data")
        })
    } else {
      errorToast("Please login")
    }
  }

  const onError = (data) => {
    if (data) {
      errorToast("Please fill completely")
    }
  }

  const slideTo = () => {}

  return (
    <Box className="w-[350px]">
      {profile && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {avatar ? (
            <SlideAvatar
              avatar={avatar}
              defaultAvatar={defaultAvatar ?? ""}
              slideTo={slideTo}
              setDefaultAvatar={setDefaultAvatar}
            />
          ) : (
            "loading..."
          )}
          <Box>
            <input
              hidden
              value={profile?.country}
              {...register("_country")}
            />
            <input
              hidden
              value={profile?.email}
              {...register("_email")}
            />
            <input
              hidden
              value={profile?.avatar}
              {...register("_avatar")}
            />
            <input
              hidden
              value={profile?.user_ip_address}
              {...register("_user_ip_address")}
            />
            <Typography className="mt-2 mb-1 font-neue-machina text-sm uppercase  text-neutral-500">
              display name
            </Typography>
            <TextField
              className="mb-5 w-full"
              required
              type="text"
              sx={{
                "& .MuiOutlinedInput-root": {
                  width: "100%"
                }
              }}
              value={watch("_username")}
              onChange={(event) => {
                let { value } = event.target
                value = value.replace(/[^A-Za-z0-9]/gi, "")
                setValue("_username", value)
              }}
              id="username-create"
              placeholder="Username"
              size="medium"
              helperText="Can modified later"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PermContactCalendarOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Typography className=" font-neue-machina text-sm   text-neutral-500">
            Avatar
          </Typography>
          {avatar ? (
            <Box className="hide-scroll mt-2 flex w-[350px] items-center gap-3 overflow-x-scroll pb-3">
              {avatar.map((item, index) => (
                <Box
                  id={item.name}
                  key={Number(index)}
                  onClick={() => {
                    slideTo()
                    setDefaultAvatar(item.value)
                  }}
                >
                  <AvatarProfile
                    borderColor={
                      item.value === defaultAvatar
                        ? "border-error-main"
                        : "border-neutral-600"
                    }
                    border={{ width: "!w-[52px]", height: "!h-[52px]" }}
                    image={{ width: "!w-[48px]", height: "!h-[48px]" }}
                    src={item.value}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            "loading..."
          )}

          <CheckBoxNaka
            value={watch("_subscription")}
            onHandle={() => setValue("_subscription", !watch("_subscription"))}
            text="Would you like to subscribe to Nakamoto Games Newsletter?"
            className="my-5"
          />
          <ButtonLink
            icon={<SelectAllIcon />}
            size="medium"
            color="secondary"
            className="h-[40px] !min-w-[100%]  text-sm"
            href=""
            onClick={() => {}}
            text="Create"
            type="submit"
            variant="contained"
          />
        </form>
      )}
    </Box>
  )
}

export default memo(FormCreateProfile)
