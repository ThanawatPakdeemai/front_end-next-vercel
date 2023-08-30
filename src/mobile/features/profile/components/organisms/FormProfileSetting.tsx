import { Box, TextField } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { StyledBaseInputMobile } from "@mobile/styles/muiStyleMobile"
import { commonPattern } from "@constants/regex"
import { TTypeSettingProfile } from "@mobile/components/organisms/modal/ProfileSettingModal"
import useProfileSettingController from "@src/mobile/features/profile/containers/useProfileSettingController"
import dynamic from "next/dynamic"

const HorizontalThumbSlide = dynamic(
  () => import("@feature/slider/components/templates/HorizontalThumbSlide"),
  {
    suspense: true,
    ssr: false
  }
)
const ProfileFooterMobile = dynamic(
  () => import("../molecules/ProfileFooterMobile"),
  {
    suspense: true,
    ssr: false
  }
)

interface IFormProfileSetting {
  type: TTypeSettingProfile
}

const FormProfileSetting = ({ type }: IFormProfileSetting) => {
  const {
    handleSubmit,
    onSubmit,
    watchProfileSetting,
    setValueProfileSetting,
    avatarList,
    avatarGoto,
    featchAvatar,
    setDefaultAvatar
  } = useProfileSettingController()
  const { t } = useTranslation()

  const StyledInput = {
    ...StyledBaseInputMobile
  }

  return (
    <Box
      component="div"
      className="profile-content__mobile flex flex-col justify-between gap-4"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="section"
          id="profile-avatar__slider"
          className="w-full"
        >
          <HorizontalThumbSlide
            items={avatarList}
            sliderType="avatar"
            currentSelected={avatarGoto}
            settingSingle={{
              speed: 500
            }}
            settingThumbnail={{
              speed: 500,
              slidesToShow: 4,
              afterChange: (current: number) => {
                const selected = avatarList[current]
                if (selected) {
                  setDefaultAvatar(selected.src)
                  featchAvatar()
                }
              }
            }}
          />
        </Box>
        <TextField
          className="mb-5 w-full"
          required
          type="text"
          sx={StyledInput}
          value={watchProfileSetting("_username")}
          onChange={(event) => {
            let { value } = event.target
            value = value.replace(commonPattern, "")
            setValueProfileSetting("_username", value)
          }}
          id="username"
          placeholder="Display name"
          size="medium"
        />
        <TextField
          className="mb-5 w-full"
          required
          type="email"
          sx={StyledInput}
          value={watchProfileSetting("_email")}
          onChange={(event) => {
            const { value } = event.target
            setValueProfileSetting("_email", value)
          }}
          id="email"
          placeholder={`${t("email")}`}
          size="medium"
          disabled
        />
        <TextField
          className="mb-5 w-full"
          required
          type="text"
          sx={StyledInput}
          value={watchProfileSetting("_country")}
          onChange={(event) => {
            const { value } = event.target
            setValueProfileSetting("_country", value)
          }}
          id="country"
          size="medium"
          disabled
        />
        <TextField
          className="mb-5 w-full"
          required
          type="text"
          sx={StyledInput}
          value={watchProfileSetting("_user_ip_address")}
          onChange={(event) => {
            const { value } = event.target
            setValueProfileSetting("_user_ip_address", value)
          }}
          id="ip_address"
          size="medium"
          disabled
        />
        <ProfileFooterMobile type={type} />
      </form>
    </Box>
  )
}

export default FormProfileSetting
