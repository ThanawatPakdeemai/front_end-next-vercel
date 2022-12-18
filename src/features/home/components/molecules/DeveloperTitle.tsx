import { Typography } from "@mui/material"
import { memo } from "react"

const DeveloperTitle = () => (
  <>
    <div className="p-4">
      <Typography className="!text-default !text-white-primary">
        HEAVEN FOR DEVELOPERS:
      </Typography>
      <Typography className="!text-default !text-white-primary">
        UNLIMITED OPPORTUNITIES YOUR WAY 👀
      </Typography>
      <Typography className="!mt-3 !text-sm !text-black-default">
        Just like mobile app developers deploy their applications on the Google
        Play Store, gaming developers now have access to the Nakamoto User Base
        - an all-in-one exclusive platform to launch their very own Play to Earn
        games. Now monetize your game in any way you want with our versatile
        platform and explore the array of interesting possibilities that
        Nakamoto Games has on board for skilled developers like you!
      </Typography>
    </div>
  </>
)

export default memo(DeveloperTitle)
