export const StyleRanking = {
  ".top-player__wrapper-inner:before": {
    display: "none"
  },
  ".card-title-page": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "14px",
    width: "100%",
    height: "auto",
    flexWrap: "wrap",
    margin: 0,
    "& > div": {
      gap: "10px"
    }
  },
  ".card-title": {
    display: "flex",
    flexDirection: "column",
    "&__h1": {
      fontFamily: "Urbanist",
      fontWeight: "bold"
    },
    "&__span": {
      color: "#F2C94C"
    }
  },
  ".card-header__ranking": {
    padding: "0 14px",
    gridTemplateColumns: "1fr 130px 60px 50px",
    gap: "10px",
    "h1": {
      fontFamily: "Urbanist",
      fontWeight: "bold"
    },
    "&-span": {
      color: "#F2C94C"
    }
  }
}
