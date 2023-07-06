import React, { useState } from "react"
import {
  Avatar,
  Box,
  CardHeader,
  Divider,
  IconButton,
  SwipeableDrawer
} from "@mui/material"
import EditProfileIcon from "@components/icons/EditProfileIcon"
import useProfileStore from "@stores/profileStore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import Support2Icon from "@components/icons/Support2Icon"
import ClockIcon from "@components/icons/ClockIcon"
import LogoutIcon from "@components/icons/LogoutIcon"
import { useTranslation } from "react-i18next"
import useGlobal from "@hooks/useGlobal"
import { ImageCustom } from "@components/atoms/image/Image"
import { StyledAvatar } from "@mobile/components/atoms/headerMenu/HeadProfileMobile"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import useSyncProfile from "@mobile/features/game/containers/hooks/useSyncProfile"
import { TelegramWidget } from "@components/atoms/button/TelegramWidget"
import useGlobalControllerMobile from "@mobile/features/game/containers/hooks/useGlobalControllerMobile"
import FacebookLogin from "react-facebook-login"
import FacebookColorIcon from "@components/icons/SocialIcon/FacebookColorIcon"
import CONFIGS from "@configs/index"
import ProfileSettingModal from "./ProfileSettingModal"
import PlayedHistoryModal from "./PlayedHistoryModal"
import LogoutModal from "./LogoutModal"

interface ISettingModalProps {
  open: boolean
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingModal = ({ open, setOpenSetting }: ISettingModalProps) => {
  const { openInNewTab } = useGlobal()
  const profile = useProfileStore((state) => state.profile.data)
  const [toggleLogout, setToggleLogout] = useState(false)
  const [toggleProflie, setToggleProflie] = useState(false)
  const [togglePlayedHistory, setTogglePlayedHistory] = useState(false)

  const { t } = useTranslation()
  const { clearAllDrawer } = useDrawerControllerMobile()
  const { handleSyncTelegramId, handleSyncFacebookId } = useSyncProfile()
  const { isShowSyncTelegram, isShowSyncFacebook } = useGlobalControllerMobile()

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={() => setOpenSetting(false)}
      onOpen={() => {
        clearAllDrawer()
        setOpenSetting(true)
      }}
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
          <ArrowBackIcon />
          Settings
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
            },
            ...StyledAvatar
          }}
          avatar={
            <div className="head-profile__info--avatar">
              <ImageCustom
                src={profile?.avatar || "/images/avatar.png"}
                alt="avatar"
                width={55}
                height={55}
                className="h-full w-full object-cover"
              />
            </div>
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
          className="my-6 grid gap-6 border-b border-t border-[#35383F] py-6"
        >
          <CardHeader
            onClick={() => setTogglePlayedHistory(!togglePlayedHistory)}
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
              <IconButton aria-label="All played games">
                <NavigateNextIcon className="text-white-default" />
              </IconButton>
            }
            title={t("History")}
          />
          <CardHeader
            onClick={() => openInNewTab("https://t.me/NakamotoGames")}
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
        {isShowSyncTelegram() && (
          <>
            <TelegramWidget
              dataOnAuth={handleSyncTelegramId}
              botName="NakaGameMBot"
            />
            <Divider className="my-6 !block border-b border-[#35383F]" />
          </>
        )}
        {isShowSyncFacebook() && (
          <>
            <FacebookLogin
              appId={`${CONFIGS.FACEBOOK_APP_ID}`}
              autoLoad={false}
              fields="name,email,picture"
              callback={handleSyncFacebookId}
              cssClass="my-facebook-button-class flex gap-2 items-center h-[50px] rounded-2xl border border-solid border-neutral-690 !bg-neutral-800 px-3"
              icon={<FacebookColorIcon />}
              textButton="Sync with Facebook"
            />
            <Divider className="my-6 !block border-b border-[#35383F]" />
          </>
        )}

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
        type="edit"
      />
      <PlayedHistoryModal
        open={togglePlayedHistory}
        setOpenPlayedHistory={() => setTogglePlayedHistory(false)}
      />
    </SwipeableDrawer>
  )
}
export default SettingModal
