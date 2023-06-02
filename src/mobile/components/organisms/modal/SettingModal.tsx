import React, { useState } from "react"
import {
  Avatar,
  Box,
  CardHeader,
  IconButton,
  SwipeableDrawer
} from "@mui/material"
import LogoNakaBigIcon from "@components/icons/LogoNakaBigIcon"
import EditProfileIcon from "@components/icons/EditProfileIcon"
import useProfileStore from "@stores/profileStore"
import { Image } from "@components/atoms/image/index"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import Support2Icon from "@components/icons/Support2Icon"
import Profile2Icon from "@components/icons/Profile2Icon"
import ClockIcon from "@components/icons/ClockIcon"
import LogoutIcon from "@components/icons/LogoutIcon"
import { useTranslation } from "react-i18next"
import LogoutModal from "./LogoutModal"
import ProfileSettingModal from "./ProfileSettingModal"

interface ISettingModalProps {
  open: boolean
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingModal = ({ open, setOpenSetting }: ISettingModalProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  const [toggleLogout, setToggleLogout] = useState(false)
  const [toggleProflie, setToggleProflie] = useState(false)

  const { t } = useTranslation()

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={() => setOpenSetting(false)}
      onOpen={() => setOpenSetting(true)}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true
      }}
      sx={{
        ".MuiDrawer-paper": {
          background: "#121212",
          width: "100%"
        }
      }}
    >
      <Box
        component="div"
        className="setting-list flex flex-col p-[8px_24px_36px]"
      >
        <h2
          className="flex items-center gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-default"
          onClick={() => setOpenSetting(false)}
          aria-hidden="true"
        >
          <LogoNakaBigIcon
            width={30}
            height={14}
          />
          Setting
        </h2>
        <CardHeader
          sx={{
            padding: "0px",
            "& .MuiCardHeader-action": {
              alignSelf: "center"
            },
            "& .MuiCardHeader-title": {
              color: "#fff",
              fontSize: "20px",
              fontFamily: "Urbanist",
              fontWeight: "700"
            },
            "& .MuiCardHeader-subheader": {
              color: "#E0E0E0",
              fontSize: "16px",
              fontFamily: "Urbanist",
              fontWeight: "500"
            }
          }}
          avatar={
            <Avatar
              sx={{ bgcolor: "red", width: 80, height: 80 }}
              aria-label="recipe"
            >
              {profile && (
                <Image
                  src={profile.avatar}
                  width={80}
                  height={80}
                  alt="avatar-profile"
                />
              )}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => setToggleProflie(!toggleProflie)}
            >
              <EditProfileIcon />
            </IconButton>
          }
          title={profile?.username}
          subheader={profile?.email}
        />
        <Box
          component="div"
          className="border-neutral-600 py-6"
        >
          <hr />
        </Box>
        <Box
          component="div"
          className="grid gap-6"
        >
          <CardHeader
            sx={{
              padding: "0px",
              "& .MuiCardHeader-action": {
                alignSelf: "center"
              },
              "& .MuiCardHeader-title": {
                color: "#fff",
                fontSize: "20px",
                fontFamily: "Urbanist",
                fontWeight: "700"
              },
              "& .MuiCardHeader-subheader": {
                color: "#E0E0E0",
                fontSize: "16px",
                fontFamily: "Urbanist",
                fontWeight: "500"
              }
            }}
            avatar={
              <Avatar
                className="bg-error-100"
                sx={{ width: 56, height: 56 }}
                aria-label="recipe"
              >
                <ClockIcon />
              </Avatar>
            }
            action={
              <IconButton aria-label="played history">
                <NavigateNextIcon className="text-white-default" />
              </IconButton>
            }
            title={t("Played History")}
          />
          <CardHeader
            sx={{
              padding: "0px",
              "& .MuiCardHeader-action": {
                alignSelf: "center"
              },
              "& .MuiCardHeader-title": {
                color: "#fff",
                fontSize: "20px",
                fontFamily: "Urbanist",
                fontWeight: "700"
              },
              "& .MuiCardHeader-subheader": {
                color: "#E0E0E0",
                fontSize: "16px",
                fontFamily: "Urbanist",
                fontWeight: "500"
              }
            }}
            avatar={
              <Avatar
                className="bg-error-100"
                sx={{ width: 56, height: 56 }}
                aria-label="recipe"
              >
                <Profile2Icon />
              </Avatar>
            }
            action={
              <IconButton aria-label="profile">
                <NavigateNextIcon className="text-white-default" />
              </IconButton>
            }
            title="Profile"
          />
          <CardHeader
            sx={{
              padding: "0px",
              "& .MuiCardHeader-action": {
                alignSelf: "center"
              },
              "& .MuiCardHeader-title": {
                color: "#fff",
                fontSize: "20px",
                fontFamily: "Urbanist",
                fontWeight: "700"
              },
              "& .MuiCardHeader-subheader": {
                color: "#E0E0E0",
                fontSize: "16px",
                fontFamily: "Urbanist",
                fontWeight: "500"
              }
            }}
            avatar={
              <Avatar
                className="bg-error-100"
                sx={{ width: 56, height: 56 }}
                aria-label="recipe"
              >
                <Support2Icon />
              </Avatar>
            }
            action={
              <IconButton aria-label="support">
                <NavigateNextIcon className="text-white-default" />
              </IconButton>
            }
            title={t("Support")}
          />
        </Box>
        <Box
          component="div"
          className="border-neutral-600 py-6"
        >
          <hr />
        </Box>
        <CardHeader
          onClick={() => setToggleLogout(!toggleLogout)}
          sx={{
            padding: "0px",
            "& .MuiCardHeader-action": {
              alignSelf: "center"
            },
            "& .MuiCardHeader-title": {
              color: "#fff",
              fontSize: "20px",
              fontFamily: "Urbanist",
              fontWeight: "700"
            },
            "& .MuiCardHeader-subheader": {
              color: "#E0E0E0",
              fontSize: "16px",
              fontFamily: "Urbanist",
              fontWeight: "500"
            }
          }}
          avatar={
            <Avatar
              className="bg-neutral-800"
              sx={{ width: 56, height: 56 }}
              aria-label="recipe"
            >
              <LogoutIcon />
            </Avatar>
          }
          title={t("logout")}
        />
      </Box>
      {/* Modal Logout */}
      <LogoutModal
        open={toggleLogout}
        setOpen={(_toggle) => setToggleLogout(_toggle)}
      />
      {/* Profile Setting Modal */}
      <ProfileSettingModal
        open={toggleProflie}
        setProfileSetting={() => setToggleProflie(false)}
      />
    </SwipeableDrawer>
  )
}
export default SettingModal
