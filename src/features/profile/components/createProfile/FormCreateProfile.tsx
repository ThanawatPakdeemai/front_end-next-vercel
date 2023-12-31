import React, { memo, useState } from "react"

import { Box, InputAdornment, TextField, Typography } from "@mui/material"
import SelectAllIcon from "@mui/icons-material/SelectAll"
import { useForm } from "react-hook-form"
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import {
  getGeoInfo,
  updateProfile
} from "@feature/profile/containers/services/profile.service"
import useProfileStore from "@stores/profileStore"
import { useToast } from "@feature/toast/containers"
import { IGeoProfile } from "@feature/profile/interfaces/IProfileService"
import useGetAvatar from "@feature/avatar/containers/hook/useGetAvatar"
import { MESSAGES } from "@constants/messages"
import { commonPattern } from "@constants/regex"

const AvatarProfile = dynamic(
  () => import("@components/atoms/avatar/AvatarProfile")
)
const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: true
  }
)
const CheckBoxNaka = dynamic(
  () => import("@components/atoms/checkBox/CheckBoxNaka")
)
const SlideAvatar = dynamic(
  () => import("@feature/avatar/components/molecules/SlideAvatar")
)

const FormCreateProfile = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { onSetProfileData } = useProfileStore()
  const { t } = useTranslation()

  const [defaultAvatar, setDefaultAvatar] = useState<string>(
    profile ? profile?.avatar : ""
  )
  const { errorToast } = useToast()
  const { avatar } = useGetAvatar()
  const router = useRouter()

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
            }).then(async (_res) => {
              await onSetProfileData({ ...profile, ..._res })
              await router.push("/")
            })
          }
        })
        .catch(() => {
          errorToast(MESSAGES.cant_update_data)
        })
    } else {
      errorToast(MESSAGES.please_login)
    }
  }

  const onError = (data) => {
    if (data) {
      errorToast(MESSAGES.please_fill)
    }
  }

  const slideTo = () => {
    setValue("_avatar", defaultAvatar)
  }

  return (
    <Box
      component="div"
      className="w-[350px]"
    >
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
            `{${t("loading")}}`
          )}
          <Box component="div">
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
              value={defaultAvatar || profile?.avatar}
              {...register("_avatar")}
            />
            <input
              hidden
              value={profile?.user_ip_address}
              {...register("_user_ip_address")}
            />
            <Typography className="mb-1 mt-2 font-neue-machina text-sm uppercase  text-neutral-500">
              {t("display name")}
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
                value = value.replace(commonPattern, "")
                setValue("_username", value)
              }}
              id="username-create"
              placeholder="Username"
              size="medium"
              helperText="Can be modified later"
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
            {t("avatar")}
          </Typography>
          {avatar ? (
            <Box
              component="div"
              className="hide-scroll mt-2 flex w-[350px] items-center gap-3 overflow-x-scroll pb-3"
            >
              {avatar.map((item, index) => (
                <Box
                  component="div"
                  id={item.name}
                  key={Number(index)}
                  onClick={() => {
                    slideTo()
                    setDefaultAvatar(item.value)
                    setValue("_avatar", item.value)
                  }}
                >
                  <AvatarProfile
                    borderColor={
                      item.value === defaultAvatar
                        ? "border-error-main"
                        : "border-neutral-600"
                    }
                    // border={{ width: "!w-[52px]", height: "!h-auto" }}
                    // image={{ width: "!w-[48px]", height: "!h-auto" }}
                    border={{ width: "!w-[85px]", height: "!h-[85px]" }}
                    image={{ width: "!w-[80px]", height: "!h-[80px]" }}
                    height="h-auto"
                    src={item.value}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            // "loading..."
            `{${t("loading")}}`
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
