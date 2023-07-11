import React from "react"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { Box, SxProps, Theme, Typography } from "@mui/material"
import EastRoundedIcon from "@mui/icons-material/EastRounded"

export interface IJumbotronProps {
  sxCustomStyled?: SxProps<Theme>
  className?: string
  textTitle?: string
  textTitleSub?: string
  text?: string
  textButton?: string
  iconButton?: React.ReactNode
  onClickButton?: () => void
  hrefButton?: string
  variantButton?: "text" | "outlined" | "contained"
  textTitleDarkVariant?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
  colorButton?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
  size?: "small" | "medium" | "large"
}

const Jumbotron = ({
  sxCustomStyled = {},
  className,
  textTitle = "Hello, world!",
  text = "This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.",
  textButton = "",
  colorButton = "success",
  variantButton = "contained",
  iconButton = <EastRoundedIcon />,
  size = "large",
  onClickButton,
  hrefButton,
  textTitleSub,
  textTitleDarkVariant = "success"
}: IJumbotronProps) => {
  /**
   * @description Get class text title dark variant
   * @returns {string}
   */
  const classTextTitleDarkVariant = (): string => {
    switch (textTitleDarkVariant) {
      case "error":
        return "text-error-main"

      case "info":
        return "text-info-main"

      case "primary":
        return "text-primary-main"

      case "secondary":
        return "text-secondary-main"

      default:
        return "text-green-lemon"
    }
  }

  const classNameButtonLink = (): string => {
    switch (colorButton) {
      case "error":
        return "button-link--error"
      case "info":
        return "button-link--info"
      case "primary":
        return "button-link--primary"
      case "secondary":
        return "button-link--secondary"

      default:
        return "button-link--success !bg-green-lemon"
    }
  }

  return (
    <Box
      component="div"
      sx={sxCustomStyled}
      className={`jumbotron ${className}`}
    >
      <div className="jumbotron-title">
        <Typography
          variant="h1"
          dangerouslySetInnerHTML={{
            __html: `${textTitle}`
          }}
        />
      </div>
      <Typography
        className="jumbotron-text mb-8 mt-4"
        dangerouslySetInnerHTML={{
          __html: `${textTitleSub}`
        }}
      />
      {textButton && (
        <div className="jumbotron-button">
          <ButtonLink
            href={onClickButton ? undefined : hrefButton}
            text={textButton}
            icon={iconButton}
            size={size}
            color={colorButton}
            variant={variantButton}
            className={`group !h-10 !p-[15px_25px_13px] text-sm text-neutral-780 ${classNameButtonLink()}`}
            sxCustomStyled={{
              ".MuiSvgIcon-root": {
                fontSize: "20px!important"
              }
            }}
          />
        </div>
      )}
    </Box>
  )
}

export default Jumbotron
