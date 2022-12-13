import React, { useEffect, useState } from "react"
import { Image } from "@components/atoms/image"
import StateIcon from "@components/atoms/stateIcon/StateIcon"
import IconButtonCustom from "@components/atoms/IconButtonCustom/IconButtonCustom"
import Balance from "@components/molecules/balance/Balance"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import { Typography, Collapse, CardActions, Card } from "@mui/material"
import Helper from "@utils/helper"
import StatProfile from "@components/molecules/statProfile/StatProfile"
import MenuProfile from "@components/molecules/menuProfile/MenuProfile"
import useGetProfileByEmail from "@feature/profile/containers/hook/getProfileByEmail"

const RightMenu = () => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [hoverExpand, setHoverExpand] = useState<boolean>(false)

  /* mock up function for profile */
  const { profile } = useGetProfileByEmail("heart@kos.design")

  useEffect(() => {
    if (!profile) {
      localStorage.setItem(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlYXJ0QGtvcy5kZXNpZ24iLCJpYXQiOjE2NzA5MTE4MjUsImV4cCI6MTY3MDkxMzYyNX0.tcM2dGOA4OZVpZ7fZETpuGG48E4E1fBDDsYRHvSdOOY"
      )
    }
  }, [profile])

  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleOnNotiClick = () => {
    /* do someing wth notification */
  }

  return (
    profile && (
      <div>
        <Card
          className={`${
            expanded ? "rounded-t-[13px] rounded-b-none" : "rounded-[13px]"
          } flex items-center justify-center`}
          sx={{
            maxWidth: 277,
            width: 277,
            height: 62,
            backgroundColor: "#010101D9",
            backgroundImage: "none"
          }}
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
              <Typography className="text-sm font-bold">
                {profile.username}
              </Typography>
              <Typography
                paragraph
                component="span"
                variant="body1"
                onClick={() => Helper.copyClipboard(profile.address)}
                className="cursor-pointer text-xs font-bold text-secondary-main"
              >
                {Helper.shortenString(profile.address)}
              </Typography>
            </div>
            <Image
              src={profile.avatar}
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
              level: profile.level,
              expAmount: profile.exp,
              maxExp: profile.max_exp
            }}
            energy={{
              staminaPoint: profile.stamina_point,
              totalStamina: profile.total_stamina
            }}
          />
          <MenuProfile />
        </Collapse>
      </div>
    )
  )
}

export default RightMenu
