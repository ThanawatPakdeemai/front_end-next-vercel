import { SxProps, Theme } from "@mui/material"

export const StyleDrawer: SxProps<Theme> = {
  "&.MuiDrawer-root": {
    zIndex: 2
  },
  "&.MuiDrawer-paper__bottom .MuiDrawer-paper": {
    borderRadius: "48px 48px 0px 0px"
  },
  ".MuiDrawer-paper": {
    width: "100%",
    paddingBottom: "90px",
    background: "#121212",
    border: "1px solid #35383F"
  }
}

export const StyledInput: SxProps<Theme> = {
  fontFamily: "Urbanist",
  fontSize: "16px",
  color: "#fff",
  fontWeight: 600,
  opacity: 1,
  "&.MuiFormControl-root:hover .MuiOutlinedInput-root": {
    border: "0 !important"
  },
  ".MuiOutlinedInput-root": {
    "&:focus": {
      border: 0,
      outline: "none",
      boxShadow: "none"
    }
  }
}

export const StyledSearchInputMobile: SxProps<Theme> = {
  background: "rgba(242, 201, 76, 0.08)",
  border: "1px solid #F2C94C",
  borderRadius: "16px",
  maxWidth: "100%",
  minWidth: "100%",
  width: "100%",
  height: "56px",
  justifyContent: "center",
  ...StyledInput,
  input: {
    ...StyledInput
  },
  "input::placeholder": {
    ...StyledInput
  },
  ".MuiOutlinedInput-root": {
    height: "auto",
    borderRadius: "inherit",
    background: "transparent",
    border: 0,
    gap: "10px",
    "&:hover": {
      border: 0,
      boxShadow: "none",
      ".MuiOutlinedInput-root": {
        border: 0
      }
    }
  }
}

export const StyledBaseInputMobile: SxProps<Theme> = {
  background: "#18181C",
  border: "0",
  borderRadius: "16px",
  maxWidth: "100%",
  minWidth: "100%",
  width: "100%",
  height: "56px",
  justifyContent: "center",
  padding: "0 20px",
  ...StyledInput,
  input: {
    ...StyledInput
  },
  "input::placeholder": {
    ...StyledInput
  },
  ".MuiOutlinedInput-root": {
    height: "auto",
    borderRadius: "inherit",
    background: "transparent",
    border: 0,
    gap: "10px",
    "&:hover": {
      border: 0
    }
  }
}

export const StyleCreateRoom = {
  ".MuiTypography-root": {
    fontFamily: "Urbanist",
    fontSize: "14px"
  },
  "&.modal-create-room": {
    ".MuiInputLabel-root": {
      top: "auto",
      left: "auto",
      margin: 0,
      maxWidth: "100%",
      display: "block",
      transform: "none",
      fontFamily: "Urbanist",
      fontSize: "14px",
      color: "#70727B",
      textAlign: "center",
      marginBottom: "6px"
    },
    ".MuiSelect-select": {
      fontFamily: "Urbanist",
      fontSize: "14px",
      color: "#fff",
      fontWeight: "600",
      textTransform: "uppercase"
    },
    ".MuiSwitch-root": {
      width: "38px",
      height: "20px",
      borderRadius: "40px"
    },
    ".MuiSwitch-track": {
      backgroundColor: "#F32429"
    },
    ".MuiSwitch-switchBase": {
      color: "#fff",
      top: "2px",
      left: "2px",
      "&.Mui-checked+.MuiSwitch-track": {
        backgroundColor: "#F32429"
      }
    },
    ".modal-create-room__roomStatus": {
      display: "flex",
      alignItems: "center",
      padding: "12px",
      gap: "14px",
      width: "100%",
      background: "#18181C",
      border: "1px solid #232329",
      borderRadius: "8px",
      justifyContent: "space-between"
    },
    ".MuiButton-root": {
      borderRadius: "100px",
      border: 0
    }
  },
  ".count-item": {
    "&__content": {
      justifyContent: "space-between",
      width: "100%"
    },
    "&__wrapper": {
      alignItems: "center",
      borderTop: "1px solid #35383F",
      paddingTop: "30px",
      ".MuiFormControl-root": {
        width: "calc(100% - 100px)!important"
      },
      ".MuiOutlinedInput-root": {
        background: "#1F222A",
        border: "0.9px solid #232329",
        color: "#fff"
      }
    },
    "&__decrease": {
      background: "#F32429",
      margin: 0
    },
    "&__increase": {
      background: "#F32429",
      margin: 0
    }
  }
}

export const StyleWaitingRoom = {
  "&.waiting-room__info": {
    display: "flex",
    gap: "17px",
    alignItems: "center",
    ".timer-box": {
      flex: "1"
    }
  },
  "& .waiting-room__content": {
    ".game-play-button": {
      maxWidth: "380px",
      marginLeft: "auto",
      "& > div": {
        width: "100%",
        background: "#18181C",
        border: "0.7px solid #35383F",
        borderRadius: "76px",
        padding: "10px",
        "& > .btn-icon-container": {
          margin: "0",
          background: "#F32429!important",
          width: "auto",
          minWidth: "110px",
          ":disabled": {
            background: "#9E9E9E!important"
          },
          "circle": {
            fill: "#F2C94C!important"
          }
        },
        ".MuiTypography-root": {
          fontSize: "10px",
          width: "calc(100% - 140px)!important",
          fontFamily: "Urbanist",
          fontWeight: 700,
          color: "#FFFFFF",
          textTransform: "uppercase",
          margin: "0"
        },
        ".text-button": {
          ".MuiTypography-root": {
            fontSize: "16px!important"
          }
        }
      }
    }
  },
  ".chat-wrapper": {
    marginLeft: "auto"
  }
}

export const StyleTimerMobile = {
  ".timer-box": {
    flex: "none",
    background: "transparent",
    border: "0",
    width: "auto",
    minWidth: "auto",
    padding: 0,
    ".MuiTypography-root": {
      fontFamily: "Urbanist",
      color: "#F2C94C"
    }
  }
}

export const StylePlayerMobile = {
  ".player-list": {
    flex: "none",
    background: "transparent",
    border: "0",
    width: "auto",
    minWidth: "auto",
    padding: 0,
    "path": {
      stroke: "#F2C94C"
    },
    ".MuiTypography-root": {
      fontFamily: "Urbanist",
      color: "#F2C94C"
    },
    ".player-amount__text": {
      color: "#F2C94C"
    }
  }
}
