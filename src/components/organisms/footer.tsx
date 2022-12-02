import { memo } from "react"

const Footer = () => (
  /*
   * Const scrollToTop = () => {
   *   window.scrollTo({
   *     top: 0,
   *     behavior: "smooth"
   *   });
   * };
   * const { t } = useTranslation();
   */

  <>
    {/* <ContentBottom className="conten-footer">
        <h2>{t("be_a_part_of_the_play_to_earn_revolution")}</h2>
        <p>
          <Trans>{t("title_footer_header")}</Trans>
        </p>
        <Content>
          <Background>
            <img
              data-src="/assets/images/join_bg.svg"
              alt="Join Us Background"
              className="join-bg lazyload"
              width={1240}
              height={401}
            />
          </Background>
          <div className="join">
            <h3>
              {t("title_footer_1")}
              <br />
              {t("title_footer_2")}
            </h3>

            <TextSlideButton
              url="https://t.me/NakamotoGames"
              text={t("join_the_revolution")}
              color="secondary"
            />
            <GoToTop>
              <div onClick={scrollToTop}>
                <span>{t("up_to_top")}</span>
                <span className="icon">
                  <img
                    data-src="/assets/images/icons/hand.svg"
                    alt="Go to top"
                    className="lazyload"
                    width={31}
                    height={40}
                  />
                </span>
              </div>
            </GoToTop>
            <Social>
              {MenuLists.map((item, index) => {
                return <Item key={index} {...item} />;
              })}
            </Social>
          </div>
        </Content>
        <CopyRight>Copyright 2022 © Nakamoto Games</CopyRight>
      </ContentBottom> */}
  </>
)

export default memo(Footer)
