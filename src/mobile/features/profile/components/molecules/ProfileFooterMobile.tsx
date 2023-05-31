import ButtonLink from "@components/atoms/button/ButtonLink"
import { Box } from "@mui/material"
import React from "react"

const ProfileFooterMobile = () => {
  return (
    <Box
      component={"footer"}
      className="fixed bottom-0 left-0 right-0 flex flex-col gap-6 bg-[#18181C] p-[24px_24px_36px]"
      sx={{
        borderTop: "1px solid #35383F"
      }}
    >
      <ButtonLink
        text={"Update"}
        icon={<></>}
        size="large"
        color="error"
        variant="contained"
        className="w-full font-urbanist !text-white-primary"
        onClick={() => {}}
      />
    </Box>
  )
}

export default ProfileFooterMobile
