import { ICrumb } from "@interfaces/IMenu"
import useEventStore from "@stores/events"
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

export const ALL_TRANSACTIONS = () => {
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
      title: "All Transactions",
      href: "/transactions"
    }
  ] as ICrumb[]
}

export const GAME_PLAY_HISTORY = () => {
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
      title: "Play History",
      href: "/history"
    }
  ] as ICrumb[]
}

export const EVENT_CRUMB = () => {
  const { event } = useEventStore()

  return [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "Events",
      href: "/events"
    },
    {
      title: `${event?.name}`,
      href: `/events/${event?.name}`,
      onClick: () => {
        window.location.href = `/events/${event._id}`
      }
    }
  ] as ICrumb[]
}
