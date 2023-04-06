import ButtonLink from "@components/atoms/button/ButtonLink"
import { memo } from "react"
import LoginIcon from "@mui/icons-material/Login"
import { useTranslation } from "react-i18next"

interface IProp {
  handleButton: () => void
}
const ButtonLogin = ({ handleButton }: IProp) => {
  const { t } = useTranslation()
  return (
    <>
      <ButtonLink
        onClick={() => handleButton()}
        href="/"
        text={t("login")}
        icon={<LoginIcon />}
        variant="contained"
        // size="small"
        size="medium"
        className=" m-auto h-[30px] w-full !min-w-0 rounded-xl  p-0 md:h-[40px] md:!min-w-[164px] md:p-1  lg:h-auto"
      />
    </>
  )
}

export default memo(ButtonLogin)
