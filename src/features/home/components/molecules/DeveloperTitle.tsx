import { Typography } from "@mui/material"
import { memo } from "react"
import { Trans } from "react-i18next"

const DeveloperTitle = () => (
  <>
    <div className="p-4">
      <Typography className="!text-default !text-white-primary">
        <Trans i18nKey="heaven_for_dev" />
      </Typography>
      <Typography className="!text-default !text-white-primary">
        <Trans i18nKey="unlimited_your_way" />
      </Typography>
      <Typography className="!mt-3 !text-sm !text-black-default">
        <Trans i18nKey="dev_desc" />
      </Typography>
    </div>
  </>
)

export default memo(DeveloperTitle)
