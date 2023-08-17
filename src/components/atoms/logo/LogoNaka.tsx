import { memo } from "react"
import { Box } from "@mui/material"
import useGlobal from "@hooks/useGlobal"
import dynamic from "next/dynamic"

const LogoNakaIcon = dynamic(
  () => import("@components/atoms/svg/LogoNakaIcon"),
  {
    suspense: true,
    ssr: false
  }
)

interface IProps {
  showIconTM?: boolean
}

const LogoNaka = (props: IProps) => {
  const { showIconTM } = props
  const { isMarketplace, isDeveloperPage } = useGlobal()

  const themeColor = (): string => {
    if (isMarketplace) {
      return "!fill-secondary-main"
    }
    if (isDeveloperPage) {
      return "!fill-green-lemon"
    }
    return "fill-error-main"
  }

  return (
    <Box
      component="div"
      className="logo-naka-icon group w-[180px] transition-all hover:w-auto hover:ease-linear"
    >
      <LogoNakaIcon
        fill={themeColor().toString()}
        showIconTM={showIconTM}
      />
    </Box>
  )
}

export default memo(LogoNaka)
