import React, { memo } from "react"
import { Box } from "@mui/material"

const Cookies: React.FC = () => {
  /*
   * Const [accept, setAccept] = useState("");
   * const { t } = useTranslation();
   * const cookieConsent = localStorage.getItem("cookieConsent");
   * function acceptCookie() {
   *   localStorage.setItem("cookieConsent", "1");
   *   setAccept("accept");
   * }
   */
  const _txt = "cookies"

  return (
    <Box component="div">{_txt}</Box>
    /*
     * <ContentMiddle
     *   style={
     *     cookieConsent === "1" && window.innerWidth <= 768
     *       ? { bottom: "-35rem", transition: "all 0.6s" }
     *       : cookieConsent === "1" && window.innerWidth > 768
     *       ? { display: "none" }
     *       : {}
     *   }>
     *   <div id="detail">
     *     <div className="text">
     *       <p>{t("cookies")}</p>
     *       <div className="btn">
     *         <button onClick={acceptCookie}>{t("yes_i_accept_cookies")}</button>
     *       </div>
     *     </div>
     *   </div>
     * </ContentMiddle>
     */
  )
}

export default memo(Cookies)
