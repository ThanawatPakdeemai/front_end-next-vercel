import { ICrumb } from "@interfaces/IMenu"
import useProfileStore from "@stores/profileStore"

export const PROFILE_CRUMB = () => {
  const { profile } = useProfileStore()

  return [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "profile",
      href: `/profile/${profile.data?.id}`
    }
  ]
}

export const ITEM_REWARD_CRUMB = () => {
  const { profile } = useProfileStore()

  return [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "My Account",
      href: `/profile/${profile.data?.id}`
    },
    {
      title: "Item Reward",
      href: "/earn-reward"
    }
  ] as ICrumb[]
}
