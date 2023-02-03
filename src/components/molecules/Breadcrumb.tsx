import Crumb from "@components/atoms/Crumb"
import { ICrumb } from "@interfaces/IMenu"
import { Breadcrumbs, Stack } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { v4 as uuidv4 } from "uuid"

interface IProp {
  className?: string
  isCustom?: boolean
  _breadcrumbs?: ICrumb[]
}

const Breadcrumb = ({ className, isCustom, _breadcrumbs }: IProp) => {
  const router = useRouter()

  /* this function will automatically generate breadcrumb by url name path */
  const generateBreadcrumbs = () => {
    const asPathWithoutQuery = router.asPath.split("?")[0]

    const asPathNestedRoutes = asPathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0)

    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      const href = `/${asPathNestedRoutes.slice(0, idx + 1).join("/")}`
      const text = subpath.split(/[_-]/).join(" ")
      return { href, text }
    })

    return [{ href: "/", title: "Home" }, ...crumblist] as unknown as ICrumb[]
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <Stack
      spacing={2}
      className={className}
    >
      <Breadcrumbs
        separator=" "
        className="uppercase"
        aria-label="breadcrumb"
      >
        {isCustom
          ? _breadcrumbs &&
            _breadcrumbs.map((crumb, idx) => (
              <Crumb
                key={uuidv4()}
                last={idx === _breadcrumbs.length - 1}
                aria-label={crumb.title}
                {...crumb}
              />
            ))
          : breadcrumbs.map((crumb, idx) => (
              <Crumb
                key={uuidv4()}
                last={idx === breadcrumbs.length - 1}
                aria-label={crumb.title}
                {...crumb}
              />
            ))}
      </Breadcrumbs>
    </Stack>
  )
}

export default Breadcrumb
