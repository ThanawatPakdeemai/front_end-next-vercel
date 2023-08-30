import React from "react"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import useProfileStore from "@stores/profileStore"
import useNotiStore from "@stores/notification"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import useDrawerControllerMobileStore from "@stores/drawerControllerMobile"
import { StyledAvatar } from "@mobile/styles/muiStyleMobile"

const IconTemplate = dynamic(
  () => import("@mobile/components/templates/IconTemplate"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: false
})
const NotificationModal = dynamic(
  () => import("@mobile/components/organisms/modal/NotificationModal"),
  {
    suspense: true,
    ssr: false
  }
)
const ProfileSettingModal = dynamic(
  () => import("@mobile/components/organisms/modal/ProfileSettingModal"),
  {
    suspense: true,
    ssr: false
  }
)

const HeadProfileMobile = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { count } = useNotiStore()
  const { openNotification, setOpenNotification } = useDrawerControllerMobile()
  // const { isShowSyncTelegram } = useGlobalControllerMobile()

  const {
    openProfileCreate: toggleProfileCreate,
    setOpenProfileCreate: setToggleProfileCreate,
    openProfileSetting: toggleProfileSetting,
    setOpenProfileSetting: setToggleProfileSetting
  } = useDrawerControllerMobileStore()

  return (
    <header className="header bg-[#F32429] pb-[55px]">
      {/* {isShowSyncTelegram() && <HeaderSyncAccount target="Telegram" />} */}
      <div className="flex items-center justify-between px-5 py-10">
        <Box
          component="div"
          className="head-profile__info--wrapper flex items-center gap-4"
          sx={StyledAvatar}
          onClick={() => setToggleProfileSetting(true)}
        >
          <div className="head-profile__info--avatar">
            <ImageCustom
              src={profile?.avatar || "/images/common/no_login_avatar.png"}
              alt="avatar"
              width={55}
              height={55}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="head-profile__info--welcome flex max-w-[230px] flex-col">
            <p className="font-urbanist text-[14px]">Welcome Back! 👋</p>
            <p className="truncate font-urbanist text-[20px] font-bold">
              {profile?.username}
            </p>
          </div>
        </Box>
        <div className="head-profile__mobile--right flex items-center gap-4 text-white-primary">
          {/* TODO: Open this when In-App purchase is ready */}
          {/* <IconTemplate>
            <WalletRoundIcon />
          </IconTemplate> */}
          <IconTemplate onClick={() => setOpenNotification(true)}>
            <div
              className={`absolute right-[15px] top-[12px] h-[6px] w-[6px] rounded-full ${
                count > 0 && "bg-error-main opacity-100"
              }`}
            />
            <Icomoon className="icon-app icon-Notification" />
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
        open={toggleProfileSetting}
        setProfileSetting={(_toggle) => setToggleProfileSetting(_toggle)}
        type="edit"
      />
      {/* Profile Setting Modal */}
      <ProfileSettingModal
        open={toggleProfileCreate}
        setProfileSetting={(_toggle) => setToggleProfileCreate(_toggle)}
        title="Create Profile"
        type="create"
      />
    </header>
  )
}

export default HeadProfileMobile
