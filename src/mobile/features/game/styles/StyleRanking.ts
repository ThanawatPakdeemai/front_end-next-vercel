export const StyleRanking = {
  ".top-player": {
    "&__content": {
      paddingBottom: "30px",
      ".custom-scroll": {
        overflowX: "hidden"
      }
    },
    "&__wrapper-inner:before": {
      display: "none"
    }
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
    gridTemplateColumns: "35px 1fr 1fr 1fr",
    gap: "10px",
    "@media (max-width: 991px)": {
      fontSize: "9px",
      whiteSpace: "nowrap",
      gridTemplateColumns: "40px 1fr 1fr 90px",
      "&--earn": {
        marginLeft: "auto"
      },
      "&--est": {
        textAlign: "right"
      },
      "h1": {
        fontFamily: "Urbanist",
        fontWeight: "bold"
      },
      "&-span": {
        color: "#F2C94C",
        whiteSpace: "normal"
      }
    }
  }
}
