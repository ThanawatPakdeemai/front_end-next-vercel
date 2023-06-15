import { SxProps } from "@mui/material"

export const StyleArrowDefault = {
  ".MuiSvgIcon-root": {
    fill: "white",
    transform: "scale(0.7)"
  },
  "&.slick-arrow": {
    top: "22px",
    "&.slick-prev": {
      "left": "-70px"
    },
    "&.slick-next": {
      "right": "-30px"
    },
    "&:before": {
      display: "none"
    }
  }
}

export const StyleArrowAvatar = {
  ".MuiSvgIcon-root": {
    fill: "white"
  },
  "&.slick-arrow": {
    top: "10px",
    transform: "translate(0, 0)",
    width: "auto",
    height: "auto",
    "& > div": {
      background: "#18181C",
      border: "1px solid #232329",
      backdropFilter: "blur(15px)",
      borderRadius: "8px"
    },
    "&.slick-prev": {
      left: "-60px"
    },
    "&.slick-next": {
      right: "-60px"
    },
    "&:before": {
      display: "none"
    }
  }
}

export const SlickArrowCSS =
  "m-1 flex items-center justify-center rounded-lg  bg-neutral-800/60 w-[40px] h-[40px]"

export const SlickMainSlideCSS: SxProps = {
  ".slick-slider, .slick-list, .slick-track": {
    height: "100%"
  },
  ".slick-slide": {
    "& > div": {
      height: "100%",
      "& > .verticalThumb-slide__item": {
        height: "100%",
        "& > .verticalThumb-slide__item__image": {
          height: "100%",
          "& > img": {
            height: "100%"
          }
        }
      }
    }
  }
}

export const SlickSingleSlideAvatarCSS = {
  ".slick-slider, .slick-list, .slick-track": {
    height: "100%"
  },
  ".slick-slide": {
    "&.slick-current": {
      opacity: "1 !important"
    },
    "& > div": {
      height: "100%",
      "& > .verticalThumb-slide__item": {
        height: "100%",
        "& > .verticalThumb-slide__item__image": {
          height: "100%",
          borderRadius: "8px",
          overflow: "hidden",
          "& > img": {
            height: "100%"
          }
        }
      }
    }
  }
}

export const SlickDefaultThumbnail: SxProps = {
  ".slick-track": {
    overflow: "hidden"
  },
  ".slick-list": {
    height: "70px",
    overflow: "hidden"
  },
  ".slick-slider": {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    "& > .slick-list": {
      width: "100%"
    }
  },
  ".slick-slide": {
    opacity: 0.5,
    ".verticalSmallThumb-slide__item": {
      margin: "0 4px"
    },
    "&.slick-current.slick-active": {
      opacity: 1,
      ".MuiCardMedia-root": {
        borderColor: "#A0ED61"
      }
    }
  }
}

export const SlickAvatarThumbnail: SxProps = {
  ".slick-thumbnail__wrapper": {
    maxWidth: "270px !important"
  },
  ".slick-track": {
    overflow: "hidden"
  },
  ".slick-list": {
    maxWidth: "480px",
    width: "270px!important",
    height: "70px",
    overflow: "hidden"
  },
  ".slick-slider": {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    border: "0",
    padding: "0",
    height: "auto",
    overflow: "hidden",
    "& > .slick-list": {
      width: "100%"
    }
  },
  ".slick-slide": {
    opacity: 1,
    "&.slick-cloned": {
      opacity: 0,
      visibility: "hidden",
      display: "none"
    },
    ".verticalSmallThumb-slide__item": {
      margin: "0 4px",
      padding: "0",
      "& > .verticalSmallThumb-slide__item__image": {
        width: "60px",
        height: "60px",
        border: "2px solid #232329",
        borderRadius: "14px",
        padding: "5px",
        "img": {
          borderRadius: "8px",
          border: "0"
        }
      }
    },
    "&.slick-current.slick-active": {
      opacity: 1,
      ".verticalSmallThumb-slide__item__image": {
        borderColor: "#F42728!important"
      }
    }
  }
}
