import * as React from "react"
import { Image } from "@components/atoms/image"
import StateIcon from "@components/atoms/stateIcon/StateIcon"
import IconButtonCustom from "@components/atoms/IconButtonCustom/IconButtonCustom"
import Balance from "@components/molecules/balance/Balance"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import { Typography, Collapse, CardActions, Card } from "@mui/material"
import Helper from "@utils/helper"
import StatProfile from "@components/molecules/statProfile/StatProfile"

const RightMenu = () => {
  const [expanded, setExpanded] = React.useState(false)
  const [hoverExpand, setHoverExpand] = React.useState(false)

  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleOnNotiClick = () => {
    /* do someing wth notification */
  }

  return (
    <div>
      <Card
        className={`${
          expanded ? "rounded-t-[13px] rounded-b-none" : "rounded-[13px]"
        } flex items-center justify-center bg-[#01010133]`}
        sx={{ maxWidth: 277, width: 277, height: 62 }}
      >
        <CardActions
          className="flex justify-between rounded-[13px] border-2  border-grey-900 bg-[#18181cff] px-0"
          sx={{ maxWidth: 265, width: 265, height: 50 }}
          disableSpacing
        >
          {/* notification */}
          <IconButtonCustom
            onClick={handleOnNotiClick}
            className={`h-10 w-10 rounded-[13px] border-[2px]
             border-grey-900 bg-transparent duration-300 ease-bounce hover:scale-125 hover:bg-transparent`}
            aria-label="notification-button"
          >
            <NotificationsOutlinedIcon className="text-white-primary transition-all duration-300 hover:rotate-[15deg]" />
          </IconButtonCustom>
          <div className="flex-1 flex-col items-center">
            <Typography className="text-sm font-bold">Hazuto</Typography>
            <Typography
              paragraph
              component="span"
              variant="body1"
              onClick={() =>
                Helper.copyClipboard(
                  "0xa27Ac327984696606D8FfFb17b8ea2D03133EA20"
                )
              }
              className="cursor-pointer text-xs font-bold text-secondary-main"
            >
              {Helper.shortenString(
                "0xa27Ac327984696606D8FfFb17b8ea2D03133EA20"
              )}
            </Typography>
          </div>
          <Image
            src="https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/naka-punk-new/9988.png"
            alt="avatar"
            width={40}
            height={40}
            className="mr-[5px] rounded-lg"
          />
          {/* expand button */}
          <IconButtonCustom
            expand={expanded}
            hover={hoverExpand}
            onClick={handleOnExpandClick}
            aria-expanded={expanded}
            aria-label="expanded-menu-profile"
            className={`mr-[2px] h-10 w-10 rounded-[13px] border-[2px] border-grey-900 duration-400 ease-bounce  ${
              !expanded
                ? "bg-secondary-main hover:scale-[85%]"
                : "bg-error-main"
            } ${!expanded ? "rotate-0	" : "rotate-180"} ${
              expanded && !hoverExpand
                ? "rotate-[-45deg] scale-[75%]"
                : "scale-1 rotate-0"
            }
            ${!expanded ? "hover:bg-secondary-main" : "hover:bg-error-main"}`}
            onMouseOver={() => {
              setHoverExpand(true)
            }}
            onMouseOut={() => {
              setHoverExpand(false)
            }}
          >
            <StateIcon
              expanded={expanded}
              hover={hoverExpand}
            />
          </IconButtonCustom>
        </CardActions>
      </Card>
      <Collapse
        in={expanded}
        timeout="auto"
        className="rounded-b-[19px] pt-[10px]"
        sx={{
          position: "absolute",
          backgroundColor: "#010101D9",
          maxWidth: 277,
          width: 277,
          zIndex: 99999
        }}
      >
        <Balance
          variant="naka"
          token="NAKA"
        />
        <StatProfile
          exp={{
            level: 20,
            expAmount: 325,
            maxExp: 500
          }}
          energy={{
            staminaPoint: 12,
            totalStamina: 20
          }}
        />
      </Collapse>
    </div>
  )
}

export default RightMenu
