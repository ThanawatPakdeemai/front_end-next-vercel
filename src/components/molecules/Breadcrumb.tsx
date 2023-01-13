import Crumb from "@components/atoms/Crumb"
import { Breadcrumbs, Stack } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { v4 as uuidv4 } from "uuid"

const Breadcrumb = () => {
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

    return [{ href: "/", text: "Home" }, ...crumblist]
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator=" "
        className="uppercase"
        aria-label="breadcrumb"
      >
        {breadcrumbs.map((crumb, idx) => (
          <Crumb
            key={uuidv4()}
            last={idx === breadcrumbs.length - 1}
            aria-label={crumb.text}
            {...crumb}
          />
        ))}
      </Breadcrumbs>
    </Stack>
  )
}

export default Breadcrumb
