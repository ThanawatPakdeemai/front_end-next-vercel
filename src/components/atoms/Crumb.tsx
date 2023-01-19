import { Typography } from "@mui/material"
import { useRouter } from "next/router"

interface IProp {
  text: string
  href: string
  last: boolean
}

const Crumb = ({ text, href, last = false }: IProp) => {
  const router = useRouter()
  if (last) {
    return (
      <Typography className="cursor-pointer rounded bg-error-main py-[5px] px-[10px] text-xs font-bold text-error-contrastText">
        {text}
      </Typography>
    )
  }

  return (
    <Typography
      onClick={() => {
        router.push(text === "Home" ? "/" : `${href}`)
      }}
      className="cursor-pointer rounded border border-neutral-700 py-[5px] px-[10px] text-xs font-bold"
    >
      {text}
    </Typography>
  )
}

export default Crumb
