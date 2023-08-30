import React from "react"
import { Box, Grid, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"

const FormCreateProfile = dynamic(
  () => import("@feature/profile/components/createProfile/FormCreateProfile"),
  {
    suspense: true,
    ssr: false
  }
)

const CreateProfileLayout = () => {
  const { t } = useTranslation()
  return (
    <>
      <Box
        component="div"
        className="w-auto p-[1.875rem]"
      >
        <Grid container>
          <Grid
            item
            xs={12}
          >
            <Box component="div">
              <Typography className="text-[14px] font-bold uppercase text-neutral-300">
                {t("create_profile")}
              </Typography>
            </Box>
            <hr className="mx-0 mb-8 mt-5 text-neutral-800" />
            <FormCreateProfile />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default CreateProfileLayout
