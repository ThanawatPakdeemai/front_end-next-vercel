import * as React from "react"
import { SVGProps } from "react"

const CheckPass = ({
  width = 20,
  height = 21,
  stroke,
  fill,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={0.5}
      y={1}
      width={19}
      height={19}
      rx={5.5}
      fill={fill || "#18181C"}
    />
    <path
      d="M7 10.5L9 12.5L13 8.5"
      stroke={stroke || "#A0ED61"}
    />
    <rect
      x={0.5}
      y={1}
      width={19}
      height={19}
      rx={5.5}
      stroke={stroke || "#A0ED61"}
    />
  </svg>
)

const CheckWrong = ({
  width = 20,
  height = 21,
  stroke,
  fill,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={0.5}
      y={1}
      width={19}
      height={19}
      rx={5.5}
      fill={fill || "#18181C"}
    />
    <rect
      x={7.5249}
      y={12.2656}
      width={6}
      height={1}
      transform="rotate(-45 7.5249 12.2656)"
      fill={fill || "#4E5057"}
    />
    <rect
      width={6}
      height={1}
      transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 12.4746 12.2656)"
      fill={fill || "#4E5057"}
    />
    <rect
      x={0.5}
      y={1}
      width={19}
      height={19}
      rx={5.5}
      stroke={stroke || "#4E5057"}
    />
  </svg>
)

const CheckList = {
  CheckPass,
  CheckWrong
}
export default CheckList
