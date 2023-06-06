import React from "react"
import useProfileStore from "@stores/profileStore"
import IconTemplate from "@mobile/components/templates/IconTemplate"
import WalletRoundIcon from "@components/icons/WalletRoundIcon"
import BellRingRoundIcon from "@components/icons/BellRingRoundIcon"
import Link from "next/link"
import { ImageCustom } from "@components/atoms/image/Image"
import { Box } from "@mui/material"
import useNotiStore from "@stores/notification"
import NotificationModal from "@mobile/components/organisms/modal/NotificationModal"
import ProfileSettingModal from "@mobile/components/organisms/modal/ProfileSettingModal"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"

const HeadProfileMobile = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { count } = useNotiStore()
  const {
    openNotification,
    setOpenNotification,
    profileSetting,
    setProfileSetting
  } = useDrawerControllerMobile()

  return (
    <header className="header bg-[#F32429] pb-[55px]">
      <div className="flex items-center justify-between px-5 py-10">
        <Box
          component="div"
          className="head-profile__info--wrapper flex items-center gap-4"
          sx={{
            color: "#E0E0E0",
            ".head-profile__info--avatar": {
              width: "48px",
              height: "48px",
              borderRadius: "48px",
              overflow: "hidden"
            },
            "p": {
              margin: 0
            }
          }}
          onClick={() => setProfileSetting(true)}
        >
          {profile ? (
            <div className="head-profile__info--avatar">
              <ImageCustom
                src={profile?.avatar || "/images/avatar.png"}
                alt="avatar"
                width={55}
                height={55}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <Link href="/login">{/* <PersonIcon /> */}</Link>
          )}
          <div className="head-profile__info--welcome flex flex-col">
            <p className="font-urbanist text-[14px]">Welcome Back! 👋</p>
            <p className="font-urbanist text-[20px] font-bold">
              {profile?.username}
            </p>
          </div>
        </Box>
        <div className="head-profile__mobile--right flex items-center gap-4">
          <IconTemplate>
            <WalletRoundIcon />
          </IconTemplate>
          <IconTemplate onClick={() => setOpenNotification(true)}>
            <div
              className={`absolute right-[15px] top-[12px] h-[6px] w-[6px] rounded-full ${
                count > 0 && "bg-error-main opacity-100"
              }`}
            />
            <BellRingRoundIcon />
          </IconTemplate>
        </div>
      </div>

      {/* Modal Notification */}
      <NotificationModal
        open={openNotification}
        setOpenNotification={setOpenNotification}
      />

      {/* Profile Setting Modal */}
      <ProfileSettingModal
        open={profileSetting}
        setProfileSetting={setProfileSetting}
      />
    </header>
  )
}

export default HeadProfileMobile
