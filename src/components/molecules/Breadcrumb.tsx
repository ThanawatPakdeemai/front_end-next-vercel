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
  const isCancelled = React.useRef(false)
  const [breadcrumbs, setBreadcrumbs] = React.useState<ICrumb[]>()

  /* this function will automatically generate breadcrumb by url name path */
  // const generateBreadcrumbs = () => {
  //   const asPathWithoutQuery = router.asPath.split("?")[0]

  //   const asPathNestedRoutes = asPathWithoutQuery
  //     .split("/")
  //     .filter((v) => v.length > 0)

  //   const crumblist = asPathNestedRoutes.map((subpath, idx) => {
  //     const href = `/${asPathNestedRoutes.slice(0, idx + 1).join("/")}`
  //     const text = subpath.split(/[_-]/).join(" ")
  //     return { href, text }
  //   })

  // return [{ href: "/", title: "Home" }, ...crumblist] as unknown as ICrumb[]
  // const breadcrumbs = generateBreadcrumbs()

  React.useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0]
    let pathArray = pathWithoutQuery.split("/")
    pathArray.shift()

    pathArray = pathArray.filter((path) => path !== "")

    const bread_crumbs = pathArray.map((path, index) => {
      const href = `/${pathArray.slice(0, index + 1).join("/")}`
      return {
        href,
        title: path.charAt(0).toUpperCase() + path.slice(1)
      }
    })
    if (!isCancelled.current)
      setBreadcrumbs([{ href: "/", title: "Home" }, ...bread_crumbs])

    return () => {
      isCancelled.current = true
    }
  }, [router.asPath])

  return (
    <Stack
      spacing={2}
      className={className}
    >
      <Breadcrumbs
        separator=" "
        className="my-2 uppercase md:my-0"
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
          : breadcrumbs &&
            breadcrumbs.map((crumb, idx) => (
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
