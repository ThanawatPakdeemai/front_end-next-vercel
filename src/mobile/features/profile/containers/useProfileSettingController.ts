import { MESSAGES } from "@constants/messages"
import useGetAvatar from "@feature/avatar/containers/hook/useGetAvatar"
import useGetProfileInfo from "@feature/profile/containers/hook/getProfileInfo"
import useUpdateProfile from "@feature/profile/containers/hook/getUpdateProfile"
import { getGeoInfo } from "@feature/profile/containers/services/profile.service"
import { IGeoProfile } from "@feature/profile/interfaces/IProfileService"
import { IVerticalThumbSlide } from "@feature/slider/interfaces/ISlides"
import { useToast } from "@feature/toast/containers"
import useGlobal from "@hooks/useGlobal"
import useLoadingStore from "@stores/loading"
import useProfileStore from "@stores/profileStore"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const useProfileSettingController = () => {
  // Store
  const { setOpen, setClose } = useLoadingStore()
  const profile = useProfileStore((state) => state.profile.data)

  // Hook
  const { avatar } = useGetAvatar()
  const { limit, page } = useGlobal()
  const { mutateUpdateProfile } = useUpdateProfile()
  const { errorToast, successToast } = useToast()
  const { refetchGetProfile: onRefetchProfile } = useGetProfileInfo({
    _limit: limit,
    _playerId: profile?.id ?? "",
    _page: page,
    _sort: "",
    _cheat: "All",
    _rewards_send_status: "All"
  })

  // State
  const [defaultAvatar, setDefaultAvatar] = useState<string>(
    profile ? profile.avatar : ""
  )
  const [avatarGoto, setAvatarGoto] = useState<number>(0)

  /**
   * @description Set game media
   * @returns {IVerticalThumbSlide[]}
   */
  const setAvatarList = (): IVerticalThumbSlide[] => {
    const avatar_list: IVerticalThumbSlide[] = []
    if (avatar && avatar.length > 0) {
      avatar.map((slide, index) =>
        avatar_list.push({
          id: index,
          type: "image",
          src: slide.value
        })
      )
      return avatar_list
    }
    return avatar_list
  }

  const {
    register: registerProfileSetting,
    handleSubmit,
    watch: watchProfileSetting,
    setValue: setValueProfileSetting
  } = useForm({
    defaultValues: {
      _email: profile?.email,
      _username: profile?.username ?? "",
      _avatar: profile?.avatar,
      _subscription: Boolean(profile?.subscription),
      _country: profile?.country,
      _user_ip_address: profile?.user_ip_address
    }
  })

  const featchAvatar = useCallback(() => {
    if (avatar && avatar.length > 0) {
      const currentAvatar = setAvatarList().findIndex(
        (_avatar) => _avatar.src === defaultAvatar
      )
      if (currentAvatar) {
        setAvatarGoto(currentAvatar)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar, defaultAvatar, profile, setAvatarGoto])

  const onSubmit = (data) => {
    if (data && profile) {
      getGeoInfo()
        .then((res: unknown) => {
          const geo = res as unknown as IGeoProfile
          setOpen()
          if (res) {
            mutateUpdateProfile({
              _email: data._email,
              _username: data._username,
              _avatar: defaultAvatar,
              _subscription: data._subscription,
              _country: geo.country,
              _user_ip_address: geo.ip
            })
              .then((_res) => {
                if (_res) {
                  successToast(MESSAGES.edit_profile_success)
                  onRefetchProfile()
                  setDefaultAvatar(_res.avatar)
                  featchAvatar()
                  // if (avatar && avatar.length > 0) {
                  //   const currentAvatar = avatar.findIndex(
                  //     (_avatar) => _avatar.value === defaultAvatar
                  //   )
                  //   if (currentAvatar) {
                  //     setAvatarGoto(currentAvatar)
                  //   }
                  // }
                  // onCloseModal()
                  setClose()
                }
              })
              .catch(() => {
                errorToast(MESSAGES.please_fill)
                setClose()
              })
          }
        })
        .catch(() => {
          errorToast(MESSAGES.cant_update_data)
          setClose()
        })
    }
  }

  useEffect(() => {
    let cancel = false
    if (!cancel) {
      if (profile) {
        setDefaultAvatar(profile.avatar)
      }
    }
    return () => {
      cancel = true
    }
  }, [profile])

  useEffect(() => {
    let cancel = false
    if (!cancel) {
      featchAvatar()
    }
    return () => {
      cancel = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    avatar,
    defaultAvatar,
    featchAvatar,
    profile,
    setAvatarGoto,
    setDefaultAvatar
  ])

  return {
    avatarList: setAvatarList(),
    handleSubmit,
    onSubmit,
    onRefetchProfile,
    defaultAvatar,
    setDefaultAvatar,
    avatarGoto,
    setAvatarGoto,
    registerProfileSetting,
    watchProfileSetting,
    setValueProfileSetting,
    featchAvatar
  }
}

export default useProfileSettingController
