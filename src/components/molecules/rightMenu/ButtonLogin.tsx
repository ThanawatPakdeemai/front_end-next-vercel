import ButtonLink from "@components/atoms/button/ButtonLink"
import dynamic from "next/dynamic"
import { memo } from "react"
import { useTranslation } from "react-i18next"

interface IProp {
  handleButton: () => void
}
const ButtonLogin = ({ handleButton }: IProp) => {
  const { t } = useTranslation()
  const IconArrowRight = dynamic(
    () => import("@components/icons/arrowRightIcon"),
    {
      suspense: true,
      ssr: false
    }
  )
  return (
    <>
      <ButtonLink
        onClick={() => handleButton()}
        href="/"
        text={t("Login")}
        icon={<IconArrowRight />}
        variant="contained"
        // size="small"
        size="medium"
        className=" m-auto h-[40px] w-full !min-w-[121px] !rounded-[20px] !bg-secondary-main !p-[15px_25px_13px] text-[12px] md:h-[40px]" // lg:h-auto
      />
    </>
  )
}

export default memo(ButtonLogin)
