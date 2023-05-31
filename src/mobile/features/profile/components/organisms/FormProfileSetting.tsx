import { Box, TextField } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { StyledBaseInputMobile } from "@mobile/styles/muiStyleMobile"
import ProfileSliderMobile from "../molecules/ProfileSliderMobile"
import ProfileFooterMobile from "../molecules/ProfileFooterMobile"
import useProfileSettingController from "../../containers/useProfileSettingController"

const FormProfileSetting = () => {
  const {
    handleSubmit,
    onSubmit,
    watchProfileSetting,
    setValueProfileSetting
  } = useProfileSettingController()
  const { t } = useTranslation()

  return (
    <Box
      component="div"
      className="profile-content__mobile flex flex-col justify-between gap-4"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProfileSliderMobile />
        <TextField
          className="mb-5 w-full"
          required
          type="text"
          sx={StyledBaseInputMobile}
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
          sx={StyledBaseInputMobile}
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
          sx={StyledBaseInputMobile}
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
