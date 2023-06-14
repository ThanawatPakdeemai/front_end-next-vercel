import { Typography } from "@mui/material"
import { useRouter } from "next/router"

interface IProp {
  title: string
  href: string
  last: boolean
}

const Crumb = ({ title, href, last = false }: IProp) => {
  const router = useRouter()
  if (last) {
    return (
      <Typography
        sx={{
          lineHeight: "25px"
        }}
        className="max-w-sm cursor-pointer rounded bg-error-main px-[10px] text-xs font-bold text-error-contrastText line-clamp-1"
      >
        {title.split(/[_-]/).join(" ")}
      </Typography>
    )
  }

  return (
    <Typography
      onClick={() => {
        router.push(title === "Home" ? "/" : `${href}`)
      }}
      className="cursor-pointer rounded border border-neutral-700 px-[10px] py-[5px] text-xs font-bold"
    >
      {title.split(/[_-]/).join(" ")}
    </Typography>
  )
}

export default Crumb
