import React, { memo } from "react"
import { Chip } from "@mui/material"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { useTranslation } from "next-i18next"
import CheckMarkIcon from "../atoms/icon/checkMarkIcon"

interface IProps {
  unread: number
  onHandleClick?: () => void
}
const Header = ({ unread, onHandleClick }: IProps) => {
  const { t } = useTranslation()
  return (
    <div className="mb-6 flex justify-between">
      <h1 className="py-2 text-2xl uppercase">{t("noticfications")}</h1>
      <div className="flex gap-4">
        <Chip
          label={`${t("unread")} ${unread}`}
          size="small"
          color="error"
          className="my-2 font-bold uppercase "
        />
        <ButtonToggleIcon
          startIcon={<CheckMarkIcon />}
          text={t("mark_all_as_read")}
          handleClick={onHandleClick}
          className="border-sky-500 z-[2] w-[198px] rounded-full border border-solid capitalize"
          type="button"
        />
      </div>
    </div>
  )
}
export default memo(Header)
