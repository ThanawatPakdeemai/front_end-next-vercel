import React, { useState } from "react"
import {
  Avatar,
  Box,
  CardHeader,
  Divider,
  IconButton,
  SwipeableDrawer
} from "@mui/material"
import { useTranslation } from "react-i18next"
import FacebookLogin from "react-facebook-login"
import dynamic from "next/dynamic"
import useProfileStore from "@stores/profileStore"
import useGlobal from "@hooks/useGlobal"
import CONFIGS from "@configs/index"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import useSyncProfile from "@mobile/features/game/containers/hooks/useSyncProfile"
import useGlobalControllerMobile from "@mobile/features/game/containers/hooks/useGlobalControllerMobile"
import { StyledAvatar } from "@mobile/components/atoms/headerMenu/HeadProfileMobile"

const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: false
})
const TelegramWidget = dynamic(
  () => import("@components/atoms/button/TelegramWidget"),
  {
    suspense: true,
    ssr: false
  }
)
const ProfileSettingModal = dynamic(() => import("./ProfileSettingModal"), {
  suspense: true,
  ssr: false
})
const PlayedHistoryModal = dynamic(() => import("./PlayedHistoryModal"), {
  suspense: true,
  ssr: false
})
const LogoutModal = dynamic(() => import("./LogoutModal"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

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
          <Icomoon className="icon-Full-Arrow-Left" />
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
                src={profile?.avatar || "/images/common/no_login_avatar.png"}
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
              <Icomoon className="icon-app-bold icon-Edit text-error-main" />
            </IconButton>
          }
          title={profile?.username}
          subheader={profile?.email}
        />
        <Box
          component="div"
          className="my-6 grid gap-6 border-b border-t border-[#35383F] py-6 text-white-default"
          sx={{
            ".icon-app": {
              color: "#fff"
            }
          }}
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
                <Icomoon className="icon-app icon-Time-Circle" />
              </Avatar>
            }
            action={
              <IconButton aria-label="All played games">
                <Icomoon className="icon-app icon-Arrow---Right-2" />
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
                <Icomoon className="icon-app icon-headset" />
              </Avatar>
            }
            action={
              <IconButton aria-label="support">
                <Icomoon className="icon-app icon-Arrow---Right-2" />
              </IconButton>
            }
            title={t("Support")}
          />
        </Box>
        {isShowSyncTelegram() && (
          <>
            <TelegramWidget
              dataOnAuth={handleSyncTelegramId}
              botName="NakaGameBot"
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
              icon={<Icomoon className="icon-Facebook" />}
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
              sx={{
                width: 56,
                height: 56,
                ".icon-app": {
                  color: "#fff"
                }
              }}
              aria-label="recipe"
            >
              <Icomoon className="icon-app icon-Logout" />
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
