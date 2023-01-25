import SlideAvatar from "@feature/avatar/components/molecules/SlideAvatar"
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material"
import useProfileStore from "@stores/profileStore"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined"
import useGetAvatar from "@feature/avatar/containers/hook/useGetAvatar"
import AvatarProfile from "@components/atoms/avatar/AvatarProfile"
import CameraIcon from "@components/icons/CameraIcon"
import RepeatIcon from "@components/icons/RepeatIcon"

const FormEditProfile = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { avatar } = useGetAvatar()
  const [defaultAvatar, setDefaultAvatar] = useState<string>(
    profile ? profile?.avatar : ""
  )

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

  const slideTo = () => {}

  return (
    <Box className="w-[350px]">
      {profile && (
        <form onSubmit={() => {}}>
          <Typography className="mt-2 mb-1 font-neue-machina text-xs uppercase  text-neutral-500">
            Banner UPload Only Rank Platinum
          </Typography>
          <div className="flex h-[66px] items-center	justify-center rounded-xl bg-neutral-700">
            <CameraIcon />
          </div>
          <Typography className="mt-2 font-neue-machina text-xs uppercase  text-neutral-500">
            Recommendsize : W908 x H180
          </Typography>
          <Divider className="my-6" />
          <Typography className="mt-2 mb-1 font-neue-machina text-xs uppercase text-neutral-500">
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
              style: { fontFamily: "neueMachina" },
              startAdornment: (
                <InputAdornment position="start">
                  <PermContactCalendarOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <RepeatIcon />
                </InputAdornment>
              )
            }}
          />
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
                    border={{ width: "!w-[62px]", height: "!h-fit" }}
                    image={{ width: "!w-[58px]", height: "!h-[58px]" }}
                    src={item.value}
                    height="!h-fit"
                  />
                </Box>
              ))}
            </Box>
          ) : (
            "loading..."
          )}
          <Button
            sx={{ fontFamily: "neueMachina" }}
            color="secondary"
            className="btn-rainbow-theme mt-[38px] w-full text-sm"
            variant="contained"
            size="large"
          >
            Save
          </Button>
        </form>
      )}
    </Box>
  )
}

export default FormEditProfile
