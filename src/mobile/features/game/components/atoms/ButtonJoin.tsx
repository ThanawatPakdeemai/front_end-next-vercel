import { Button } from "@mui/material"
import { useTranslation } from "next-i18next"

interface IProps {
  onClick?: () => void
  text?: string
}
const ButtonJoin = ({ onClick, text }: IProps) => {
  const { t } = useTranslation()
  return (
    <>
      <Button
        onClick={onClick}
        className={` !h-[40px] !min-w-[90px] rounded-[20px] ${
          text === "join" ? "bg-green-lemon" : ""
        } ${text === "played" ? " bg-success-light" : ""} ${
          text === "full" ? " bg-neutral-600" : ""
        } text-sm text-neutral-800 hover:bg-green-lemon`}
      >
        {text ? t(text) : t("join")}
      </Button>
    </>
  )
}
export default ButtonJoin
