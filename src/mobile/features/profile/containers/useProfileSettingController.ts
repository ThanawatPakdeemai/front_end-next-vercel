import useGetAvatar from "@feature/avatar/containers/hook/useGetAvatar"
import { IVerticalThumbSlide } from "@feature/slider/interfaces/ISlides"

const useProfileSettingController = () => {
  const { avatar } = useGetAvatar()

  /**
   * @description Set game media
   * @returns {IVerticalThumbSlide[]}
   */
  const setAvatarLits = (): IVerticalThumbSlide[] => {
    const LIST: IVerticalThumbSlide[] = []
    if (avatar && avatar.length > 0) {
      avatar.map((slide) =>
        LIST.push({
          id: slide.key,
          type: "image",
          src: slide.value
        })
      )
      return LIST
    }
    return LIST
  }

  return {
    avatarList: setAvatarLits()
  }
}

export default useProfileSettingController
