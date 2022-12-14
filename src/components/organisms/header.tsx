import React, { memo } from "react"
import { Box } from "@mui/material"
import HeadLogo from "@components/molecules/HeadLogo"
import HeadMenu from "@components/molecules/HeadMenu"
import HeadPrice from "@components/molecules/HeadPrice"
import RightMenu from "@components/molecules/RightMenu"

const Header = () => (
  /*
   * Const { t } = useTranslation();
   * const [open, setOpen] = React.useState(false);
   * const handleOpen = () => {
   *   setOpen(true);
   * };
   * const handleClose = () => {
   *   setOpen(false);
   * };
   */

  /*
   * Const onClickSelected = (value: string) => {
   *   changeLanguage(value);
   * };
   */

  /*
   * Const changeLanguage = (lng: string) => {
   *   i18n.changeLanguage(lng);
   *   localStorage.setItem("language", lng);
   * };
   */

  <header className="header flex h-36 items-center justify-between overflow-clip">
    <HeadPrice />
    <Box
      component="div"
      className="my-10 items-center justify-between lg:flex"
    >
      <HeadLogo />
      <div className="fixed z-50 flex w-full items-center p-52">
        <HeadMenu />
        <RightMenu />
      </div>
    </Box>
  </header>
)

export default memo(Header)
