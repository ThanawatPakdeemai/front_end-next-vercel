import { ICrumb } from "@interfaces/IMenu"
import useCrumbStore from "@stores/crumb"
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

export const EVENT_CRUMB = ({ title, id }: { title: string; id: string }) =>
  // const { crumb: eventCrumb } = useCrumbStore()

  [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "Events",
      href: "/events"
    },
    {
      title: `${title}`,
      href: `/events/${title}`,
      onClick: () => {
        window.location.href = `/events/${id}`
      }
    }
  ] as ICrumb[]

export const BLOG_CRUMB = () => {
  const { crumb: blogCrumb } = useCrumbStore()

  return [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "Blog",
      href: "/blog"
    },
    {
      title: `${blogCrumb?.title}`,
      href: `/blog/${blogCrumb?.title}`,
      onClick: () => {
        window.location.href = `/blog/${blogCrumb._id}`
      }
    }
  ] as ICrumb[]
}

export const COMMISSION_CRUMB = () =>
  [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "Commission",
      href: "/commission"
    }
  ] as ICrumb[]
