import { Button } from "@mui/material"
import { useTranslation } from "next-i18next"

interface IProps {
  onClick?: () => void
}
const ButtonJoin = ({ onClick }: IProps) => {
  const { t } = useTranslation()
  return (
    <>
      <Button
        onClick={onClick}
        className=" !h-[40px] !min-w-[90px] rounded-[20px] bg-green-lemon text-sm text-neutral-800 hover:bg-green-lemon"
      >
        {t("join")}
      </Button>
    </>
  )
}
export default ButtonJoin
