import { ICrumb } from "@interfaces/IMenu"

export const PROFILE_CRUMB: ICrumb[] = [
  {
    title: "Home",
    href: "/"
  },
  {
    title: "profile",
    href: typeof window !== "undefined" ? window.location.pathname : "/"
  }
]
