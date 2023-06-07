import { Box, TextField } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { StyledBaseInputMobile } from "@mobile/styles/muiStyleMobile"
import HorizontalThumbSlide from "@feature/slider/components/templates/HorizontalThumbSlide"
import ProfileFooterMobile from "../molecules/ProfileFooterMobile"
import useProfileSettingController from "../../containers/useProfileSettingController"

const FormProfileSetting = () => {
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

  return (
    <Box
      component="div"
      className="profile-content__mobile flex flex-col justify-between gap-4"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <ProfileSliderMobile setValueProfileSetting={setValueProfileSetting} /> */}
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
          sx={{
            ...StyledBaseInputMobile,
            "&.MuiOutlinedInput-root": {
              borderRadius: "8px",
              background: "#18181C",
              border: "1px solid #232329",
              padding: "10px"
            }
          }}
          value={watchProfileSetting("_username")}
          onChange={(event) => {
            let { value } = event.target
            value = value.replace(/[^A-Za-z0-9]/gi, "")
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
          sx={StyledBaseInputMobile}
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
          sx={{
            ...StyledBaseInputMobile,
            "&.MuiOutlinedInput-root": {
              borderRadius: "8px",
              background: "#18181C",
              border: "1px solid #232329",
              padding: "10px"
            }
          }}
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
          sx={{
            ...StyledBaseInputMobile,
            "&.MuiOutlinedInput-root": {
              borderRadius: "8px",
              background: "#18181C",
              border: "1px solid #232329",
              padding: "10px"
            }
          }}
          value={watchProfileSetting("_user_ip_address")}
          onChange={(event) => {
            const { value } = event.target
            setValueProfileSetting("_user_ip_address", value)
          }}
          id="ip_address"
          size="medium"
          disabled
        />
        <ProfileFooterMobile />
      </form>
    </Box>
  )
}

export default FormProfileSetting
