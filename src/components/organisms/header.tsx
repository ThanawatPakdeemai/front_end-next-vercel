import HeadMenu from "@components/molecules/HeadMenu"
import RightMenu from "@components/molecules/RightMenu"
import { Box } from "@mui/material"
import React, { memo } from "react"
// import Image from "@components/atoms/image"

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
    <Box
      component="div"
      className="my-10 items-center justify-between lg:flex"
    >
      <HeadMenu />
      <div className="text-error-main">MENU</div>
      <RightMenu />
    </Box>

    {/* <LanguageSelected defaultName="LANGUAGE" data={LANGUAGE} onChange={onClickSelected} />
      <NakaCurrency />
      <Button
        className="butbuynaka button mb-0 flex items-center"
        color="primary"
        variant="contained"
        onClick={handleOpen}>
        <IconNaka color="#fff" />
        <span className="ml-2">{t("buy_naka")}</span>
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description">
        <Box sx={{ width: 200 }} className={"modal-box"}>
          <Typography
            variant="h2"
            id="child-modal-title"
            className="flex items-center justify-center">
            <IconNaka />
            <span className="font-dogicapixel-bold ml-4 text-base">Buy Naka</span>
          </Typography>
          <MenuList>
            {exchangePlatform.map((item, index) => (
              <MenuItem key={uuidv4()}>
                <Link
                  href={item.link}
                  target={"_blank"}
                  rel="noreferrer"
                  className="flex items-center">
                  <ListItemIcon className="relative w-5">
                    {item.icon ? (
                      <img
                        src={`/assets/images/icons/wallets/${item.icon}`}
                        alt={item.title}
                        className={"object-contain object-left"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </Link>
              </MenuItem>
            ))}
          </MenuList>
          <Button className="close-button" onClick={handleClose}>
            <IconClose />
          </Button>
        </Box>
      </Modal> */}
  </header>
)

export default memo(Header)
