import { Typography } from "@mui/material"
import { memo } from "react"
import { Trans } from "react-i18next"

const DeveloperTitle = () => (
  <div className="developer-title p-[30px]">
    <Typography className="font-neue-machina-semi !text-default !text-white-primary">
      <Trans i18nKey="heaven_for_dev" />
    </Typography>
    <Typography className="font-neue-machina-semi !text-default !text-white-primary">
      <Trans i18nKey="unlimited_your_way" />
    </Typography>
    <Typography className="!mt-4 !text-sm !text-primary-contrastText">
      <Trans i18nKey="dev_desc" />
    </Typography>
  </div>
)

export default memo(DeveloperTitle)
