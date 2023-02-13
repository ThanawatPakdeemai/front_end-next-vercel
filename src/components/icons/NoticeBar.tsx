import * as React from "react"
import { SVGProps } from "react"

const Bottom = ({ fill, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={48}
    height={10}
    viewBox="0 0 48 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 0H0C2.20898 0 4 1.79089 4 4V0Z"
      fill="#18181C"
    />
    <path
      d="M4 0H44V6C44 8.20914 42.2091 10 40 10H8C5.79086 10 4 8.20914 4 6V0Z"
      fill="#18181C"
    />
    <rect
      x={8}
      y={4}
      width={32}
      height={2}
      rx={1}
      fill={fill || "#F42728"}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M44 0H48C45.791 0 44 1.79089 44 4V0Z"
      fill="#18181C"
    />
  </svg>
)

const Left = ({ fill, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={10}
    height={93}
    viewBox="0 0 10 93"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 4.5L10 0.5C10 2.70898 8.20911 4.5 6 4.5L10 4.5Z"
      fill="#18181C"
    />
    <path
      d="M10 4.5L10 44.5L4 44.5C1.79086 44.5 -1.67017e-06 42.7091 -1.57361e-06 40.5L-1.74846e-07 8.5C-7.82811e-08 6.29086 1.79086 4.5 4 4.5L10 4.5Z"
      fill="#18181C"
    />
    <rect
      x={6}
      y={8.5}
      width={32}
      height={2}
      rx={1}
      transform="rotate(90 6 8.5)"
      fill={fill || "#F42728"}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 44.5L10 48.5C10 46.291 8.20911 44.5 6 44.5L10 44.5Z"
      fill="#18181C"
    />
  </svg>
)

const NoticeIcon = {
  Bottom,
  Left
}

export default NoticeIcon
