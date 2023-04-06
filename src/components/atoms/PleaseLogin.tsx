import RightMenuNotLogIn from "@components/molecules/rightMenu/RightMenuNotLogIn"
import { memo } from "react"
import { useTranslation } from "react-i18next"

const PleaseLogin = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className=" flex w-full items-center justify-center">
        <div>
          <p className="py-5 text-center">{t("login_please")}</p>
          <RightMenuNotLogIn />
        </div>
      </div>
    </>
  )
}

export default memo(PleaseLogin)
