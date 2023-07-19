import React from "react"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { Box, SxProps, Theme, Typography } from "@mui/material"
import EastRoundedIcon from "@mui/icons-material/EastRounded"

export interface IJumbotronProps {
  sxCustomStyled?: SxProps<Theme>
  className?: string
  detail?: string
  text?: string
  textTitleSub?: string
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
  detail = `<p><span class="ql-font-neueMachinaBold ql-size-46px" style="color: rgb(247, 251, 250);">NAKAMOTO.GAMES</span><span class="ql-font-neueMachinaBold ql-size-46px" style="color: rgb(160, 237, 97);">FOR GAME DEVELOPERS_</span></p><p><span class="ql-size-16px">We take care of the infrastructure and distribution so you can focus on creating games. Publish your Web3 game now ⚡</span></p><p><br></p>`,
  textTitleSub = "",
  textButton = "",
  colorButton = "success",
  variantButton = "contained",
  iconButton = <EastRoundedIcon />,
  size = "large",
  onClickButton,
  hrefButton,
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
            __html: `${detail}`
          }}
        />
      </div>
      {/* <Typography
        className="jumbotron-text mb-8 mt-4"
        dangerouslySetInnerHTML={{
          __html: `${textTitleSub}`
        }}
      /> */}
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
