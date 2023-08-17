import { TTypeSettingProfile } from "@mobile/components/organisms/modal/ProfileSettingModal"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import React from "react"

const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: true
  }
)

interface IProfileFooter {
  type: TTypeSettingProfile
}

const ProfileFooterMobile = ({ type }: IProfileFooter) => (
  <Box
    component="footer"
    className="fixed bottom-0 left-0 right-0 flex flex-col gap-6 bg-[#18181C] p-[24px_24px_36px]"
    sx={{
      borderTop: "1px solid #35383F",
      ".MuiButton-containedError:hover": {
        background: "#F32429 !important",
        boxShadow: "none !important"
      }
    }}
  >
    <ButtonLink
      text={type === "create" ? "Create" : "Update"}
      icon={<></>}
      size="large"
      color="error"
      variant="contained"
      className="w-full font-urbanist !text-white-primary"
      type="submit"
    />
  </Box>
)

export default ProfileFooterMobile
