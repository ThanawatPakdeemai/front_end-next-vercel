import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"

const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

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
        text={t("Login")}
        icon={<Icomoon className="icon-Full-Arrow-Right" />}
        variant="contained"
        size="medium"
        className=" m-auto h-[40px] w-full !min-w-[121px] !rounded-[20px] !bg-secondary-main !p-[15px_25px_13px] text-[12px] md:h-[40px]"
      />
    </>
  )
}

export default memo(ButtonLogin)
